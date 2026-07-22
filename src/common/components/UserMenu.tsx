import { LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/useAuthStore";

const UserMenu = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  if (!user) return null;

  const handleLogout = () => {
    clearUser();
    toast.success("Signed out successfully.");
    navigate("/");
  };

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
        <DropdownMenuItem render={<a href="#" />}>
          <UserIcon className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
