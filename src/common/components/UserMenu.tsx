import { Heart, LogOut, MapPin, Package, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/useAuthStore";
import useLogout from "@/auth/hooks/useLogout";

const UserMenu = () => {
  const user = useAuthStore((state) => state.user);
  const { mutate: logoutUser } = useLogout();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex shrink-0 items-center gap-2 outline-none cursor-pointer">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.email} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 px-1.5 py-1.5">
          <Avatar size="sm">
            <AvatarImage src={user.avatar} alt={user.email} />
            <AvatarFallback>
              <UserIcon className="size-3.5" />
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm font-medium text-slate-700">
            {user.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link to="/account" />}>
          <UserIcon className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link to="/orders" />}>
          <Package className="size-4" />
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link to="/wishlist" />}>
          <Heart className="size-4" />
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link to="/addresses" />}>
          <MapPin className="size-4" />
          Addresses
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => logoutUser()}>
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
