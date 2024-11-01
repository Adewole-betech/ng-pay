"use client";

import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store, { persistor } from "../redux/store/store.js";
import { axiosAuth, createAuthInterceptor } from "../redux/api/axios.js";
import { PersistGate } from "redux-persist/integration/react";

export default function AllProvider({ children }) {
  createAuthInterceptor(axiosAuth, store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4b4efc",
              colorInfo: "#4b4efc",
              colorTextBase: "#101828",
              // colorLink: "#6941c6",
              fontFamily: `var(--font-geist-sans)`,
            },
            components: {
              Input: {
                colorBorder: "rgb(209, 213, 219)",
                colorError: "rgb(252, 165, 165)",
                colorText: "rgb(17, 24, 39)",
                colorTextDisabled: "rgb(209, 213, 219)",
                colorTextPlaceholder: "rgb(156, 163, 175)",
                colorIcon: "rgb(107, 114, 128)",
                activeShadow: "0px 0px 0px 4px #E1E1FE",
                errorActiveShadow: "0px 0px 0px 4px #FEE2E2",
                paddingBlockLG: 10,
                paddingInlineLG: 12,
              },
              InputNumber: {
                paddingBlockLG: 10,
                paddingInlineLG: 12,
                handleVisible: false,
                colorBorder: "rgb(209, 213, 219)",
                colorError: "rgb(252, 165, 165)",
                colorText: "rgb(17, 24, 39)",
                colorTextDisabled: "rgb(209, 213, 219)",
                colorTextPlaceholder: "rgb(156, 163, 175)",
                colorIcon: "rgb(107, 114, 128)",
                activeShadow: "0px 0px 0px 4px #E1E1FE",
                errorActiveShadow: "0px 0px 0px 4px #FEE2E2",
              },
              Select: {
                optionSelectedBg: "rgb(245, 245, 255)",
                optionSelectedColor: "rgb(17, 24, 39)",
                optionPadding: "10px 16px",
                optionSelectedFontWeight: 500,
                colorText: "rgb(17, 24, 39)",
                colorTextPlaceholder: "rgb(156, 163, 175)",
                colorIcon: "rgb(107, 114, 128)",
                activeShadow: "0px 0px 0px 4px #E1E1FE",
                errorActiveShadow: "0px 0px 0px 4px #FEE2E2",
                paddingBlockLG: 10,
                paddingInlineLG: 12,
                colorTextDisabled: "rgb(209, 213, 219)",
                colorBorder: "rgb(209, 213, 219)",
                colorError: "rgb(252, 165, 165)",
              },
              DatePicker: {
                cellRangeBorderColor: "rgb(245, 245, 255)",
                cellActiveWithRangeBg: "rgb(245, 245, 255)",
                cellHeight: 36,
                controlItemBgActive: "rgb(245, 245, 255)",
              },
              Avatar: {
                colorTextPlaceholder: "rgb(245, 245, 255)",
                colorTextLightSolid: "rgb(75, 78, 252)",
              },
              Badge: {
                statusSize: 10,
                dotSize: 10,
              },
              Button: {
                colorPrimaryHover: "rgb(30, 34, 251)",
                paddingInlineLG: 20,
                controlHeightLG: 40,
              },
              Table: {
                headerBg: "rgb(249, 250, 251)",
                headerColor: "rgb(55, 65, 81)",
                borderColor: "rgb(229, 231, 235)",
                colorText: "rgb(17, 24, 39)",
              },
            },
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            // transition: Bounce,
          />
          {children}
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}
