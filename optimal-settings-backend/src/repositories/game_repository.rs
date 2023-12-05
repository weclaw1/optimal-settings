use std::path::PathBuf;

use axum::async_trait;

use crate::models::Game;

use super::{Repository, SlugRepository};

pub struct GameRepository {
    games_path: PathBuf,
}

impl GameRepository {
    pub fn new(games_path: PathBuf) -> Self {
        Self { games_path }
    }
}

#[async_trait]
impl Repository<Game, i64> for GameRepository {
    async fn get(&self, id: i64) -> Result<Option<Game>, anyhow::Error> {
        let mut dir = tokio::fs::read_dir(&self.games_path).await?;
        while let Some(entry) = dir.next_entry().await? {
            let path = entry.path();

            if path.extension().map_or(false, |ext| ext == "json") {
                let file_content = tokio::fs::read_to_string(path).await?;
                let game: Game = serde_json::from_str(&file_content)?;
                if game.id == id {
                    return Ok(Some(game));
                }
            }
        }
        Ok(None)
    }

    async fn get_all(&self) -> Result<Vec<Game>, anyhow::Error> {
        let mut dir = tokio::fs::read_dir(&self.games_path).await?;
        let mut games = Vec::new();
        while let Some(entry) = dir.next_entry().await? {
            let path = entry.path();

            if path.extension().map_or(false, |ext| ext == "json") {
                let file_content = tokio::fs::read_to_string(path).await?;
                let game: Game = serde_json::from_str(&file_content)?;
                games.push(game);
            }
        }
        Ok(games)
    }

    async fn add(&self, _item: Game) -> Result<i64, anyhow::Error> {
        unimplemented!()
    }

    async fn update(&self, _item: Game) -> Result<(), anyhow::Error> {
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
impl SlugRepository<Game> for GameRepository {
    async fn get_by_slug(&self, slug: &str) -> Result<Option<Game>, anyhow::Error> {
        let game_path = self.games_path.join(format!("{}.json", slug));
        if game_path.try_exists()? {
            let file_content = tokio::fs::read_to_string(game_path).await?;
            let game: Game = serde_json::from_str(&file_content)?;
            return Ok(Some(game));
        }
        Ok(None)
    }
}
