use std::path::PathBuf;

use crate::{models::{Guide, ValidateModel}, repositories::{GuideRepository, Repository, SlugRepository}};

const GUIDES_PATH: &str = "data/guides";

pub async fn get_guides() -> Result<Vec<Guide>, anyhow::Error> {
    let guide_repository = GuideRepository::new(PathBuf::from(GUIDES_PATH));
    let guides = guide_repository.get_all().await?;
    guides.iter().try_for_each(|guide| guide.validate())?;
    Ok(guides)
}

pub async fn get_guide(guide_id: u64) -> Result<Option<Guide>, anyhow::Error> {
    let guide_repository = GuideRepository::new(PathBuf::from(GUIDES_PATH));
    let guide = guide_repository.get(guide_id.try_into()?).await?;
    if let Some(guide) = &guide {
        guide.validate()?;
    }
    Ok(guide)
}

pub async fn get_guide_by_slug(slug: &str) -> Result<Option<Guide>, anyhow::Error> {
    let guide_repository = GuideRepository::new(PathBuf::from(GUIDES_PATH));
    let guide = guide_repository.get_by_slug(slug).await?;
    if let Some(guide) = &guide {
        guide.validate()?;
    }
    Ok(guide)
}