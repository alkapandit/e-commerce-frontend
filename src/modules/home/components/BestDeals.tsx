import {
  Armchair,
  ChevronRight,
  Footprints,
  Gem,
  Heart,
  Shirt,
  Smartphone,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Deal = {
  icon: typeof Smartphone;
  title: string;
  rating: number;
  reviews: string;
  price: string;
  originalPrice?: string;
};

const deals: Deal[] = [
  {
    icon: Smartphone,
    title: "Samsung Galaxy S24 Ultra 12+GB Titanium Gray...",
    rating: 4.5,
    reviews: "1.2k",
    price: "999.99",
  },
  {
    icon: Shirt,
    title: "Nike Jordan Brooklyn Fleece Men's Pullover Hoodie...",
    rating: 3,
    reviews: "569",
    price: "45.00",
  },
  {
    icon: Armchair,
    title: "Beanless Bag Inflatable Lounge Chair Grey",
    rating: 4,
    reviews: "100",
    price: "32.00",
    originalPrice: "48.00",
  },
  {
    icon: Gem,
    title: "Diamond Stud Earrings (1/3 ct. t.w.) in 14K White, Yellow or Rose Gold",
    rating: 4.5,
    reviews: "1.1k",
    price: "299.00",
  },
  {
    icon: Footprints,
    title: "Nike Invincible 3 Premium",
    rating: 4,
    reviews: "157",
    price: "190",
  },
];

const StarRating = ({ rating, reviews }: { rating: number; reviews: string }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(rating);
        return (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              filled ? "fill-blue-600 text-blue-600" : "fill-slate-200 text-slate-200"
            )}
          />
        );
      })}
    </div>
    <span className="text-xs text-slate-500">({reviews})</span>
  </div>
);

const BestDeals = () => {
  return (
    <section id="best-deals" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Todays Best Deals For You!
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          View All
          <ChevronRight className="size-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {deals.map(({ icon: Icon, title, rating, reviews, price, originalPrice }) => (
          <a key={title} href="#" className="flex flex-col gap-2">
            <div className="relative flex aspect-square items-center justify-center rounded-xl bg-slate-100">
              <button
                type="button"
                aria-label="Add to wishlist"
                onClick={(event) => event.preventDefault()}
                className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/80 text-slate-500 transition-colors hover:text-red-500"
              >
                <Heart className="size-4" />
              </button>
              <Icon className="size-16 text-slate-400" strokeWidth={1.25} />
            </div>

            <p className="line-clamp-2 text-sm font-medium text-slate-800">
              {title}
            </p>

            <StarRating rating={rating} reviews={reviews} />

            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900">
                {price} <span className="text-xs font-semibold">AED</span>
              </span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {originalPrice} AED
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
