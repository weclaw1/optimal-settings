use axum::Json;

use crate::{
    error::AuthError,
    models::auth::{AuthBody, Claims, UserCredentials},
};

pub async fn authorize(Json(payload): Json<UserCredentials>) -> Result<Json<AuthBody>, AuthError> {
    let token = crate::services::auth_service::authorize(&payload)?;
    Ok(Json(AuthBody::new(token)))
}

pub async fn print_token(claims: Claims) -> Json<Claims> {
    Json(claims)
}
