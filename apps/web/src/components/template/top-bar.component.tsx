"use client";
import { IconBell, IconMenu2, IconSearch, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import UserMenu from "./user-menu.component";
import ThemeToggle from "./theme-toggle.component";

export interface TopBarProps {
  className?: string;
  onToggleMenu?: () => void;
}

export default function TopBar(props: TopBarProps) {
  return (
    <header
      className={`flex items-center justify-between min-h-16 px-4 border-b bg-zinc-100 dark:bg-black sticky top-0 z-10 transition-transform duration-300 ${props.className ?? ""}`}
    >
      <div className="flex gap-2 items-center">
        <IconMenu2
          className="cursor-pointer text-black dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          onClick={props.onToggleMenu}
        />
        <div className="hidden sm:flex items-center rounded-lg gap-2 px-4 py-2 w-96 bg-white border border-zinc-400/50 dark:border-zinc-700 dark:bg-zinc-700/70">
          <IconSearch size={18} className="text-zinc-600 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="focus:outline-none bg-transparent w-full text-black dark:text-zinc-300 placeholder:text-zinc-500 dark:placeholder:text-zinc-600"
            value={""}
            onChange={(e) => {}}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <IconBell className="cursor-pointer text-black dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors" />
        <Link
          href="/profile"
          className="text-black dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <IconUser />
        </Link>
        <UserMenu />
      </div>
    </header>
  );
}
