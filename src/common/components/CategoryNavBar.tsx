import { ChevronDown, Gift, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCategories from "@/modules/category/hooks/useCategories";

const CategoryNavBar = () => {
  const { data: categories } = useCategories();

  const scrollToBestDeals = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document
      .getElementById("best-deals")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-slate-800 outline-none">
              <LayoutGrid className="size-4" />
              All Categories
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {categories?.map((category) => (
                <DropdownMenuItem
                  key={category._id}
                  render={<Link to={`/products?category=${category._id}`} />}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="hidden items-center gap-5 lg:flex">
            {categories?.slice(0, 8).map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category._id}`}
                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href="#best-deals"
            onClick={scrollToBestDeals}
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Gift className="size-4" />
            Best Deals
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavBar;
