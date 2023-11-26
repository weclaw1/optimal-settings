use anyhow::Context;
use axum::{extract::State, http::StatusCode, routing::{get, post, put, delete}, Router};
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool};
use std::{net::SocketAddr, time::Duration};

mod services;
mod controllers;
mod models;
mod repositories;
mod error;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let database_url = dotenvy::var("DATABASE_URL").context("DATABASE_URL must be set")?;
    let pool = SqlitePoolOptions::new()
        .max_connections(10)
        .acquire_timeout(Duration::from_secs(3))
        .connect(&database_url)
        .await
        .context("failed to connect to DATABASE_URL")?;

    sqlx::migrate!().run(&pool).await?;

    let app = Router::new()
        .route("/", get(using_connection_pool_extractor))
        .route("/games", get(controllers::game_controller::get_games))
        .route("/games/:id", get(controllers::game_controller::get_game))
        .route("/guides", get(controllers::guide_controller::get_guides))
        .route("/guides/:id", get(controllers::guide_controller::get_guide))
        .route("/reports", get(controllers::report_controller::get_reports))
        .route("/reports/:id", get(controllers::report_controller::get_report))
        .route("/reports", post(controllers::report_controller::post_report))
        .route("/reports/:id", put(controllers::report_controller::put_report))
        .route("/reports/:id", delete(controllers::report_controller::delete_report))
        .with_state(pool);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::info!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}

// we can extract the connection pool with `State`
async fn using_connection_pool_extractor(
    State(pool): State<SqlitePool>,
) -> Result<String, (StatusCode, String)> {
    sqlx::query_scalar("select 'hello world from sqlite'")
        .fetch_one(&pool)
        .await
        .map_err(internal_error)
}

/// Utility function for mapping any error into a `500 Internal Server Error`
/// response.
fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}
