"use client";
import PropTypes from "prop-types";

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
      onClick={() => (click ? click() : null)}
      disabled={disabled}
      className={` py-3 px-4 font-medium text-2xl rounded-md disabled:cursor-not-allowed ${
        text &&
        "text-primary-600 bg-transparent hover:text-primary-800 focus-within:text-primary-600 disabled:text-neutral-300 disabled:hover:text-neutral-300"
      }  ${
        primary &&
        "bg-primary-main text-white hover:bg-primary-600 focus-within:shadow-primaryRing focus-within:bg-primary-main disabled:bg-primary-200 disabled:hover:bg-primary-200 disabled:focus-within:bg-primary-200"
      } ${
        outlined &&
        "bg-white border border-neutral-300 shadow-xSmall text-neutral-700 hover:bg-neutral-50 focus-within:shadow-outlinedButton focus-within:bg-white disabled:text-neutral-300 disabled:hover:text-neutral-300 disabled:focus-within:text-neutral-300"
      } ${className} `}
    >
      {children}
    </button>
  );
}

CustomButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  click: PropTypes.func,
  primary: PropTypes.bool,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.bool,
  children: PropTypes.node,
};

export { CustomButton };
