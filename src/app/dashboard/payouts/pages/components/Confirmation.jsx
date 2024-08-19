import { Button } from "antd";
import { useState } from "react";
import TransactionPin from "./PinModal";

const Confirmation = ({ setCurrentStep }) => {
  const [showPIN, setShowPIN] = useState(false);
  return (
    <div className="flex flex-col gap-6 lg:gap-8 2xl:gap-10 w-3/5">
      <div className="flex flex-col items-center gap-1 2xl:gap-2 text-center pt-2 lg:pt-3 2xl:pt-4 px-4 lg:px-6 2xl:pxl-8">
        <p className="text-neutral-500 text-xs lg:text-sm font-medium">
          Amount
        </p>
        <p className="font-bold text-2xl">₦3,000,000.00</p>
      </div>
      <div className="flex flex-col p-2 lg:p-3 2xl:p-4 bg-primary-50 border 2xl:border-2 border-primary-200 rounded-lg">
        <div className="flex items-center justify-between py-2 lg:py-2.5 2xl::py-3">
          <p className="">Transaction Fee</p>
          <p className="font-medium">₦10.00</p>
        </div>
        <div className="flex items-center justify-between py-2 lg:py-2.5 2xl::py-3">
          <p className="">Account Name</p>
          <p className="font-medium">Marie Osborne</p>
        </div>
        <div className="flex items-center justify-between py-2 lg:py-2.5 2xl::py-3">
          <p className="">Bank</p>
          <p className="font-medium">Access Bank</p>
        </div>
        <div className="flex items-center justify-between py-2 lg:py-2.5 2xl::py-3">
          <p className="">Narration</p>
          <p className="font-medium max-w-[60%]">Ich im es.</p>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 lg:gap-3">
        <Button onClick={() => setCurrentStep(1)} className="">
          Back
        </Button>
        <Button onClick={() => setShowPIN(true)} type="primary">
          Proceed To Pay
        </Button>
      </div>
      {showPIN && <TransactionPin show={showPIN} setShow={setShowPIN} />}
    </div>
  );
};

export default Confirmation;
