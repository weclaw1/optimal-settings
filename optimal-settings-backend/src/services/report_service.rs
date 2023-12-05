use sqlx::SqlitePool;

use crate::{
    models::{Report, ValidateModel},
    repositories::{ReportRepository, Repository},
};

pub async fn get_reports(pool: &SqlitePool) -> Result<Vec<Report>, anyhow::Error> {
    let report_repository = ReportRepository::new(pool.clone());
    let reports = report_repository.get_all().await?;
    reports.iter().try_for_each(|report| report.validate())?;
    Ok(reports)
}

pub async fn get_report(
    pool: &SqlitePool,
    report_id: u64,
) -> Result<Option<Report>, anyhow::Error> {
    let report_repository = ReportRepository::new(pool.clone());
    let report = report_repository.get(report_id.try_into()?).await?;
    if let Some(report) = &report {
        report.validate()?;
    }
    Ok(report)
}

pub async fn get_reports_by_game(
    pool: &SqlitePool,
    game_id: u64,
) -> Result<Vec<Report>, anyhow::Error> {
    let report_repository = ReportRepository::new(pool.clone());
    let reports = report_repository
        .get_by_game_id(game_id.try_into()?)
        .await?;
    reports.iter().try_for_each(|report| report.validate())?;
    Ok(reports)
}

pub async fn add_report(pool: &SqlitePool, report: Report) -> Result<u64, anyhow::Error> {
    let report_repository = ReportRepository::new(pool.clone());
    report.validate()?;
    let record_id = report_repository.add(report).await?;
    Ok(record_id.try_into()?)
}

pub async fn update_report(
    pool: &SqlitePool,
    report_id: u64,
    report: Report,
) -> Result<bool, anyhow::Error> {
    let report_repository = ReportRepository::new(pool.clone());
    report.validate()?;
    if report_repository.exists(report_id.try_into()?).await? {
        return Ok(false);
    }
    report_repository.update(report).await?;
    Ok(true)
}

pub async fn delete_report(pool: &SqlitePool, report_id: u64) -> Result<bool, anyhow::Error> {
    let report_repository = ReportRepository::new(pool.clone());
    if !report_repository.exists(report_id.try_into()?).await? {
        return Ok(false);
    }
    report_repository.delete(report_id.try_into()?).await?;
    Ok(true)
}
