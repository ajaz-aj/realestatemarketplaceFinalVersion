import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Properties from "./pages/Properties";
import Hero from "./components/Hero";
import MarketPlace from "./pages/MarketPlace";
import Rentals from "./pages/Rentals";
import Invest from "./pages/Invest";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ViewDetails from "./pages/ViewDetails";
import ChatSection from "./pages/ChatSection";
import Profile from "./pages/Profile";
import DiscoverItems from "./pages/DiscoverItems";
import SavedCollectionItems from "./pages/SavedCollectionItems";
import SellOrRentForm from "./pages/SellOrRentForm";
import Dashboad from "./pages/Dashboad";
import FindAgent from "./pages/FindAgent";
import DashboardPage from "./components/Dashboad/DashboardPage";
import PropertiesPage from "./components/Dashboad/PropertiesPage";
import LeadsPage from "./components/Dashboad/LeadsPage";
import AnalyticsPage from "./components/Dashboad/AnalyticsPage";
import AgentChatPage from "./components/Dashboad/AgentChatPage";




function App() {
  return (
    <Routes>

      {/* ==========================================
          MAIN SITE — with Navbar/Footer Layout
      ========================================== */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="findagent" element={<FindAgent />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="auction" element={<Navigate to="/marketplace" replace />} />
        <Route path="auctions" element={<Navigate to="/marketplace" replace />} />
        <Route path="rentals" element={<Rentals />} />
        <Route path="invest" element={<Invest />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="LogIn" element={<LogIn />} />
        <Route path="profile" element={<Profile />} />
        <Route path="savedcollectionitems" element={<SavedCollectionItems />} />
        <Route path="discoveritems" element={<DiscoverItems />} />
        <Route path="ViewDetails" element={<ViewDetails />} />
        <Route path="ChatSection" element={<ChatSection />} />
        <Route path="SellOrRentForm" element={<SellOrRentForm />} />
      </Route>

      {/* ==========================================
          DASHBOARD — NO Navbar/Footer
          Completely separate from Layout
      ========================================== */}
      <Route path="/dashboard" element={<Dashboad />}>
       <Route index  element={<DashboardPage/>}/>
       <Route path="/dashboard/properties" element={<PropertiesPage/>}/>
       <Route path="/dashboard/leads" element={<LeadsPage/>}/>
       <Route path="/dashboard/analytics" element={<AnalyticsPage/>}/>
       <Route path="/dashboard/chat" element={<AgentChatPage/>}/>
      </Route>

    </Routes>
  );
}

export default App;