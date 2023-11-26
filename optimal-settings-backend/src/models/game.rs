use serde::{Serialize, Deserialize};

use super::{ValidateModel, game_settings::GameSettings, game_settings_sources::GameSettingsSources};

#[derive(Serialize, Deserialize)]
pub struct Game {
    pub id: i64,
    pub name: String,
    pub slug: String,
    pub settings: Option<GameSettings>,
    pub settings_sources: Option<GameSettingsSources>,
}

impl ValidateModel for Game {
    fn validate(&self) -> Result<(), anyhow::Error> {
        if self.id <= 0 {
            return Err(anyhow::anyhow!("id must be positive"));
        }
        if self.name.is_empty() {
            return Err(anyhow::anyhow!("name must not be empty"));
        }
        if self.slug.is_empty() {
            return Err(anyhow::anyhow!("slug must not be empty"));
        }
        if let Some(settings) = &self.settings {
            if let Some(settings_sources) = &self.settings_sources {
                if settings.low.is_some() && settings_sources.low.is_none() {
                    return Err(anyhow::anyhow!("settings_sources.low must not be None"));
                }
                if settings.medium.is_some() && settings_sources.medium.is_none() {
                    return Err(anyhow::anyhow!("settings_sources.medium must not be None"));
                }
                if settings.high.is_some() && settings_sources.high.is_none() {
                    return Err(anyhow::anyhow!("settings_sources.high must not be None"));
                }
            } else {
                return Err(anyhow::anyhow!("settings_sources must not be empty"));
            }
        }

        Ok(())
    }
}
