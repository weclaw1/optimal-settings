use anyhow::Context;
use axum::{
    routing::{delete, get, post, put},
    Router,
};
use sqlx::sqlite::SqlitePoolOptions;
use std::{net::SocketAddr, time::Duration};
use tower_http::{services::ServeDir, trace::TraceLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod controllers;
mod error;
mod models;
mod repositories;
mod services;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                "optimal_settings_backend=debug,tower_http=debug,axum::rejection=trace".into()
            }),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();
    let database_url = dotenvy::var("DATABASE_URL").context("DATABASE_URL must be set")?;
    let pool = SqlitePoolOptions::new()
        .max_connections(10)
        .acquire_timeout(Duration::from_secs(3))
        .connect(&database_url)
        .await
        .context("failed to connect to DATABASE_URL")?;

    sqlx::migrate!().run(&pool).await?;

    let app = Router::new()
        .route("/games", get(controllers::game_controller::get_games))
        .route("/games/:id", get(controllers::game_controller::get_game))
        .route("/guides", get(controllers::guide_controller::get_guides))
        .route("/guides/:id", get(controllers::guide_controller::get_guide))
        .route("/reports", get(controllers::report_controller::get_reports))
        .route(
            "/reports/:id",
            get(controllers::report_controller::get_report),
        )
        .route(
            "/reports",
            post(controllers::report_controller::post_report),
        )
        .route(
            "/reports/:id",
            put(controllers::report_controller::put_report),
        )
        .route(
            "/reports/:id",
            delete(controllers::report_controller::delete_report),
        )
        .route("/auth", post(controllers::auth_controller::authorize))
        .route("/auth", get(controllers::auth_controller::print_token))
        .nest_service("/images", ServeDir::new("data/images"))
        .layer(TraceLayer::new_for_http())
        .with_state(pool);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("Listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    Ok(())
}
