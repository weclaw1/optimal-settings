use serde::{Deserialize, Serialize};

use super::{
    game_settings::GameSettings, game_settings_sources::GameSettingsSources, GameImage,
    ValidateModel,
};

#[derive(Serialize, Deserialize)]
pub struct Game {
    pub id: i64,
    pub name: String,
    pub slug: String,
    pub image: GameImage,
    pub settings: GameSettings,
    pub settings_sources: GameSettingsSources,
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
        if self.settings.low.is_some() && self.settings_sources.low.is_none() {
            return Err(anyhow::anyhow!("settings_sources.low must not be None"));
        }
        if self.settings.medium.is_some() && self.settings_sources.medium.is_none() {
            return Err(anyhow::anyhow!("settings_sources.medium must not be None"));
        }
        if self.settings.high.is_some() && self.settings_sources.high.is_none() {
            return Err(anyhow::anyhow!("settings_sources.high must not be None"));
        }
        if self.settings_sources.low.is_some() && self.settings.low.is_none() {
            return Err(anyhow::anyhow!("settings.low must not be None"));
        }
        if self.settings_sources.medium.is_some() && self.settings.medium.is_none() {
            return Err(anyhow::anyhow!("settings.medium must not be None"));
        }
        if self.settings_sources.high.is_some() && self.settings.high.is_none() {
            return Err(anyhow::anyhow!("settings.high must not be None"));
        }
        self.image.validate()?;

        Ok(())
    }
}
