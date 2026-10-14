import React from 'react'
import PerformanceAnalytics from './Analytics/PerformanceAnalytics'
import AnalyticsCharts from './Analytics/AnalyticsCharts'
import AnalyticsFunnel from './Analytics/AnalyticsFunnel'

function AnalyticsPage() {
  return (
    <div className='p-5'>
        <PerformanceAnalytics/>
        <AnalyticsCharts/>
        <AnalyticsFunnel/>
    </div>
  )
}

export default AnalyticsPage