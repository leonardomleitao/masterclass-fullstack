import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

export interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (s: string) => void;
}

export default function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex input">
      <input
        type={showPassword ? "text" : "password"}
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e);
          props.onChangeText?.(e.target.value);
        }}
        placeholder={props.placeholder}
        className="flex-1 bg-transparent outline-none"
      />
      {showPassword ? (
        <IconEyeOff onClick={toggleShowPassword} className="text-zinc-400" />
      ) : (
        <IconEye onClick={toggleShowPassword} className="text-zinc-400" />
      )}
    </div>
  );
}
