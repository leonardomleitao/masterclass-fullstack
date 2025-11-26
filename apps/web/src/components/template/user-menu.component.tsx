import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar.component";
import useSession from "@/data/hooks/use-session.hook";
import Link from "next/link";

export interface UserMenuProps {}

export default function UserMenu(props: UserMenuProps) {
  const { user, endSession } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar alt={user?.$name.initials ?? "US"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs">Menu Usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile" className="w-full">
            Perfil de Usuário
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={endSession} className="text-red-500">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
