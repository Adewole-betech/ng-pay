import RightModal from "@/app/components/RightModal";
import dayjs from "dayjs";
import { HiMiniXMark } from "react-icons/hi2";
import { RxDotFilled } from "react-icons/rx";

const PaymentInformation = ({ show, setShow, selectedPayment }) => {
  return (
    <RightModal show={show}>
      <div className="flex flex-col gap-4 lg:gap-6 2xl:gap-8 w-full">
        <div className="py-4 px-6 flex items-center justify-between border-b border-b-[#EAECF0]">
          <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize">
            Payment Information
          </p>
          <HiMiniXMark
            onClick={() => setShow(!show)}
            className="text-neutral-500 stroke-2 size-3 lg:size-4 hover:text-primary-main hover:cursor-pointer"
          />
        </div>
        {selectedPayment && (
          <div className="flex flex-col gap-3 lg:gap-4 2xl:gap-6">
            <div className="flex flex-col items-center gap-2 lg:gap-3 2xl:gap-4 px-2 lg:px-3 2xl:px-4 py-4 lg:py-6 2xl:py-8">
              <div className="flex flex-col lg:gap-1">
                <p className="neutral-500 font-medium text-xs lg:text-sm">
                  Amount
                </p>
                <p className="font-bold text-lg md:text-xl lg:text-2xl capitalize lining-nums font-geistSans">
                  
                  {`₦${parseFloat(
                    (selectedPayment?.amount).toFixed(2)
                  ).toLocaleString("en-us")}`}
                </p>
              </div>
              <div
                className={`flex items-center rounded-s-full rounded-e-full font-medium py-1.5 pl-1.5 pr-4 capitalize w-fit ${
                  selectedPayment?.status === "successful"
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : selectedPayment?.status === "failed"
                    ? "bg-[#FEF3F2] text-[#B42318]"
                    : "bg-[#FFFAEB] text-[#B54708]"
                }`}
              >
                <RxDotFilled
                  className={`size-6 ${
                    selectedPayment?.status === "successful"
                      ? "text-[#12B76A]"
                      : selectedPayment?.status === "failed"
                      ? "text-[#F04438]"
                      : "text-[#F79009]"
                  }`}
                />{" "}
                {selectedPayment?.status}
              </div>
            </div>
            <div className="px-3 lg:px-4 2xl:px-6">
              <div className="flex flex-col p-2 lg:p-3 2xl:p-4 border border-[#C3C4FE] bg-[#F5F5FF] rounded lg:rounded-lg">
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Merchant ID</p>
                  <p className="font-medium text-sm lg:text-base uppercase">
                    {selectedPayment?.mchid}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Transaction ID</p>
                  <p className="font-medium text-sm lg:text-base uppercase">
                    {selectedPayment?.txid}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5 gap-2 lg:gap-3 2xl:gap-4">
                  <p className="text-sm lg:text-base">
                    Customer/
                    <br />
                    Recipient
                  </p>
                  <p className="font-medium text-sm lg:text-base">
                    {selectedPayment?.customer}
                    <br />
                    {selectedPayment?.recipient_account}-
                    {selectedPayment?.recipient_bank}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Order Reference</p>
                  <p className="font-medium text-sm lg:text-base uppercase">
                    {selectedPayment?.ref}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Payment Method</p>
                  <p className="font-medium text-sm lg:text-base capitalize">
                    {selectedPayment?.txtype}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Order Amount</p>
                  <p className="font-medium text-sm lg:text-base">
                    ₦
                    {parseFloat(
                      (selectedPayment?.amount).toFixed(2)
                    ).toLocaleString("en-us")}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Create Time</p>
                  <p className="font-medium text-sm lg:text-base">
                    {dayjs(selectedPayment?.createtime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Paid Amount</p>
                  <p className="font-medium text-sm lg:text-base">
                    ₦
                    {parseFloat(
                      (selectedPayment?.amount).toFixed(2)
                    ).toLocaleString("en-us")}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Paid Time</p>
                  <p className="font-medium text-sm lg:text-base">
                    {dayjs(selectedPayment?.settletime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Notification Status</p>
                  <p className="font-medium text-sm lg:text-base capitalize">
                    {selectedPayment?.notification}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 lg:py-2 2xl:py-2.5">
                  <p className="text-sm lg:text-base">Notification Time</p>
                  <p className="font-medium text-sm lg:text-base">
                    {selectedPayment?.notification_time
                      ? dayjs(selectedPayment?.notification_time).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RightModal>
  );
};

export default PaymentInformation;
