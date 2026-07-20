import { useRef } from "react";
import {
  Carrot,
  ChevronRight,
  Flower2,
  Footprints,
  HeartPulse,
  Headphones,
  Shirt,
  ShoppingBag,
} from "lucide-react";

const categories = [
  { label: "Electronics", icon: Headphones },
  { label: "Fashion", icon: Shirt },
  { label: "Luxury", icon: ShoppingBag },
  { label: "Home Decor", icon: Flower2 },
  { label: "Health & Beauty", icon: HeartPulse },
  { label: "Groceries", icon: Carrot },
  { label: "Sneakers", icon: Footprints },
];

const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Explore Popular Categories
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          View All
          <ChevronRight className="size-4" />
        </a>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#"
              className="flex shrink-0 flex-col items-center gap-3"
            >
              <div className="flex size-36 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200">
                <Icon className="size-14 text-slate-700" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium text-slate-800">
                {label}
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll categories"
          onClick={scrollNext}
          className="absolute top-16 right-0 flex size-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-50"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
};

export default Categories;
