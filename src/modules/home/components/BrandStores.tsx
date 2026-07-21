type Brand = {
  name: string;
  mark: string;
  markClassName: string;
};

const brands: Brand[] = [
  { name: "Adidas", mark: "adidas", markClassName: "text-sm font-bold text-slate-900 italic" },
  { name: "Nestle", mark: "Nestle", markClassName: "text-sm font-bold text-red-600 italic" },
  { name: "Pdrepper", mark: "Dr Pepper", markClassName: "text-xs font-bold text-red-700" },
  { name: "LG Electronics", mark: "LG", markClassName: "text-lg font-extrabold text-white" },
  { name: "Dell", mark: "DELL", markClassName: "text-xs font-extrabold text-sky-600" },
  { name: "Apple", mark: "Apple", markClassName: "text-sm font-semibold text-slate-900" },
  { name: "Chanel", mark: "CHANEL", markClassName: "text-[10px] font-semibold tracking-widest text-slate-900" },
  { name: "Zara Fashion", mark: "ZARA", markClassName: "text-xs font-semibold tracking-[0.2em] text-slate-900" },
];

const BrandStores = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Explore Official Brand Stores
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map(({ name, mark, markClassName }) => (
          <a
            key={name}
            href="#"
            className="flex items-center gap-4 rounded-xl bg-slate-100 p-4 transition-colors hover:bg-slate-200"
          >
            <div
              className={
                name === "LG Electronics"
                  ? "flex size-14 shrink-0 items-center justify-center rounded-full bg-[#a6076b]"
                  : "flex size-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
              }
            >
              <span className={markClassName}>{mark}</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">{name}</p>
              <p className="text-xs text-slate-500">Delivery with in 24 hours</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BrandStores;
