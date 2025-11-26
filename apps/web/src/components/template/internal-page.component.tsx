"use client";
import { useEffect, useState } from "react";
import Menu from "./menu.component";
import TopBar from "./top-bar.component";
import { useScreenSize } from "@/data/hooks/use-screen-size.hook";

export default function InternalPage(props: any) {
  const { xs, sm, md } = useScreenSize();
  const [isMenuOpen, setMenuOpen] = useState(!(xs || sm || md));

  useEffect(() => {
    setMenuOpen(!(xs || sm || md));
  }, [xs, sm, md]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Menu
        className="w-64 border-r border-zinc-300 dark:border-zinc-900"
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBar
          className="border-b border-zinc-300 dark:border-zinc-900"
          onToggleMenu={() => setMenuOpen(!isMenuOpen)}
        />
        <main className="p-6">{props.children}</main>
      </div>
    </div>
  );
}
