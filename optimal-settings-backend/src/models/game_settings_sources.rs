use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

#[skip_serializing_none]
#[derive(Serialize, Deserialize)]
pub struct GameSettingsSources {
    pub high: Option<String>,
    pub medium: Option<String>,
    pub low: Option<String>,
}
