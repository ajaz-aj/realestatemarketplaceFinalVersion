export const pageConfig = {
  dashboard: {
    topLabel: new Date().toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    }).toUpperCase(),
    title: "Good Morning, John",
    description: "Here's what's happening with your properties and leads today.",
    stats: [
      { label: "ACTIVE\nLISTINGS",      value: "6",        sub: "4 New This Month",       change: "+33%",  iconKey: "building"  },
      { label: "TOTAL\nPROPERTY VALUE", value: "₹4.28 CR", sub: "Across Active Listings", change: "+12.5%", iconKey: "dollar"   },
      { label: "ACTIVE\nLEADS",         value: "8",        sub: "5 High Priority",        change: "+8%",   iconKey: "users"    },
      { label: "SITE\nVISITS",          value: "3",        sub: "3 Scheduled",            change: "+25%",  iconKey: "calendar" },
    ],
  },
};