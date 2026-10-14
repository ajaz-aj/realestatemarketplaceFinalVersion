import PropertyViewsChart from "./PropertyViewsChart";
import MarketingChannels from "./MarketingChannels";

function AnalyticsCharts() {
  return (
    <div className="flex gap-4 flex-wrap lg:flex-nowrap m-5 mt-15">
      <PropertyViewsChart />
      <MarketingChannels />
    </div>
  );
}

export default AnalyticsCharts;