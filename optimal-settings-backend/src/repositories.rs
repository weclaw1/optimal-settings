use axum::async_trait;

mod game_repository;
mod guide_repository;
mod report_repository;

pub use game_repository::GameRepository;
pub use guide_repository::GuideRepository;
pub use report_repository::ReportRepository;

#[async_trait]
pub trait Repository<T, Id> {
    async fn get(&self, id: Id) -> Result<Option<T>, anyhow::Error>;
    async fn get_all(&self) -> Result<Vec<T>, anyhow::Error>;
    async fn add(&self, item: T) -> Result<Id, anyhow::Error>;
    async fn update(&self, item: T) -> Result<(), anyhow::Error>;
    async fn delete(&self, id: Id) -> Result<(), anyhow::Error>;
    async fn exists(&self, id: Id) -> Result<bool, anyhow::Error>;
}

#[async_trait]
pub trait SlugRepository<T> {
    async fn get_by_slug(&self, slug: &str) -> Result<Option<T>, anyhow::Error>;
}
