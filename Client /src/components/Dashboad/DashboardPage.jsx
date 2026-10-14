import React from 'react'
import DashboardHome from './DashboardHome'
import TodaysSchedule from './TodaySchedule'
import PriorityLeads from './PriorityLeads'

function DashboardPage() {
  return (
    <div>
        <DashboardHome/>
        <TodaysSchedule/>
        <PriorityLeads/>

    </div>
  )
}

export default DashboardPage