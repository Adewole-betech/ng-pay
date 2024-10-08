const Modal = ({ children, show }) => {
  return (
    show && (
      <div
        className={`grid fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 px-3 text-center z-[10000]`}
      >
        <div className="m-auto w-fit h-fit bg-white rounded-md border overflow-hidden max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw] max-h-[95vh] border-[#E9EBF3]">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
