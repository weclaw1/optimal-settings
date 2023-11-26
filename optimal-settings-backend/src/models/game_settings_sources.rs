use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GameSettingsSources {
    pub high: Option<String>,
    pub medium: Option<String>,
    pub low: Option<String>,
}