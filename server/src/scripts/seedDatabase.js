import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "../modules/property/property.model.js";
import Agent from "../modules/agent/agent.model.js";
import User from "../modules/user/user.model.js";
import Auction from "../modules/auction/auction.model.js";
import InvestmentPortfolio from "../modules/investment/investmentPortfolio.model.js";
import Lead from "../modules/leads/lead.model.js";
import Schedule from "../modules/schedules/schedule.model.js";
import Analytics from "../modules/analytics/analytics.model.js";
import Sale from "../modules/sales/sale.model.js";
import Transaction from "../modules/transactions/transaction.model.js";
import Content from "../modules/content/content.model.js";
import RentPhoto from "../modules/rentphoto/rentphoto.model.js";

dotenv.config();

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding.");

    // 1. Get or create a default Agent / User owner
    let defaultUser = await User.findOne({ email: "admin@luxerealty.com" });
    if (!defaultUser) {
      defaultUser = await User.create({
        fullName: "Luxe Realty Concierge",
        email: "admin@luxerealty.com",
        phone: "+1 800 555 0199",
        password: "$2b$10$e7P3m6Jv2.fakehashedpasswordforadminaccount123456",
        role: "admin",
      });
    }

    // 2. Seed Agents
    console.log("Seeding Agents...");
    const agentsData = [
      {
        fullName: "Irina Kolodyazhnaya",
        email: "irina@forbesglobal.com",
        phone: "+7 916 555 0122",
        password: "$2b$10$e7P3m6Jv2.fakehashedpasswordforadminaccount123456",
        role: "agent",
        title: "Senior Property Consultant",
        company: { name: "Forbes Global Properties", logo: "" },
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviewCount: 128,
        country: { name: "Russia", flag: "🇷🇺" },
        languages: ["English", "Russian", "French"],
        listings: { forSale: 14, forRent: 12 },
        specialties: ["PALM SPECIALIST", "High-Value Acquisitions"],
        isOnline: true,
        isVerified: true,
      },
      {
        fullName: "Waseem Awan",
        email: "waseem@exclusivelinks.ae",
        phone: "+971 50 555 0199",
        password: "$2b$10$e7P3m6Jv2.fakehashedpasswordforadminaccount123456",
        role: "agent",
        title: "Executive Property Advisor",
        company: { name: "Exclusive Links RE", logo: "" },
        profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        rating: 5.0,
        reviewCount: 94,
        country: { name: "Pakistan", flag: "🇵🇰" },
        languages: ["English", "German", "Urdu", "Arabic"],
        listings: { forSale: 28, forRent: 9 },
        specialties: ["EMIRATES HILLS", "Ultra-Luxury Estates"],
        isOnline: true,
        isVerified: true,
      },
      {
        fullName: "Sarah Jenkins",
        email: "sarah.jenkins@luxerealty.com",
        phone: "+1 310 555 0188",
        password: "$2b$10$e7P3m6Jv2.fakehashedpasswordforadminaccount123456",
        role: "agent",
        title: "Senior Investment Advisor",
        company: { name: "Luxe Realty Sovereign", logo: "" },
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviewCount: 156,
        country: { name: "United States", flag: "🇺🇸" },
        languages: ["English", "French"],
        listings: { forSale: 19, forRent: 8 },
        specialties: ["HIGH-VALUE ACQUISITIONS", "Private Wealth Portfolios"],
        isOnline: true,
        isVerified: true,
      },
      {
        fullName: "Marcus Vance",
        email: "marcus.vance@sothebys.com",
        phone: "+44 20 7946 0912",
        password: "$2b$10$e7P3m6Jv2.fakehashedpasswordforadminaccount123456",
        role: "agent",
        title: "Principal Wealth Partner",
        company: { name: "Sotheby's International", logo: "" },
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        rating: 5.0,
        reviewCount: 82,
        country: { name: "United Kingdom", flag: "🇬🇧" },
        languages: ["English", "Italian"],
        listings: { forSale: 11, forRent: 5 },
        specialties: ["PRIVATE ISLANDS", "Historic Mansions"],
        isOnline: true,
        isVerified: true,
      },
    ];

    for (const a of agentsData) {
      await Agent.findOneAndUpdate({ email: a.email }, { $set: a }, { upsert: true, new: true });
    }

    // 3. Seed Properties
    console.log("Seeding Properties...");
    const propertiesData = [
      {
        title: "Obsidian Peak Estate",
        description: "An architectural marvel perched high on Presidio Heights offering sweeping views, private gated motor court, wine vault, and infinity edge heated pool.",
        price: 12450000,
        propertyType: "villa",
        listingType: "sale",
        listenType: "sale",
        location: {
          address: "Presidio Heights, San Francisco",
          city: "San Francisco",
          state: "California",
          country: "USA",
        },
        bedrooms: 6,
        bathrooms: 8,
        area: 8200,
        image: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "Live Auction",
        badgeColor: "bg-amber-600",
        owner: defaultUser._id,
      },
      {
        title: "The Azure Villa",
        description: "Sophisticated luxury residence overlooking Nob Hill. Features soaring double-height ceilings, custom marble finishes, and private wellness spa.",
        price: 8900000,
        propertyType: "villa",
        listingType: "sale",
        listenType: "sale",
        location: {
          address: "Nob Hill, San Francisco",
          city: "San Francisco",
          state: "California",
          country: "USA",
        },
        bedrooms: 4,
        bathrooms: 5,
        area: 5400,
        image: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "For Sale",
        badgeColor: "bg-blue-600",
        owner: defaultUser._id,
      },
      {
        title: "Skyline Penthouse",
        description: "Crown jewel penthouse offering 360-degree skyline views, private terrace with plunge pool, and custom Italian millwork.",
        price: 185000,
        propertyType: "apartment",
        listingType: "rent",
        listenType: "rent",
        location: {
          address: "South Of Market, San Francisco",
          city: "San Francisco",
          state: "California",
          country: "USA",
        },
        bedrooms: 3,
        bathrooms: 3,
        area: 3500,
        image: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "For Rent",
        badgeColor: "bg-purple-600",
        owner: defaultUser._id,
      },
      {
        title: "The Terra House",
        description: "Harmoniously integrated into Marin County Heights with expansive glass walls, zero-carbon geothermal heating, and private olive grove.",
        price: 15200000,
        propertyType: "villa",
        listingType: "sale",
        listenType: "sale",
        location: {
          address: "Marin County Heights",
          city: "Marin County",
          state: "California",
          country: "USA",
        },
        bedrooms: 5,
        bathrooms: 6,
        area: 7300,
        image: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "Exclusive",
        badgeColor: "bg-amber-600",
        owner: defaultUser._id,
      },
      {
        title: "Imperial Heights Suite",
        description: "Ultra-luxury corner suite in the heart of Lavelle Road Central Business District with private elevator access and concierge service.",
        price: 9500000,
        propertyType: "apartment",
        listingType: "sale",
        listenType: "sale",
        location: {
          address: "Lavelle Road, Central Business District",
          city: "Bangalore",
          state: "Karnataka",
          country: "India",
        },
        bedrooms: 3,
        bathrooms: 3,
        area: 2100,
        image: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "Sold",
        badgeColor: "bg-emerald-600",
        owner: defaultUser._id,
      },
      {
        title: "Azure Marina Waterfront",
        description: "Coastal masterpiece located on Reis Magos Coastal Highway with private yacht mooring and private beach access.",
        price: 31000000,
        propertyType: "villa",
        listingType: "sale",
        listenType: "sale",
        location: {
          address: "Reis Magos Coastal Highway",
          city: "Goa",
          state: "Goa",
          country: "India",
        },
        bedrooms: 4,
        bathrooms: 5,
        area: 4600,
        image: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "Pending",
        badgeColor: "bg-yellow-600",
        owner: defaultUser._id,
      },
      {
        title: "Skyline Lumina Loft",
        description: "High-floor designer duplex with floor-to-ceiling panoramic glass on Golf Course Extension Road.",
        price: 180000,
        propertyType: "apartment",
        listingType: "rent",
        listenType: "rent",
        location: {
          address: "Golf Course Extension Road",
          city: "Gurgaon",
          state: "Haryana",
          country: "India",
        },
        bedrooms: 2,
        bathrooms: 2,
        area: 1750,
        image: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "Active",
        badgeColor: "bg-blue-600",
        owner: defaultUser._id,
      },
      {
        title: "The Grand Bel-Air Residence",
        description: "Gated celebrity enclave compound with screening room, infinity pool, and lush manicured grounds.",
        price: 22000000,
        propertyType: "villa",
        listingType: "sale",
        listenType: "sale",
        location: {
          address: "Bel Air Road",
          city: "Los Angeles",
          state: "California",
          country: "USA",
        },
        bedrooms: 5,
        bathrooms: 6,
        area: 6500,
        image: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        ],
        images: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
        ],
        badge: "Active",
        badgeColor: "bg-amber-600",
        owner: defaultUser._id,
      },
    ];

    const seededProperties = [];
    for (const p of propertiesData) {
      const prop = await Property.findOneAndUpdate(
        { title: p.title },
        { $set: p },
        { upsert: true, new: true }
      );
      seededProperties.push(prop);
    }

    // 4. Seed Auctions
    console.log("Seeding Auctions...");
    const auctionProperty = seededProperties.find((p) => p.title === "Obsidian Peak Estate") || seededProperties[0];
    if (auctionProperty) {
      await Auction.findOneAndUpdate(
        { property: auctionProperty._id },
        {
          $set: {
            property: auctionProperty._id,
            seller: defaultUser._id,
            startingPrice: 10000000,
            currentPrice: 12450000,
            startTime: new Date(Date.now() - 3600000 * 24),
            endTime: new Date(Date.now() + 3600000 * 64),
            status: "active",
          },
        },
        { upsert: true, new: true }
      );
    }

    // 5. Seed Investment Portfolios
    console.log("Seeding Investment Portfolios...");
    const portfoliosData = [
      {
        title: "Residential Portfolios",
        subtitle: "Multi-Family & Luxury Estates",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        expectedYield: "14.2% IRR",
        minInvestment: "₹50 Lakh",
        displayOrder: 1,
      },
      {
        title: "Commercial Assets",
        subtitle: "Prime Office & Retail Spaces",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        expectedYield: "12.8% IRR",
        minInvestment: "₹1 Cr",
        displayOrder: 2,
      },
      {
        title: "Global Hospitality Funds",
        subtitle: "Boutique Resorts & Private Islands",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        expectedYield: "16.5% IRR",
        minInvestment: "₹75 Lakh",
        displayOrder: 3,
      },
      {
        title: "Logistics & Tech Parks",
        subtitle: "High-Growth Industrial Hubs",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        expectedYield: "13.9% IRR",
        minInvestment: "₹25 Lakh",
        displayOrder: 4,
      },
    ];

    for (const port of portfoliosData) {
      await InvestmentPortfolio.findOneAndUpdate(
        { title: port.title },
        { $set: port },
        { upsert: true, new: true }
      );
    }

    // 6. Seed Leads
    console.log("Seeding Leads...");
    const leadsData = [
      {
        name: "Tarun Kapoor",
        phone: "+91 98110 33219",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        property: { name: "Imperial Heights Suite", price: "₹95 Lakh" },
        budget: "₹95 Lakh",
        source: "Referral",
        priority: "Low",
        stage: "Converted",
        status: "Converted",
        followUp: "Completed",
        lastContact: "2 Days Ago",
        isOnline: false,
      },
      {
        name: "Kavita Krishnamurthy",
        phone: "+91 97110 55432",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        property: { name: "Azure Marina Waterfront", price: "₹3.10 Cr" },
        budget: "₹3.10 Cr",
        source: "MagicBricks",
        priority: "High",
        stage: "Negotiation",
        status: "Negotiation",
        followUp: "Wednesday, 11:30 AM",
        lastContact: "Yesterday, 02:30 PM",
        isOnline: true,
      },
      {
        name: "Siddharth Verma",
        phone: "+91 98860 99214",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        property: { name: "Skyline Lumina Loft", price: "₹1.80 Lakh/mo" },
        budget: "₹1.80 Lakh/mo",
        source: "Website",
        priority: "Medium",
        stage: "Interested",
        status: "Contacted",
        followUp: "Friday, 02:00 PM",
        lastContact: "3 Days Ago",
        isOnline: false,
      },
      {
        name: "Ananya Mehta",
        phone: "+91 99001 77341",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        property: { name: "The Grand Bel-Air Residence", price: "₹2.20 Cr" },
        budget: "₹2.20 Cr",
        source: "Luxury Expo",
        priority: "Medium",
        stage: "Site Visit",
        status: "Interested",
        followUp: "Thursday, 10:00 AM",
        lastContact: "Yesterday",
        isOnline: true,
      },
      {
        name: "Dr. Vikramaditya Rao",
        phone: "+91 94480 66712",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        property: { name: "Golden Crest Villa", price: "₹72 Lakh" },
        budget: "₹72 Lakh",
        source: "Direct Walk-in",
        priority: "High",
        stage: "Site Visit",
        status: "Site Visit",
        followUp: "Today, 04:45 PM (Site Visit)",
        lastContact: "Yesterday, 06:10 PM",
        isOnline: true,
      },
      {
        name: "Rajesh Singhania",
        phone: "+91 98201 44521",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
        property: { name: "Crystal Bay Manor", price: "₹85 Lakh" },
        budget: "₹85 Lakh",
        source: "Referral",
        priority: "High",
        stage: "Contacted",
        status: "Site Visit",
        followUp: "Today, 12:30 PM (Site Visit)",
        lastContact: "Today, 09:15 AM",
        isOnline: true,
      },
    ];

    for (const lead of leadsData) {
      await Lead.findOneAndUpdate({ phone: lead.phone }, { $set: lead }, { upsert: true, new: true });
    }

    // 7. Seed Schedules
    console.log("Seeding Schedules...");
    const schedulesData = [
      {
        time: "02:30 PM",
        day: "Today",
        title: "Obsidian Peak Estate",
        status: "Confirmed",
        price: "₹85 Lakh",
        type: "2 BHK Villa",
        location: "Bangalore",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"],
        imageCount: 2,
        client: { name: "Antony", phone: "(+91 98450 12891)" },
      },
      {
        time: "12:30 PM",
        day: "Today",
        title: "Crystal Bay Manor",
        status: "Confirmed",
        price: "₹85 Lakh",
        type: "3 BHK Apartment",
        location: "Indiranagar",
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"],
        imageCount: 3,
        client: { name: "Rajesh Singhania", phone: "(+91 98201 44521)" },
      },
      {
        time: "10:30 AM",
        day: "Today",
        title: "Obsidian Peak Estate",
        status: "Confirmed",
        price: "₹85 Lakh",
        type: "2 BHK Villa",
        location: "Bangalore",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"],
        imageCount: 2,
        client: { name: "Antony", phone: "(+91 98450 12891)" },
      },
    ];

    for (const sc of schedulesData) {
      await Schedule.findOneAndUpdate(
        { title: sc.title, time: sc.time },
        { $set: sc },
        { upsert: true, new: true }
      );
    }

    // 8. Seed Analytics
    console.log("Seeding Analytics...");
    const analyticsDoc = {
      type: "general",
      metrics: {
        today: [
          { label: "TOTAL\nLISTINGS", value: "24", sub: "+4 this month", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "PROPERTY\nVIEWS", value: "8,420", sub: "+18.2% vs prev", valueColor: "#60A5FA", subColor: "#10B981" },
          { label: "TOTAL LEADS", value: "19", sub: "4 High Priority", valueColor: "#C88A1A", subColor: "#9CA3AF" },
          { label: "SITE VISITS", value: "12", sub: "3 Today", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "CONVERSIONS", value: "2\nDeals", sub: "100% On-Target", valueColor: "#10B981", subColor: "#10B981" },
          { label: "EST. SALES\nVALUE", value: "₹8.95\nCR", sub: "₹17.9L Est. Comm.", valueColor: "#FFFFFF", subColor: "#C88A1A" },
        ],
        "7days": [
          { label: "TOTAL\nLISTINGS", value: "24", sub: "+2 this week", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "PROPERTY\nVIEWS", value: "52,100", sub: "+9.4% vs prev", valueColor: "#60A5FA", subColor: "#10B981" },
          { label: "TOTAL LEADS", value: "84", sub: "12 High Priority", valueColor: "#C88A1A", subColor: "#9CA3AF" },
          { label: "SITE VISITS", value: "41", sub: "8 This Week", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "CONVERSIONS", value: "6\nDeals", sub: "On-Target", valueColor: "#10B981", subColor: "#10B981" },
          { label: "EST. SALES\nVALUE", value: "₹22.4\nCR", sub: "₹44L Est. Comm.", valueColor: "#FFFFFF", subColor: "#C88A1A" },
        ],
        "30days": [
          { label: "TOTAL\nLISTINGS", value: "24", sub: "+6 this month", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "PROPERTY\nVIEWS", value: "1,84,000", sub: "+22.1% vs prev", valueColor: "#60A5FA", subColor: "#10B981" },
          { label: "TOTAL LEADS", value: "142", sub: "19 High Priority", valueColor: "#C88A1A", subColor: "#9CA3AF" },
          { label: "SITE VISITS", value: "98", sub: "12 This Month", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "CONVERSIONS", value: "18\nDeals", sub: "On-Target", valueColor: "#10B981", subColor: "#10B981" },
          { label: "EST. SALES\nVALUE", value: "₹48.2\nCR", sub: "₹96L Est. Comm.", valueColor: "#FFFFFF", subColor: "#C88A1A" },
        ],
        "3months": [
          { label: "TOTAL\nLISTINGS", value: "24", sub: "+14 this qtr", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "PROPERTY\nVIEWS", value: "5,20,000", sub: "+31.4% vs prev", valueColor: "#60A5FA", subColor: "#10B981" },
          { label: "TOTAL LEADS", value: "380", sub: "44 High Priority", valueColor: "#C88A1A", subColor: "#9CA3AF" },
          { label: "SITE VISITS", value: "214", sub: "28 This Qtr", valueColor: "#FFFFFF", subColor: "#10B981" },
          { label: "CONVERSIONS", value: "42\nDeals", sub: "On-Target", valueColor: "#10B981", subColor: "#10B981" },
          { label: "EST. SALES\nVALUE", value: "₹1.2\nCR", sub: "₹2.4Cr Est. Comm.", valueColor: "#FFFFFF", subColor: "#C88A1A" },
        ],
      },
      viewsInquiries: [
        { day: "Mon", views: 120, inquiries: 20 },
        { day: "Tue", views: 180, inquiries: 35 },
        { day: "Wed", views: 210, inquiries: 42 },
        { day: "Thu", views: 190, inquiries: 38 },
        { day: "Fri", views: 240, inquiries: 55 },
        { day: "Sat", views: 320, inquiries: 70 },
        { day: "Sun", views: 410, inquiries: 90 },
      ],
      marketingChannels: [
        { label: "Website Inbound", leads: 8, percent: 42, color: "#C88A1A" },
        { label: "Instagram VIP Campaigns", leads: 4, percent: 21, color: "#60A5FA" },
        { label: "Client Referrals", leads: 3, percent: 16, color: "#10B981" },
        { label: "Direct Office Walk-in", leads: 2, percent: 11, color: "#A78BFA" },
        { label: "MagicBricks / 99acres", leads: 2, percent: 10, color: "#F472B6" },
      ],
      insightText: {
        icon: "✦",
        message: "Website inbound conversions are ",
        highlight: "42% higher",
        suffix: " this month following the ultra-luxury responsive upgrade.",
      },
      funnelStages: [
        { label: "Impressions & Views", value: 8420, percent: 100, percentLabel: "100%", color: "#374151" },
        { label: "Inquiries Received", value: 184, percent: 21.8, percentLabel: "21.8%", color: "#374151" },
        { label: "Qualified Active Leads", value: 19, percent: 10.3, percentLabel: "10.3%", color: "#C88A1A" },
        { label: "Site Visits Conducted", value: 12, percent: 63.1, percentLabel: "63.1%", color: "#3B82F6" },
        { label: "Price Negotiation", value: 5, percent: 41.6, percentLabel: "41.6%", color: "#8B5CF6" },
        { label: "Deals Closed & Converted", value: 2, percent: 40.0, percentLabel: "40.0%", color: "#10B981" },
      ],
      topProperties: [
        { title: "Imperial Heights Suite", price: "₹95 Lakh", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80", views: 2890, leads: 42, visits: 18 },
        { title: "Azure Marina Waterfront", price: "₹3.10 Cr", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80", views: 1650, leads: 19, visits: 7 },
        { title: "Skyline Lumina Loft", price: "₹1.80 Lakh/mo", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80", views: 760, leads: 9, visits: 3 },
        { title: "The Grand Bel-Air Residence", price: "₹2.20 Cr", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80", views: 3410, leads: 29, visits: 14 },
        { title: "The Sovereign Penthouse", price: "₹1.45 Cr", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80", views: 2190, leads: 31, visits: 11 },
      ],
    };

    await Analytics.findOneAndUpdate({ type: "general" }, { $set: analyticsDoc }, { upsert: true, new: true });

    // 9. Seed Sales
    console.log("Seeding Sales...");
    const salesData = [
      {
        title: "Blue Sky Manor",
        price: "₹14.2M",
        time: "5 Days Ago",
        location: "Presidio Heights",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "The Gilded Loft",
        price: "₹5.3M",
        time: "7 Days Ago",
        location: "Nob Hill",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Marina Terrace",
        price: "₹5.3M",
        time: "1 Week Ago",
        location: "Marina District",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Oceanic Heritage",
        price: "₹5.3M",
        time: "2 Weeks Ago",
        location: "Pacific Heights",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      },
    ];

    for (const s of salesData) {
      await Sale.findOneAndUpdate({ title: s.title }, { $set: s }, { upsert: true, new: true });
    }

    // 10. Seed Transactions
    console.log("Seeding Transactions...");
    const transactionsData = [
      {
        targetAudience: "sellers",
        title: "For Sellers",
        buttonText: "List Your Property",
        buttonAction: "/SellOrRentForm",
        steps: [
          {
            title: "Professional Valuation",
            desc: "AI-Powered Market Analysis Paired With Expert Appraisal For The Perfect Listing Price.",
          },
          {
            title: "Global Exposure",
            desc: "Your Property Featured Across Our Elite Network Of Global High-Net-Worth Investors.",
          },
          {
            title: "Concierge Closing",
            desc: "Dedicated Transaction Managers Handle Every Legal And Administrative Detail.",
          },
        ],
      },
      {
        targetAudience: "bidders",
        title: "For Bidders",
        buttonText: "Join Live Auction",
        buttonAction: "/auction",
        steps: [
          {
            title: "Verified Registration",
            desc: "Secure KYC And Financial Vetting To Ensure A Fair And Premium Auction Environment.",
          },
          {
            title: "Real-Time Bidding",
            desc: "Ultra-Low Latency Bidding Engine With Instant Notifications And Property Updates.",
          },
          {
            title: "Instant Ownership",
            desc: "Automated Smart Contracts Facilitate Rapid Transition Of Ownership Post Auction.",
          },
        ],
      },
    ];

    for (const t of transactionsData) {
      await Transaction.findOneAndUpdate(
        { targetAudience: t.targetAudience },
        { $set: t },
        { upsert: true, new: true }
      );
    }

    // 11. Seed Content (Security & Neighborhood Attractions)
    console.log("Seeding Content...");
    await Content.findOneAndUpdate(
      { key: "security" },
      {
        $set: {
          key: "security",
          title: "Bank-Grade Asset Protection",
          subtitle: "Institutional-Grade Custody & Legal Due Diligence",
          items: [
            {
              id: 1,
              icon: "ShieldCheck",
              title: "Expert Vetting Process",
              description: "Every asset undergoes a rigorous 200-point inspection and legal audit before inclusion in our pools.",
            },
            {
              id: 2,
              icon: "BadgeCheck",
              title: "Fractional Ownership",
              description: "Invest in multi-million dollar assets with lower entry points through our secure syndication model.",
            },
            {
              id: 3,
              icon: "Lock",
              title: "Bank-Grade Custody",
              description: "Assets are held in bankruptcy-remote vehicles with institutional-grade protection protocols.",
            },
          ],
        },
      },
      { upsert: true, new: true }
    );

    await Content.findOneAndUpdate(
      { key: "neighborhood" },
      {
        $set: {
          key: "neighborhood",
          title: "Location Highlights",
          subtitle: "Explore The Prestigious Neighborhood",
          items: [
            { icon: "Crosshair", title: "8 Minutes To Downtown Napa" },
            { icon: "Wine", title: "5 Minutes To World-Class Wineries" },
            { icon: "Trees", title: "10 Minutes To Silverado Resort & Golf Club" },
            { icon: "UtensilsCrossed", title: "Walking Distance To Michelin-Star Restaurants" },
            { icon: "Plane", title: "1 Hour To San Francisco International Airport (SFO)" },
          ],
        },
      },
      { upsert: true, new: true }
    );

    // 12. Seed Rental Collections (RentPhoto)
    console.log("Seeding Rental Collections...");
    await RentPhoto.deleteMany({});
    await RentPhoto.insertMany([
      {
        title: "Waterfront Retreats",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
        description: "Available for immediate occupancy and premier seasonal retreats.",
        size: "large",
        badge: "Curated",
        displayOrder: 1,
        isActive: true,
      },
      {
        title: "Urban Penthouses",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
        description: "Panoramic skyline views and full hotel-style concierge service.",
        size: "small",
        badge: "Popular",
        displayOrder: 2,
        isActive: true,
      },
      {
        title: "Country Manors",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        description: "Expansive private grounds, equestrian facilities, and serene landscapes.",
        size: "small",
        badge: "Exclusive",
        displayOrder: 3,
        isActive: true,
      },
    ]);

    console.log("✅ ALL DATA SUCCESSFULLY SEEDED INTO MONGODB DATABASE!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seed();
