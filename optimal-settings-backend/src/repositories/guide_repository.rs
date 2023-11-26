use std::path::PathBuf;

use axum::async_trait;

use crate::models::Guide;

use super::{Repository, SlugRepository};

pub struct GuideRepository{
    guides_path: PathBuf,
}

impl GuideRepository {
    pub fn new(guides_path: PathBuf) -> Self { Self { guides_path } }
}

#[async_trait]
impl Repository<Guide, i64> for GuideRepository {
    async fn get(&self, id: i64) -> Result<Option<Guide>, anyhow::Error> {
        let mut dir = tokio::fs::read_dir(&self.guides_path).await?;
        while let Some(entry) = dir.next_entry().await? {
            let path = entry.path();

            if path.extension().map_or(false, |ext| ext == "json") {
                let file_content = tokio::fs::read_to_string(path).await?;
                let mut guide: Guide = serde_json::from_str(&file_content)?;
                if guide.id == id {
                    let guide_content_path = self.guides_path.join(format!("{}.mdx", guide.slug));
                    if guide_content_path.try_exists()? {
                        let guide_content = tokio::fs::read_to_string(guide_content_path).await?;
                        guide.content = Some(guide_content);
                    }
                    return Ok(Some(guide));
                }
            }
        }
        Ok(None)
    }

    async fn get_all(&self) -> Result<Vec<Guide>, anyhow::Error> {
        let mut dir = tokio::fs::read_dir(&self.guides_path).await?;
        let mut guides = Vec::new();
        while let Some(entry) = dir.next_entry().await? {
            let path = entry.path();

            if path.extension().map_or(false, |ext| ext == "json") {
                let file_content = tokio::fs::read_to_string(path).await?;
                let mut guide: Guide = serde_json::from_str(&file_content)?;
                let guide_content_path = self.guides_path.join(format!("{}.mdx", guide.slug));
                if guide_content_path.try_exists()? {
                    let guide_content = tokio::fs::read_to_string(guide_content_path).await?;
                    guide.content = Some(guide_content);
                }
                guides.push(guide);
            }
        }
        Ok(guides)
    }

    async fn add(&self, _item: Guide) -> Result<i64, anyhow::Error> {
        unimplemented!()
    }

    async fn update(&self, _item: Guide) -> Result<(), anyhow::Error> {
        unimplemented!()
    }

    async fn delete(&self, _id: i64) -> Result<(), anyhow::Error> {
        unimplemented!()
    }

    async fn exists(&self, _id: i64) -> Result<bool, anyhow::Error> {
        unimplemented!()
    }
}

#[async_trait]
impl SlugRepository<Guide> for GuideRepository {
    async fn get_by_slug(&self, slug: &str) -> Result<Option<Guide>, anyhow::Error> {
        let guide_path = self.guides_path.join(format!("{}.json", slug));
        if guide_path.try_exists()? {
            let file_content = tokio::fs::read_to_string(guide_path).await?;
            let mut guide: Guide = serde_json::from_str(&file_content)?;
            let guide_content_path = self.guides_path.join(format!("{}.mdx", guide.slug));
            if guide_content_path.try_exists()? {
                let guide_content = tokio::fs::read_to_string(guide_content_path).await?;
                guide.content = Some(guide_content);
            }
            return Ok(Some(guide));
        }
        Ok(None)
    }
}