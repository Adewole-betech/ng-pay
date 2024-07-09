"use client";

import { CustomButton } from "@/app/components/button";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { ArrowDown, FilterSearch, Import, Refresh } from "iconsax-react";
import { FaChevronDown } from "react-icons/fa6";

export default function History() {
  return (
    <div className="flex flex-col gap-2 md:gap-4 2xl:gap-6">
      <div className="bg-white p-4 2xl:p-6 rounded-xl 2xl:rounded-2xl flex flex-col gap-4 2xl:gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Menu
              value={""}
              menuButton={
                <MenuButton className="border 2xl:border-2 py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 rounded-s-md lg:rounded-s-lg font-medium flex items-center gap-2 2xl:gap-3">
                  <p>Merchant ID</p>
                  <FaChevronDown className="size-3 2xl:size-4 " />
                </MenuButton>
              }
            >
              <MenuItem disabled>Merchant ID</MenuItem>
            </Menu>
            <Menu
              value={""}
              menuButton={
                <MenuButton className="border-r border-y 2xl:border-r-2 2xl:border-y-2 py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3">
                  <p>Transaction ID</p>
                  <FaChevronDown className="size-3 2xl:size-4 " />
                </MenuButton>
              }
            >
              <MenuItem disabled>Transaction ID</MenuItem>
            </Menu>
            <Menu
              value={""}
              menuButton={
                <MenuButton className="border-r border-y 2xl:border-r-2 2xl:border-y-2 py-2 2xl:py-2.5 px-3 2xl:px-4 border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3">
                  <p>Reference ID</p>
                  <FaChevronDown className="size-3 2xl:size-4 " />
                </MenuButton>
              }
            >
              <MenuItem disabled>Reference ID</MenuItem>
            </Menu>
            <Menu
              value={""}
              menuButton={
                <MenuButton className="border-r border-y 2xl:border-r-2 2xl:border-y-2 py-2 2xl:py-2.5 px-3 2xl:px-4 rounded-e-md lg:rounded-e-lg border-neutral-200 font-medium flex items-center gap-2 2xl:gap-3">
                  <p>Status</p>
                  <FaChevronDown className="size-3 2xl:size-4 " />
                </MenuButton>
              }
            >
              <MenuItem disabled>Status</MenuItem>
            </Menu>
          </div>
          <div className="flex items-center gap-2 2xl:gap-3">
            <CustomButton
              outlined
              className="border 2xl:border-2 !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-neutral-200 font-medium"
            >
              <Refresh className="size-4 2xl:size-5" />
              Refresh
            </CustomButton>
            <Menu
              transition
              direction="bottom"
              align="end"
              viewScroll="auto"
              position="anchor"
              menuButton={
                <MenuButton className="border 2xl:border-2 py-2 2xl:py-2.5 px-3 2xl:px-5 flex items-center gap-2 2xl:gap-3 text-base rounded-md lg:rounded-lg border-neutral-200">
                  <div className="flex items-center gap-1.5 2xl:gap-2">
                    <FilterSearch className="size-4 2xl:size-5" />
                    <p className="font-medium">Filter</p>
                  </div>
                  <FaChevronDown className="size-3 2xl:size-4 font-medium" />
                </MenuButton>
              }
            >
              <MenuItem>Filter 1</MenuItem>
              <MenuItem>Filter 2</MenuItem>
            </Menu>
            <CustomButton
              primary
              className="border 2xl:border-2 !py-2 !px-3 2xl:!py-2.5 2xl:!px-5 flex items-center gap-1.5 2xl:gap-2 text-base rounded-md lg:rounded-lg !border-primary-500 font-medium"
            >
              <Import className="size-4 2xl:size-5" />
              Export CSV
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
