import { LuEye, LuEyeOff, LuRefreshCcw } from "react-icons/lu";
import { useState } from "react";

function StyledInput({
  type = "text",
  id,
  name,
  placeholder,
  disabled,
  change,
  error,
  className,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => change(e)}
      className={`rounded-md border 2xl:border-2 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none autofill:!bg-transparent ${
        error
          ? "focus-within:border-[#FCA5A5] focus-within:shadow-errorRing border-[#FCA5A5]"
          : "focus-within:border-primary-300 focus-within:shadow-primaryRing border-neutral-300"
      } ${className}`}
    />
  );
}

function StyledPasswordInput({
  type = "password",
  id,
  name,
  placeholder,
  disabled,
  change,
  error,
  className,
  passwordClassName,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex items-center justify-between rounded-md border 2xl:border-2 md:w-[28rem] ${
        error
          ? "focus-within:border-[#FCA5A5] focus-within:shadow-errorRing border-[#FCA5A5]"
          : "focus-within:border-primary-300 focus-within:shadow-primaryRing border-neutral-300"
      } ${className}`}
    >
      <input
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        onChange={(e) => change(e)}
        className={`focus-within:outline-none py-[0.625rem] px-3 w-[90%] autofill:!bg-transparent rounded-s-md ${passwordClassName} `}
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
  change,
  error,
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
      onChange={(e) => change(e)}
      className={`rounded-md border 2xl:border-2 py-[0.625rem] px-3 md:w-[28rem] focus-within:outline-none ${
        error
          ? "focus-within:border-[#FCA5A5] focus-within:shadow-errorRing border-[#FCA5A5]"
          : "focus-within:border-primary-300 focus-within:shadow-primaryRing border-neutral-300"
      } autofill:!bg-transparent ${className}`}
    >
      {children}
    </select>
  );
}

export { StyledInput, StyledPasswordInput, StyledSelectInput };
