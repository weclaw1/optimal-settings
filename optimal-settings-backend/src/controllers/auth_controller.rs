use axum::Json;

use crate::{models::auth::{UserCredentials, AuthBody, Claims}, error::AuthError};

pub async fn authorize(Json(payload): Json<UserCredentials>) -> Result<Json<AuthBody>, AuthError> {
    let token = crate::services::auth_service::authorize(&payload)?;
    Ok(Json(AuthBody::new(token)))
}

pub async fn print_token(claims: Claims) -> Json<Claims> {
    Json(claims)
}
