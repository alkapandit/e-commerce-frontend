import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import useProducts from "@/modules/products/hooks/useProducts";
import ProductCard from "@/modules/products/components/ProductCard";

const BestDeals = () => {
  const { data, isLoading } = useProducts({ limit: 5 });

  if (!isLoading && (!data || data.data.length === 0)) {
    return null;
  }

  return (
    <section id="best-deals" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Todays Best Deals For You!
        </h2>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          View All
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))
          : data?.data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default BestDeals;
