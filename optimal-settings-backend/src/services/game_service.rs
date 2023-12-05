use std::path::PathBuf;

use crate::{
    models::{Game, ValidateModel},
    repositories::{GameRepository, Repository, SlugRepository},
};

const GAMES_PATH: &str = "data/games";

pub async fn get_games() -> Result<Vec<Game>, anyhow::Error> {
    let game_repository = GameRepository::new(PathBuf::from(GAMES_PATH));
    let games = game_repository.get_all().await?;
    games.iter().try_for_each(|game| game.validate())?;
    Ok(games)
}

pub async fn get_game(game_id: u64) -> Result<Option<Game>, anyhow::Error> {
    let game_repository = GameRepository::new(PathBuf::from(GAMES_PATH));
    let game = game_repository.get(game_id.try_into()?).await?;
    if let Some(game) = &game {
        game.validate()?;
    }
    Ok(game)
}

pub async fn get_game_by_slug(slug: &str) -> Result<Option<Game>, anyhow::Error> {
    let game_repository = GameRepository::new(PathBuf::from(GAMES_PATH));
    let game = game_repository.get_by_slug(slug).await?;
    if let Some(game) = &game {
        game.validate()?;
    }
    Ok(game)
}
