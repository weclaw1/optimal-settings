use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

#[skip_serializing_none]
#[derive(Serialize, Deserialize)]
pub struct GameSettings {
    pub high: Option<Vec<[String; 2]>>,
    pub medium: Option<Vec<[String; 2]>>,
    pub low: Option<Vec<[String; 2]>>,
    pub additional_informations: Option<String>,
}
