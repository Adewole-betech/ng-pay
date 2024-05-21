function CustomButton({
  type,
  className,
  click,
  primary,
  outlined,
  text,
  disabled,
  children,
}) {
  return (
    <button
      type={type}
      onClick={() => click()}
      disabled={disabled}
      className={` py-3 px-4 font-medium text-2xl rounded-md disabled:cursor-not-allowed ${
        text &&
        "text-primary-600 bg-transparent hover:text-primary-800 focus:text-primary-600 disabled:text-neutral-300 disabled:hover:text-neutral-300"
      }  ${
        primary &&
        "bg-primary-main text-white hover:bg-primary-600 focus:shadow-primaryRing focus:bg-primary-main disabled:bg-primary-200 disabled:hover:bg-primary-200 disabled:focus:bg-primary-200"
      } ${
        outlined &&
        "bg-white border border-neutral-300 shadow-xSmall text-neutral-700 hover:bg-neutral-50 focus:shadow-outlinedButton focus:bg-white disabled:text-neutral-300 disabled:hover:text-neutral-300 disabled:focus:text-neutral-300"
      } ${className} `}
    >
      {children}
    </button>
  );
}

export { CustomButton };
