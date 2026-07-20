import footerBanner1 from "@/assets/img/footerBanner1.jpg";
import footerBanner2 from "@/assets/img/footerBanner2.jpg";
import footerBanner3 from "@/assets/img/footerBanner3.jpg";

const offerBanners = [footerBanner2, footerBanner1, footerBanner3];

const MoreOffers = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        More Offer On Other Category
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {offerBanners.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Category offer ${index + 1}`}
            className="w-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  );
};

export default MoreOffers;
