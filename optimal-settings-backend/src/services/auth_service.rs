use jsonwebtoken::{encode, Header};
use once_cell::sync::Lazy;
use time::{Duration, OffsetDateTime};

use crate::{
    error::AuthError,
    models::auth::{Claims, Keys, UserCredentials},
};

pub static KEYS: Lazy<Keys> = Lazy::new(|| {
    let secret = dotenvy::var("JWT_SECRET").expect("JWT_SECRET must be set");
    Keys::new(secret.as_bytes())
});

pub static ADMIN_CREDETIALS: Lazy<UserCredentials> = Lazy::new(|| {
    let username = dotenvy::var("ADMIN_USERNAME").expect("ADMIN_USERNAME must be set");
    let password = dotenvy::var("ADMIN_PASSWORD").expect("ADMIN_PASSWORD must be set");
    UserCredentials::new(username, password)
});

pub fn authorize(credentials: &UserCredentials) -> Result<String, AuthError> {
    if credentials.username().is_empty() || credentials.password().is_empty() {
        return Err(AuthError::MissingCredentials);
    }
    if credentials.username() != ADMIN_CREDETIALS.username()
        || credentials.password() != ADMIN_CREDETIALS.password()
    {
        return Err(AuthError::WrongCredentials);
    }
    let claims = Claims::new(
        credentials.username().to_owned(),
        (OffsetDateTime::now_utc() + Duration::days(1)).unix_timestamp() as usize,
    );
    // Create the authorization token
    let token = encode(&Header::default(), &claims, KEYS.encoding())
        .map_err(|_| AuthError::TokenCreation)?;

    // Send the authorized token
    Ok(token)
}
