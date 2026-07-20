import CategoryNavBar from "@/common/components/CategoryNavBar";
import Hero from "@/modules/home/components/Hero";
import Categories from "@/modules/home/components/Categories";
import BestDeals from "@/modules/home/components/BestDeals";
import MoreOffers from "@/modules/home/components/MoreOffers";

const Home = () => {
  return (
    <div>
      <CategoryNavBar />
      <Hero />
      <Categories />
      <BestDeals />
      <MoreOffers />
    </div>
  );
};

export default Home;
