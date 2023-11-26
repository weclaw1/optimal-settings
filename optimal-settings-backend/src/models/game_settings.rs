use std::collections::HashMap;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct GameSettings {
    pub high: Option<HashMap<String, String>>,
    pub medium: Option<HashMap<String, String>>,
    pub low: Option<HashMap<String, String>>,
    pub additional_informations: Option<String>,
}