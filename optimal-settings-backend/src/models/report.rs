use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

use super::ValidateModel;

#[derive(Serialize, Deserialize, sqlx::Type)]
pub enum OperatingSystem {
    Windows,
    Linux,
    MacOS,
    Other,
}

impl From<String> for OperatingSystem {
    fn from(s: String) -> Self {
        match s.as_str() {
            "Windows" => OperatingSystem::Windows,
            "Linux" => OperatingSystem::Linux,
            "macOS" => OperatingSystem::MacOS,
            _ => OperatingSystem::Other,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Report {
    pub id: Option<i64>,
    pub username: Option<String>,
    pub game_id: i64,
    pub operating_system: OperatingSystem,
    pub operating_system_version: String,
    pub kernel_version: Option<String>,
    pub processor: String,
    pub graphics_card: String,
    pub random_access_memory: String,
    pub average_frames_per_second: i64,
    pub resolution_width: i64,
    pub resolution_height: i64,
    pub comments: Option<String>,
    #[serde(with = "time::serde::iso8601")]
    pub created_at: OffsetDateTime,
}

impl ValidateModel for Report {
    fn validate(&self) -> Result<(), anyhow::Error> {
        if let Some(id) = self.id {
            if id <= 0 {
                return Err(anyhow::anyhow!("id must be positive"));
            }
        }
        if self.game_id <= 0 {
            return Err(anyhow::anyhow!("game_id must be positive"));
        }
        if self.operating_system_version.is_empty() {
            return Err(anyhow::anyhow!("operating_system_version must not be empty"));
        }
        if let Some(kernel_version) = &self.kernel_version {
            if kernel_version.is_empty() {
                return Err(anyhow::anyhow!("kernel_version must not be empty"));
            }
        }
        if self.processor.is_empty() {
            return Err(anyhow::anyhow!("processor must not be empty"));
        }
        if self.graphics_card.is_empty() {
            return Err(anyhow::anyhow!("graphics_card must not be empty"));
        }
        if self.random_access_memory.is_empty() {
            return Err(anyhow::anyhow!("random_access_memory must not be empty"));
        }
        if self.average_frames_per_second <= 0 {
            return Err(anyhow::anyhow!("average_frames_per_second must be positive"));
        }
        if self.resolution_width <= 0 {
            return Err(anyhow::anyhow!("resolution_width must be positive"));
        }
        if self.resolution_height <= 0 {
            return Err(anyhow::anyhow!("resolution_height must be positive"));
        }
        if let Some(comments) = &self.comments {
            if comments.is_empty() {
                return Err(anyhow::anyhow!("comments must not be empty"));
            }
        }
        Ok(())
    }
}
