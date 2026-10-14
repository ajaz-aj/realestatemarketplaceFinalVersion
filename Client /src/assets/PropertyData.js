import house1 from "../assets/Property1.jpg";
import house2 from "../assets/Property2.jpg";
import house3 from "../assets/Property3.jpg";
import house4 from "../assets/Property4.jpg";

export const properties = [
  {
    id: 1,
    image: house1,
    status: "Live Auction",
    auction: true,
    title: "Obsidian Peak Estate",
    location: "Presidio Heights, San Francisco",
    price: "₹12,450,000",
    currentBid: true,
    time: "64h 14m 43s",
    bids: 18,
    beds: 6,
    baths: 8,
    sqft: "8,200",
  },

  {
    id: 2,
    image: house2,
    status: "For Sale",
    auction: false,
    title: "The Azure Villa",
    location: "Nob Hill, San Francisco",
    price: "₹8,900,000",
    beds: 4,
    baths: 5,
    sqft: "5,400",
  },

  {
    id: 3,
    image: house3,
    status: "For Sale",
    auction: false,
    title: "Skyline Penthouse",
    location: "South Of Market, San Francisco",
    price: "₹18,500",
    rent: true,
    beds: 3,
    baths: 3,
    sqft: "3,500",
  },

  {
    id: 4,
    image: house4,
    status: "For Sale",
    auction: false,
    title: "The Terra House",
    location: "Marin County Heights",
    price: "₹15,200,000",
    beds: 5,
    baths: 6,
    sqft: "7,300",
  },
];