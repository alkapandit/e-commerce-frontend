import { MapPin, Search, ShoppingCart, Sparkles, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useCurrentLocation } from "@/hooks/use-current-location";
import UserMenu from "@/common/components/UserMenu";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {
  const { status, locality, detect } = useCurrentLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const deliveryLabel =
    status === "loading"
      ? "Detecting location..."
      : locality
        ? `Delivering to ${locality}`
        : "Delivering to Dubai";

  return (
    <header className="w-full border-b border-border bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-6">
        {/* Logo */}
        <a
          href="/"
          className="flex shrink-0 items-center gap-1 text-3xl font-bold tracking-tight"
        >
          <span className="text-slate-900">e</span>
          <span className="relative -mx-0.5 top-3 flex flex-col gap-0.5">
            <span className="size-1 rounded-full bg-blue-500" />
            <span className="size-1 rounded-full bg-blue-500" />
          </span>
          <span className="text-slate-900">com</span>
        </a>

        {/* Search bar */}
        <div className="flex flex-1 items-center rounded-full bg-slate-100 pr-1 pl-4">
          <Sparkles className="size-4 shrink-0 text-blue-500" />
          <input
            type="text"
            placeholder="Search for any product or brand"
            className="h-11 w-full bg-transparent px-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
          />
          <button
            type="button"
            aria-label="Search"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
          >
            <Search className="size-4" />
          </button>
        </div>

        {/* Delivery location */}
        <button
          type="button"
          onClick={detect}
          className="flex shrink-0 items-center gap-1.5 text-left"
        >
          <MapPin className="size-5 text-slate-500" />
          <span className="text-xs leading-tight text-slate-500">
            {deliveryLabel}
            <br />
            <span className="text-sm font-semibold text-slate-900">
              {status === "error" ? "Set location" : "Update Location"}
            </span>
          </span>
        </button>

        {/* Cart */}
        <button type="button" className="flex shrink-0 items-center gap-2">
          <span className="relative">
            <ShoppingCart className="size-6 text-slate-700" />
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
              2
            </span>
          </span>
          <span className="text-sm font-medium text-slate-700">Cart</span>
        </button>

        {/* Sign in / Profile */}
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Link to="/login" className="flex shrink-0 items-center gap-2">
            <User className="size-6 text-slate-700" />
            <span className="text-sm font-medium text-slate-700">Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
