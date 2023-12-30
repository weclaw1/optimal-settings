use axum::async_trait;
use sqlx::SqlitePool;

use crate::models::Report;

use super::Repository;

pub struct ReportRepository {
    pool: SqlitePool,
}

impl ReportRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn get_by_game_id(&self, game_id: i64) -> Result<Vec<Report>, anyhow::Error> {
        let reports = sqlx::query_as!(Report, "SELECT * FROM reports WHERE game_id = ?", game_id)
            .fetch_all(&self.pool)
            .await?;

        Ok(reports)
    }
}

#[async_trait]
impl Repository<Report, i64> for ReportRepository {
    async fn get(&self, id: i64) -> Result<Option<Report>, anyhow::Error> {
        let report = sqlx::query_as!(Report, "SELECT * FROM reports WHERE id = ?", id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(report)
    }

    async fn get_all(&self) -> Result<Vec<Report>, anyhow::Error> {
        let reports = sqlx::query_as!(Report, "SELECT * FROM reports")
            .fetch_all(&self.pool)
            .await?;

        Ok(reports)
    }

    async fn add(&self, item: Report) -> Result<i64, anyhow::Error> {
        let result = sqlx::query!(
            "INSERT INTO reports (username, game_id, settings_type, operating_system, operating_system_version, kernel_version, processor, graphics_card, random_access_memory, average_frames_per_second, resolution_width, resolution_height, comments, created_at, captcha_token)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             RETURNING id",
            item.username,
            item.game_id,
            item.settings_type,
            item.operating_system,
            item.operating_system_version,
            item.kernel_version,
            item.processor,
            item.graphics_card,
            item.random_access_memory,
            item.average_frames_per_second,
            item.resolution_width,
            item.resolution_height,
            item.comments,
            item.created_at,
            item.captcha_token
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(result.id)
    }

    async fn update(&self, item: Report) -> Result<(), anyhow::Error> {
        sqlx::query!(
            "UPDATE reports SET username = ?, game_id = ?, settings_type = ?, operating_system = ?, operating_system_version = ?, kernel_version = ?, processor = ?, graphics_card = ?, random_access_memory = ?, average_frames_per_second = ?, resolution_width = ?, resolution_height = ?, comments = ?, created_at = ?, captcha_token = ?
             WHERE id = ?",
            item.username,
            item.game_id,
            item.settings_type,
            item.operating_system,
            item.operating_system_version,
            item.kernel_version,
            item.processor,
            item.graphics_card,
            item.random_access_memory,
            item.average_frames_per_second,
            item.resolution_width,
            item.resolution_height,
            item.comments,
            item.created_at,
            item.captcha_token,
            item.id
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete(&self, id: i64) -> Result<(), anyhow::Error> {
        sqlx::query!("DELETE FROM reports WHERE id = ?", id)
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    async fn exists(&self, id: i64) -> Result<bool, anyhow::Error> {
        let result = sqlx::query!(
            "SELECT EXISTS(SELECT 1 FROM reports WHERE id = ?) AS exists_in_table",
            id
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(result.exists_in_table.unwrap_or(0) != 0)
    }
}
