"use client";
export interface MiniFormProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  value?: any;
  onChange?: (value: any) => void;
  onSubmit?: (value: any) => void;
}

export default function MiniForm(props: MiniFormProps) {
  return (
    <div className="flex flex-col border border-zinc-300 dark:border-zinc-700 rounded shadow-lg bg-white dark:bg-zinc-800">
      <div className="flex flex-col gap-6 py-6 px-4 border-b border-zinc-300 dark:border-zinc-700">
        <div className="flex flex-col">
          <span className="font-bold text-xl text-zinc-900 dark:text-zinc-100">{props.title}</span>
          <span className="text-zinc-700 dark:text-zinc-400 text-sm">{props.description}</span>
        </div>
        <div>
          <input
            className="input dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
            type="text"
            value={props.value}
            onChange={(e) => props.onChange?.(e.target.value)}
          />
        </div>
      </div>
      <div className="py-4 px-4 flex justify-end bg-zinc-50 dark:bg-zinc-800">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          onClick={() => props.onSubmit?.(props.value)}
        >
          {props.buttonLabel ?? "Executar"}
        </button>
      </div>
    </div>
  );
}
