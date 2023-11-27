use axum::{extract::{State, Path, Query}, Json, http::{StatusCode, Uri, HeaderValue}, response::IntoResponse};
use axum_extra::{TypedHeader, headers::{Location, Header}};
use serde::Deserialize;
use sqlx::SqlitePool;

use crate::{models::{Report, auth::Claims}, error::AppError};

#[derive(Deserialize)]
pub struct QueryParams {
    id: Option<u64>,
    game_id: Option<u64>,
}

pub async fn get_reports(State(pool): State<SqlitePool>, query: Option<Query<QueryParams>>) -> impl IntoResponse {
    match query {
        Some(query) => match query.0 {
            QueryParams { id: Some(id), game_id: None } => match get_report(State(pool), Path(id)).await {
                Ok(report) => report.into_response(),
                Err(e) => e.into_response(),
            },
            QueryParams { id: None, game_id: Some(game_id) } => match get_reports_by_game(State(pool), Path(game_id)).await {
                Ok(reports) => reports.into_response(),
                Err(e) => e.into_response(),
            },
            _ => match get_all_reports(State(pool)).await {
                Ok(reports) => reports.into_response(),
                Err(e) => e.into_response(),
            },
        },
        None => match get_all_reports(State(pool)).await {
            Ok(reports) => reports.into_response(),
            Err(e) => e.into_response(),
        },
    }
}

async fn get_reports_by_game(State(pool): State<SqlitePool>, Path(game_id): Path<u64>) -> Result<(StatusCode, Json<Vec<Report>>), AppError> {
    let reports = crate::services::report_service::get_reports_by_game(&pool, game_id).await?;
    let response = (StatusCode::OK, Json(reports));
    Ok(response)
}

pub async fn get_all_reports(State(pool): State<SqlitePool>) -> Result<(StatusCode, Json<Vec<Report>>), AppError> {
    let reports = crate::services::report_service::get_reports(&pool).await?;
    let response = (StatusCode::OK, Json(reports));
    Ok(response)
}

pub async fn get_report(State(pool): State<SqlitePool>, Path(report_id): Path<u64>) -> Result<(StatusCode, Json<Option<Report>>), AppError> {
    let report = crate::services::report_service::get_report(&pool, report_id).await?;
    let response = match report {
        Some(report) => (StatusCode::OK, Json(Some(report))),
        None => (StatusCode::NOT_FOUND, Json(None)),
    };
    Ok(response)
}

pub async fn post_report(State(pool): State<SqlitePool>, uri: Uri, Json(report): Json<Report>) -> Result<(TypedHeader<Location>, StatusCode), AppError> {
    let report_id = crate::services::report_service::add_report(&pool, report).await?;

    let location_value = HeaderValue::from_str(&format!("{}/{}", uri.path(), report_id))?;
    let location_header = Location::decode(&mut [location_value].iter())?;

    let response = (TypedHeader(location_header), StatusCode::CREATED);
    Ok(response)
}

pub async fn put_report(State(pool): State<SqlitePool>, _: Claims, Path(report_id): Path<u64>, Json(report): Json<Report>) -> Result<StatusCode, AppError> {
    let updated = crate::services::report_service::update_report(&pool, report_id, report).await?;
    let response = match updated {
        true => StatusCode::NO_CONTENT,
        false => StatusCode::NOT_FOUND,
    };
    Ok(response)
}

pub async fn delete_report(State(pool): State<SqlitePool>, _: Claims, Path(report_id): Path<u64>) -> Result<StatusCode, AppError> {
    let deleted = crate::services::report_service::delete_report(&pool, report_id).await?;
    let response = match deleted {
        true => StatusCode::NO_CONTENT,
        false => StatusCode::NOT_FOUND,
    };
    Ok(response)
}
