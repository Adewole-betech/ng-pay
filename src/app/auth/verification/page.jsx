"use client";

import { CustomButton } from "@/app/components/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VerificationInput from "react-verification-input";

export default function Verification() {
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    // setIsLoggedIn(false);
    // setDataError({
    //   email: "",
    //   password: "",
    // });
    // axios
    //   .post("http://164.68.104.15:8000/login", data)
    //   .then((response) => {
    //     console.log(response);
    //     setIsLoggedIn(true);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     setDataError((prevState) => ({
    //       ...prevState,
    //       ...e?.response?.data,
    //     }));
    //   });
    setLoading(false);
  }
  return (
    <div className="bg-white p-6 2xl:p-8 flex flex-col items-center gap-10 rounded-xl lg:rounded-2xl">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex w-fit">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>
        <p className="font-bold text-[1.75rem] 2xl:text-3xl">
          Email verification
        </p>
      </div>
      <div className="flex flex-col gap-5 2xl:gap-6">
        <div className="flex flex-col gap-1 2xl:gap-2">
          <VerificationInput
            length={5}
            validChars="0-9"
            placeholder="0"
            autoFocus
            // passwordMode
            classNames={{
              container: "gap-4 p-0 m-0 h-full w-full",
              character:
                "text-neutral-400 border border-neutral-300 rounded-md w-[4.876rem] h-[4.8rem] shadow-xSmall bg-white flex items-center justify-center",
              characterInactive: `text-neutral-400`,
              characterSelected: `text-primary-main outline-none border-2 border-primary-300 shadow-primaryRing`,
              characterFilled: "text-neutral-900",
            }}
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="">Didn&apos;t get the code?</p>
          <Link
            href=""
            className="text-primary-main font-semibold hover:text-primary-800"
          >
            Resend Code
          </Link>
        </div>
      </div>
      <CustomButton
        type="submit"
        click={onSubmit}
        className="w-full"
        disabled={loading}
        primary
      >
        Continue
      </CustomButton>
    </div>
  );
}
