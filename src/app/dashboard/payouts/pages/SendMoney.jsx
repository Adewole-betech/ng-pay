import { Steps } from "antd";
import { useState } from "react";
import Account from "./components/Account";
import Amount from "./components/Amount";
import Confirmation from "./components/Confirmation";

const SendMoney = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex flex-col md:flex-row w-full md:w-[90%] lg:w-4/5 2xl:w-3/5 md:justify-between">
      <div className="p-4">
        <Steps
          direction="vertical"
          current={current}
          items={[
            {
              title: "Account Number",
              description: "Enter the 10-digits number",
              icon: (
                <div
                  className={`rounded-full size-8 lg:size-10 border-2 text-sm lg:text-base flex items-center justify-center ${
                    current === 0
                      ? "shadow-primaryRing text-primary-main border-primary-main"
                      : "border-neutral-200 text-neutral-500"
                  } ${current > 0 && "text-white bg-primary-main"}`}
                >
                  01
                </div>
              ),
            },
            {
              title: "Amount",
              description: "Enter amount to send",
              icon: (
                <div
                  className={`rounded-full size-8 lg:size-10 border-2 text-sm lg:text-base flex items-center justify-center ${
                    current === 1
                      ? "shadow-primaryRing text-primary-main border-primary-main"
                      : "border-neutral-200 text-neutral-500"
                  } ${current > 1 && "text-white bg-primary-main"}`}
                >
                  02
                </div>
              ),
            },
            {
              title: "Confirmation",
              description: "Confirm payout details",
              icon: (
                <div
                  className={`rounded-full size-8 lg:size-10 border-2 text-sm lg:text-base flex items-center justify-center ${
                    current === 2
                      ? "shadow-primaryRing text-primary-main border-primary-main"
                      : "border-neutral-200 text-neutral-500"
                  }`}
                >
                  03
                </div>
              ),
            },
          ]}
        />
      </div>
      {current === 0 && (
        <Account setCurrentStep={setCurrent} />
      )}
      {current === 1 && <Amount setCurrentStep={setCurrent} />}
      {current === 2 && <Confirmation setCurrentStep={setCurrent} />}
    </div>
  );
};

export default SendMoney;
