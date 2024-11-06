"use client";

import { CustomButton } from "@/app/components/button";
import { StyledInput, StyledPasswordInput } from "@/app/components/inputs";
import { loginAuth, resetError } from "@/app/redux/features/auth/loginSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useNavigationContext } from "@/app/contexts";
import { Button, Form, Input } from "antd";
import store from "@/app/redux/store/store";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { previousRoute } = useNavigationContext();

  const { loading, isLoggedIn, userLogin, error } = useSelector(
    () => store.getState().login
  );

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const dataInputChange = (e) => {
    dispatch(resetError());
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    isLoggedIn && router.push(previousRoute ?? "/dashboard");
  }, [isLoggedIn]);

  async function onSubmit() {
    let authForm = new FormData();
    authForm.append("username", data?.username);
    authForm.append("password", data?.password);
    dispatch(loginAuth(authForm));
  }
  return (
    <Form
      onFinish={onSubmit}
      className="bg-white p-6 2xl:p-8 flex flex-col items-center gap-8 rounded-xl lg:rounded-2xl"
    >
      <div className="flex flex-col gap-6 items-center">
        <div className="flex w-fit">
          <Image src="/images/logo.svg" alt="logo" width={50} height={50} />
        </div>
        <p className="font-bold text-[1.75rem] 2xl:text-3xl">
          Login to your account
        </p>
      </div>
      <div className="flex flex-col gap-5 2xl:gap-6">
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="username" className="w-fit font-medium">
            Email address
          </label>
          <Input
            size="large"
            id="username"
            name={"username"}
            placeholder="Enter Email"
            onChange={dataInputChange}
            status={error?.username && "error"}
            required
          />
          {error?.username && (
            <p className="text-sm text-[#EF4444]">{error?.username[0]}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 2xl:gap-2">
          <label htmlFor="password" className="w-fit font-medium">
            Password
          </label>
          <Input.Password
            size="large"
            id="password"
            name={"password"}
            placeholder="Enter Password"
            onChange={dataInputChange}
            required
            status={error?.password && "error"}
          />
          {error?.password && (
            <p className="text-sm text-[#EF4444]">{error?.password[0]}</p>
          )}
        </div>
        <div className="flex md:w-[28rem] gap-2">
          <div className="flex items-center justify-between">
            <Input
              addonBefore={
                <div
                  onClick={() => {}}
                  className="flex items-center justify-center hover:cursor-pointer text-neutral-500 text-2xl"
                >
                  <LuRefreshCcw />
                </div>
              }
              size="large"
              suppressHydrationWarning={true}
              id="capthaBox"
              placeholder="2440"
              className="w-full"
            />
          </div>
          <Input
            size="large"
            id="captchaInput"
            name="captchaInput"
            placeholder="Type what you see to confirm"
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              required
              className="accent-primary-main w-6 h-6 rounded-xl outline-1 lg:outline-[1.5px] outline-neutral-300"
            />
            <span className="">Remember me</span>
          </label>
          <Link
            href=""
            className="text-primary-main font-semibold hover:text-primary-800"
          >
            Forgotten your password?
          </Link>
        </div>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="w-full"
        loading={loading || isLoggedIn}
        primary
      >
        Log in
      </Button>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-neutral-500 text-sm 2xl:text-base">
          Don&apos;t have an account?
        </p>
        <Link
          href={"/auth/registration"}
          className="w-full text-primary-main font-semibold text-sm 2xl:text-base flex justify-center hover:text-primary-800"
        >
          Sign up to NgPay
        </Link>
      </div>
    </Form>
  );
}
