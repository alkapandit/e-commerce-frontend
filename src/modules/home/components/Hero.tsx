import HeroCarousel from "@/common/components/HeroCarousel";
import useBanners from "@/modules/home/hooks/useBanners";

import banner1 from "@/assets/img/banner1.webp";
import banner2 from "@/assets/img/banner2.webp";
import banner3 from "@/assets/img/banner3.webp";
import banner4 from "@/assets/img/banner4.webp";
import banner5 from "@/assets/img/banner5.webp";
import banner6 from "@/assets/img/banner6.webp";
import banner8 from "@/assets/img/banner8.webp";
import sideBanner1 from "@/assets/img/sideBanner1.jpg";

// Fallback so the homepage still looks complete before any banner has been
// added through the admin API.
const fallbackBannerImages = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner8,
];

const Hero = () => {
  const { data: banners } = useBanners({ active: "true" });

  const topBanners = banners?.filter((banner) => banner.placement === "HOME_TOP")
  const sideBanners = banners?.filter((banner) => banner.placement === "HOME_SIDE")

  const heroImages =
    topBanners && topBanners.length > 0
      ? topBanners.map((banner) => banner.imageUrl)
      : fallbackBannerImages;

  const sideImage = sideBanners?.[0]?.imageUrl ?? sideBanner1;

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-6 md:grid-cols-3">
      {/* Promo banner carousel */}
      <div className="col-span-1 md:col-span-2">
        <HeroCarousel
          slides={heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Promo banner ${index + 1}`}
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          ))}
        />
      </div>

      {/* Sale side banner */}
      <div className="col-span-1">
        <img
          src={sideImage}
          alt="Sale up to 50% off"
          className="h-[420px] w-full rounded-2xl object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
