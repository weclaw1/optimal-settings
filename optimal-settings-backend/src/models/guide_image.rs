/* CREATE TABLE guide_images (
    id          bigserial     primary key,
    guide_id    bigint        NOT NULL references guides (id) ON DELETE CASCADE,
    src         varchar(255)  NOT NULL,
    alt         varchar(255)  NOT NULL,
    attribution varchar(500),
    width       smallint      NOT NULL CHECK (width > 0),
    height      smallint      NOT NULL CHECK (height > 0)
); */

use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;

use super::ValidateModel;

#[skip_serializing_none]
#[derive(Serialize, Deserialize)]
pub struct GuideImage {
    pub src: String,
    pub alt: String,
    pub attribution: Option<String>,
    pub width: i64,
    pub height: i64,
}

impl ValidateModel for GuideImage {
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
