import Link from "next/link";

export interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  selected?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MenuItem(props: MenuItemProps) {
  const item = (
    <li
      className={`
          my-1 relative flex gap-2 px-3 py-2 cursor-pointer group
          transition-all duration-200
          ${
            props.selected
              ? "bg-indigo-400/15 dark:bg-violet-400/15 text-indigo-600 dark:text-purple-400 rounded-r-lg"
              : "text-black dark:text-white rounded-lg hover:rounded-r-lg"
          }
          hover:bg-indigo-400/30 dark:hover:bg-violet-400/30 hover:text-indigo-700 dark:hover:text-zinc-200
        `}
      onClick={props.onClick}
    >
      {props.selected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-indigo-500 dark:bg-violet-500 rounded-l-lg" />
      )}
      <props.icon strokeWidth={2.2} />
      <span
        className={`group-hover:font-bold ${props.selected ? "font-bold" : "font-medium"}`}
      >
        {props.label}
      </span>
    </li>
  );

  return props.href ? (
    <Link href={props.href} passHref>
      {item}
    </Link>
  ) : (
    item
  );
}
