import React from 'react'

import { Outlet } from 'react-router-dom'

import DashboardSideBar from "../components/DashboardSideBar"
import DashboardNavbar from '../components/Dashboad/DashboardNavbar'




function Dashboad() {
  return (
     <div className="min-h-screen bg-[#0b0b0b] text-white">

      <DashboardSideBar />

      <div className="ml-64 min-h-screen">

        <DashboardNavbar/>

        <main className="p-6 pt-24">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default Dashboad

