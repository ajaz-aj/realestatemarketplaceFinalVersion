import React from 'react'
import InvestHero from '../components/InvestHero'
import LiveMarketInsights from '../components/LiveMarketInssight'
import InvestmentSection from '../components/InvestmentSection'
import Newsletter from '../components/Newsletter'
import SecuritySection from '../components/SecuritySection'

function Invest() {
  return (
    <div>
        <InvestHero/>
        <LiveMarketInsights/>
        <InvestmentSection/>
        <SecuritySection/>
        <Newsletter/>
    </div>
  )
}

export default Invest