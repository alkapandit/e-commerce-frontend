import { useRef } from "react";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import useCategories from "@/modules/category/hooks/useCategories";

const Categories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: categories, isLoading } = useCategories();

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  };

  if (!isLoading && (!categories || categories.length === 0)) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Explore Popular Categories
        </h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          View All
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex shrink-0 flex-col items-center gap-3">
                  <Skeleton className="size-36 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))
            : categories?.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="flex shrink-0 flex-col items-center gap-3"
                >
                  <div className="flex size-36 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200">
                    <ShoppingBag className="size-14 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-slate-800">
                    {category.name}
                  </span>
                </Link>
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
