use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

use super::{GuideImage, ValidateModel};

#[skip_serializing_none]
#[derive(Serialize, Deserialize)]
pub struct Guide {
    pub id: i64,
    pub name: String,
    pub slug: String,
    pub image: GuideImage,
    pub content: Option<String>,
}

impl ValidateModel for Guide {
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
        if let Some(content) = &self.content {
            if content.is_empty() {
                return Err(anyhow::anyhow!("content must not be empty"));
            }
        }
        self.image.validate()?;

        Ok(())
    }
}
