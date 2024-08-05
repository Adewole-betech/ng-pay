const RightModal = ({ show, children }) => {
  return (
    show && (
      <div
        className={`grid fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 px-3 text-center z-[10000]`}
      >
        <div className="m-auto w-full top-0 bottom-0 right-0 absolute bg-white shadow-2xl border overflow-hidden h-screen max-w-full md:max-w-md lg:max-w-lg border-[#E9EBF3]">
          {children}
        </div>
      </div>
    )
  );
};

export default RightModal;
