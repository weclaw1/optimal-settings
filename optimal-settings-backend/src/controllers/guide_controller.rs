use axum::{Json, extract::{Path, Query}, response::IntoResponse, http::StatusCode};
use serde::Deserialize;

use crate::{models::Guide, error::AppError, services};

#[derive(Deserialize)]
pub struct QueryParams {
    id: Option<u64>,
    slug: Option<String>,
}

pub async fn get_guides(query: Option<Query<QueryParams>>) -> impl IntoResponse {
    match query {
        Some(query) => match query.0 {
            QueryParams { id: Some(id), slug: None } => match get_guide(Path(id)).await {
                Ok(guide) => guide.into_response(),
                Err(e) => e.into_response(),
            },
            QueryParams { id: None, slug: Some(slug) } => match get_guide_by_slug(Path(slug)).await {
                Ok(guide) => guide.into_response(),
                Err(e) => e.into_response(),
            },
            _ => match get_all_guides().await {
                Ok(guides) => guides.into_response(),
                Err(e) => e.into_response(),
            },
        },
        None => match get_all_guides().await {
            Ok(guides) => guides.into_response(),
            Err(e) => e.into_response(),
        },
    }
}

pub async fn get_all_guides() -> Result<(StatusCode, Json<Vec<Guide>>), AppError>{
    let guides = services::guide_service::get_guides().await?;
    let response = (StatusCode::OK, Json(guides));
    Ok(response)
}

pub async fn get_guide(Path(id): Path<u64>) -> Result<(StatusCode, Json<Option<Guide>>), AppError> {
    let guide = services::guide_service::get_guide(id).await?;
    let response = match guide {
        Some(guide) => (StatusCode::OK, Json(Some(guide))),
        None => (StatusCode::NOT_FOUND, Json(None)),
    };
    Ok(response)
}

pub async fn get_guide_by_slug(Path(slug): Path<String>) -> Result<(StatusCode, Json<Option<Guide>>), AppError> {
    let guide = services::guide_service::get_guide_by_slug(&slug).await?;
    let response = match guide {
        Some(guide) => (StatusCode::OK, Json(Some(guide))),
        None => (StatusCode::NOT_FOUND, Json(None)),
    };
    Ok(response)
}
