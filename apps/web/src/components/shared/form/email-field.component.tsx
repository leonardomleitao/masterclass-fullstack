import React from "react";

export interface EmailFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (s: string) => void;
}

export default function EmailField(props: EmailFieldProps) {
  return (
    <input
      type="email"
      value={props.value}
      onChange={(e) => {
        props.onChange?.(e);
        props.onChangeText?.(e.target.value);
      }}
      placeholder={props.placeholder}
      className="input"
    />
  );
}
