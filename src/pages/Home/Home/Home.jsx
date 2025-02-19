import { Helmet } from "react-helmet-async";
import Banner from "../../../components/Banner";
import OurFeatures from "../../../components/OurFeatures";
import TopDeliveryMen from "../../../components/TopDeliveryMen";
import Newsletter from "../NewsLetter/NewsLetter";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ParcelPilot || Home</title>
      </Helmet>
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <TopDeliveryMen></TopDeliveryMen>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
