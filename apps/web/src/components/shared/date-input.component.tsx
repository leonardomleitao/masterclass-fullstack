"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconCalendar } from "@tabler/icons-react";

export function DateInput({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`
            inline-flex items-center justify-center px-2 py-2 h-12 w-12 text-sm font-medium
            border border-zinc-300 dark:border-zinc-700 rounded-xl
            bg-white dark:bg-zinc-800
            hover:bg-zinc-50 dark:hover:bg-zinc-700
            text-zinc-900 dark:text-zinc-100
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          `}
        >
          <IconCalendar/>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="end">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          onSelect={(selectedDate) => {
            setOpen(false);
            onChange?.(selectedDate);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
