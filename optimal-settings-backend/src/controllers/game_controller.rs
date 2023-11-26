use axum::{Json, extract::{Path, Query}, response::IntoResponse, http::StatusCode};
use serde::Deserialize;

use crate::{models::Game, error::AppError, services};

#[derive(Deserialize)]
pub struct QueryParams {
    id: Option<u64>,
    slug: Option<String>,
}

pub async fn get_games(query: Option<Query<QueryParams>>) -> impl IntoResponse {
    match query {
        Some(query) => match query.0 {
            QueryParams { id: Some(id), slug: None } => match get_game(Path(id)).await {
                Ok(game) => game.into_response(),
                Err(e) => e.into_response(),
            },
            QueryParams { id: None, slug: Some(slug) } => match get_game_by_slug(Path(slug)).await {
                Ok(game) => game.into_response(),
                Err(e) => e.into_response(),
            },
            _ => match get_all_games().await {
                Ok(games) => games.into_response(),
                Err(e) => e.into_response(),
            },
        },
        None => match get_all_games().await {
            Ok(games) => games.into_response(),
            Err(e) => e.into_response(),
        },
    }
}

pub async fn get_all_games() -> Result<(StatusCode, Json<Vec<Game>>), AppError> {
    let games = services::game_service::get_games().await?;
    let response = (StatusCode::OK, Json(games));
    Ok(response)
}

pub async fn get_game(Path(id): Path<u64>) -> Result<(StatusCode, Json<Option<Game>>), AppError> {
    let game = services::game_service::get_game(id).await?;
    let response = match game {
        Some(game) => (StatusCode::OK, Json(Some(game))),
        None => (StatusCode::NOT_FOUND, Json(None)),
    };
    Ok(response)
}

pub async fn get_game_by_slug(Path(slug): Path<String>) -> Result<(StatusCode, Json<Option<Game>>), AppError> {
    let game = services::game_service::get_game_by_slug(&slug).await?;
    let response = match game {
        Some(game) => (StatusCode::OK, Json(Some(game))),
        None => (StatusCode::NOT_FOUND, Json(None)),
    };
    Ok(response)
}