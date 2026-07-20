import { ChevronDown, Gift, LayoutGrid } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  "Electronics",
  "Fashion",
  "Women's",
  "Kids' Fashion",
  "Healthy & Beauty",
  "Pharmacy",
  "Groceries",
  "Luxury Item",
];

const CategoryNavBar = () => {
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
              {categories.map((category) => (
                <DropdownMenuItem key={category} render={<a href="#" />}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="hidden items-center gap-5 lg:flex">
            {categories.map((category) => (
              <a
                key={category}
                href="#"
                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
              >
                {category}
              </a>
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

          {/* <span className="h-4 w-px bg-slate-200" /> */}

          {/* <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-bold text-slate-900"
          >
            <span>
              e<span className="text-blue-500">.</span>mox Live
            </span>
            <span className="flex size-4 items-center justify-center rounded-full bg-red-50">
              <span className="size-2 rounded-full bg-red-500" />
            </span>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavBar;
