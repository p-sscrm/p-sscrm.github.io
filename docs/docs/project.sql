-- pull related projects for add
DECLARE lastweek DATE DEFAULT "2023-04-10";          
DECLARE thisweek DATE DEFAULT "2023-05-02";

merge into psscrm_dc.project_dimension_incremental as target
using 
-- rel.system || rel.name  || rel.ProjectName || rel.version
(SELECT distinct
  ProjectName, First_Seen, End_Date, OpenIssuesCount,StarsCount, ForksCount
  FROM
  (
    SELECT distinct ProjectName, SnapshotAt First_Seen, SnapshotAt End_Date, OpenIssuesCount,StarsCount, ForksCount
      FROM
      (select distinct Name ProjectName, SnapshotAt, OpenIssuesCount,StarsCount, ForksCount from
        `bigquery-public-data.deps_dev_v1.Projects` pv   
    WHERE TIMESTAMP_TRUNC(pv.SnapshotAt, DAY) in (TIMESTAMP(thisweek))
    )
  )
 ) source
  on target.ProjectName=source.ProjectName and target.OpenIssuesCount=source.OpenIssuesCount and target.StarsCount=source.StarsCount and target.ForksCount=source.ForksCount 
  when matched then 
    update set target.end_date=source.end_date
  when not matched then 
    insert(ProjectName,First_Seen,End_Date,OpenIssuesCount,StarsCount,ForksCount)
    values(source.ProjectName,source.First_Seen, source.End_Date, source.OpenIssuesCount, source.StarsCount, source.ForksCount
)


