import { DashboardClient } from "@/components/dashboard-client";
import { getDashboardData } from "@/lib/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <DashboardClient
      trend={data.trend}
      repos={data.repos}
      topByScore={data.topByScore}
      topByViews={data.topByViews}
      topByCommunity={data.topByCommunity}
      topReferrers={data.topReferrers}
      topPaths={data.topPaths}
      topPerforming={data.topPerforming}
      totals={data.totals}
      sparks={data.sparks}
    />
  );
}