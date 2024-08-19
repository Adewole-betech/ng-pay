import { HiMiniXMark } from "react-icons/hi2";
import Modal from "./Modal";
import { PiWarningLight } from "react-icons/pi";

const WarningModal = ({ show, setShow, title, children }) => {
  return (
    <Modal show={show}>
      <div className="flex flex-col w-96 md:w-[28rem] lg:w-[30.5rem]">
        <div className="flex items-center justify-between border-b border-b-[#EAECF0] py-3 lg:py-4 px-4 lg:px-5 2xl:px-6">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            {title}
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col py-6 lg:py-8 2xl:py-10 gap-3 lg:gap-4 2xl:gap-5">
          <div className="flex items-center justify-center size-8 lg:size-10 2xl:size-12 rounded-full bg-[#FEF0C7]">
            <PiWarningLight className="size-4 lg:size-5 text-[#DC6803] " />
          </div>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
