"use client";
import {
  IconCalendar,
  IconCircleCheck,
  IconList,
  IconSun,
} from "@tabler/icons-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useScreenSize } from "@/data/hooks/use-screen-size.hook";
import Logo from "./logo.component";
import MenuItem from "./menu-item.component";

export interface MenuProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu(props: MenuProps) {
  const { xs, sm } = useScreenSize();
  const isMobile = xs || sm;
  const path = usePathname();

  function getMenuItens() {
    return (
      <>
        <Logo className="px-4" />
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          <ul>
            <MenuItem
              icon={IconSun}
              label="Hoje"
              selected={path === "/tasks/today" || path === "/"}
              href="/"
            />
            <MenuItem
              icon={IconCalendar}
              label="Semana"
              selected={path === "/tasks/week"}
              href="/tasks/week"
            />
            <MenuItem
              icon={IconList}
              label="Todas"
              selected={path === "/tasks/all"}
              href="/tasks/all"
            />
            <MenuItem
              icon={IconCircleCheck}
              label="Concluídas"
              selected={path === "/tasks/completed"}
              href="/tasks/completed"
            />
          </ul>
        </nav>
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <Sheet
          open={props.isOpen}
          onOpenChange={(open) => !open && props.onClose()}
        >
          <SheetContent side="left" className="w-72 flex flex-col">
            {getMenuItens()}
          </SheetContent>
        </Sheet>
      ) : props.isOpen ? (
        <aside
          className={`flex flex-col h-screen bg-zinc-100 dark:bg-black sticky top-0 ${props.className ?? ""}`}
        >
          {getMenuItens()}
        </aside>
      ) : null}
    </>
  );
}
