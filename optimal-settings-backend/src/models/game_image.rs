use serde::{Serialize, Deserialize};

use super::ValidateModel;

#[derive(Serialize, Deserialize)]
pub struct GameImage {
    pub src: String,
    pub alt: String,
    pub width: i64,
    pub height: i64,
}

impl ValidateModel for GameImage {
    fn validate(&self) -> Result<(), anyhow::Error> {
        if self.src.is_empty() {
            return Err(anyhow::anyhow!("src must not be empty"));
        }
        if self.width <= 0 {
            return Err(anyhow::anyhow!("width must be positive"));
        }
        if self.height <= 0 {
            return Err(anyhow::anyhow!("height must be positive"));
        }

        Ok(())
    }
}

