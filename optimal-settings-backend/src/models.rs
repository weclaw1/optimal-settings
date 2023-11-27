mod game;
mod report;
mod guide;
mod game_image;
mod guide_image;
mod game_settings;
mod game_settings_sources;

pub mod auth;

pub use game::Game;
pub use report::{Report, OperatingSystem};
pub use guide::Guide;
pub use game_image::GameImage;
pub use guide_image::GuideImage;
pub use game_settings::GameSettings;
pub use game_settings_sources::GameSettingsSources;

pub trait ValidateModel {
    fn validate(&self) -> Result<(), anyhow::Error>;
}