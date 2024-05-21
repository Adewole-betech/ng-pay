import { LuEye, LuEyeOff, LuRefreshCcw } from "react-icons/lu";
import { useState } from "react";

function StyledInput({
  type = "text",
  id,
  name,
  placeholder,
  disabled,
  className,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      className={`rounded-md border 2xl:border-2 border-neutral-300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary-300 focus-within:shadow-primaryRing autofill:!bg-transparent ${className}`}
    />
  );
}

function StyledPasswordInput({
  type = "password",
  id,
  name,
  placeholder,
  disabled,
  className,
  passwordClassName,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex items-center justify-between rounded-md border 2xl:border-2 border-neutral-300 md:w-[28rem] focus-within:outline-none focus-within:border-primary-300 focus-within:shadow-primaryRing ${className}`}
    >
      <input
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={`focus-within:outline-none py-[0.625rem] px-3 w-[90%] autofill:!bg-transparent rounded-s-md ${passwordClassName}`}
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="w-[10%] flex items-center justify-center hover:cursor-pointer text-neutral-500"
      >
        {showPassword ? <LuEyeOff /> : <LuEye />}
      </div>
    </div>
  );
}

function StyledSelectInput({
  id,
  name,
  placeholder,
  disabled,
  className,
  children,
}) {
  return (
    <select
      id={id}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={placeholder}
      className={`rounded-md border 2xl:border-2 border-neutral-300 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none focus-within:border-primary-300 focus-within:shadow-primaryRing autofill:!bg-transparent ${className}`}
    >
      {children}
    </select>
  );
}

export { StyledInput, StyledPasswordInput, StyledSelectInput };
