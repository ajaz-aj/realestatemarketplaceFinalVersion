import LeadConversionFunnel from "./LeadConversionFunnel";
import TopPerformingProperties from "./TopPerformingProperties";

function AnalyticsFunnel() {
  return (
    <div className="flex gap-4 flex-wrap lg:flex-nowrap m-5 mt-15">
      <LeadConversionFunnel />
      <TopPerformingProperties />
    </div>
  );
}

export default AnalyticsFunnel;