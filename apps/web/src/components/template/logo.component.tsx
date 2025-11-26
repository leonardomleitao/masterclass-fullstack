import { IconChecks } from "@tabler/icons-react";

export interface LogoProps {
  className?: string;
  big?: boolean;
}

export default function Logo(props: LogoProps) {
  return (
    <div
      className={`flex items-center gap-1.5 text-lg font-bold h-16 ${props.className ?? ""}`}
    >
      <IconChecks
        className="text-violet-500"
        strokeWidth={3}
        size={props.big ? 40 : 24}
      />
      <span className={props.big ? "text-2xl" : "text-lg"}>TaskMaster</span>
    </div>
  );
}
