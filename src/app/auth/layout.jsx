import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="bg-primary50 flex justify-center items-center h-screen w-screen overflow-y-auto overflow-x-clip">
      {children}
    </div>
  );
}
