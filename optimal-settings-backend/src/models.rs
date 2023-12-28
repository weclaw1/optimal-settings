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
pub use guide::Guide;
pub use guide_image::GuideImage;
pub use report::Report;

pub trait ValidateModel {
    fn validate(&self) -> Result<(), anyhow::Error>;
}
