import CategoryNavBar from "@/common/components/CategoryNavBar";
import Hero from "@/modules/home/components/Hero";
import Categories from "@/modules/home/components/Categories";
import BestDeals from "@/modules/home/components/BestDeals";
import MoreOffers from "@/modules/home/components/MoreOffers";
import BrandStores from "@/modules/home/components/BrandStores";

const Home = () => {
  return (
    <div>
      <CategoryNavBar />
      <Hero />
      <Categories />
      <BestDeals />
      <MoreOffers />
      <BrandStores />
    </div>
  );
};

export default Home;
