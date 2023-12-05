mod game;
mod game_image;
mod game_settings;
mod game_settings_sources;
mod guide;
mod guide_image;
mod report;

pub mod auth;

pub use game::Game;
pub use game_image::GameImage;
pub use game_settings::GameSettings;
pub use game_settings_sources::GameSettingsSources;
pub use guide::Guide;
pub use guide_image::GuideImage;
pub use report::{OperatingSystem, Report};

pub trait ValidateModel {
    fn validate(&self) -> Result<(), anyhow::Error>;
}
