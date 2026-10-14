import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import FeatureSection from "../components/FeatureSection";
import Transaction from "../components/Transaction";
import Collection from "../components/Collections";
import HomeLeadForm from "../components/HomeLeadForm";

function HomePage() {
  return (
    <div>
      <Hero />
      {/* <FeatureSection /> */}
      <Collection />
      <Transaction />
      <HomeLeadForm />
      <Newsletter />
    </div>
  );
}

export default HomePage;