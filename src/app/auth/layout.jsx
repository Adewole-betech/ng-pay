export default function AuthLayout({ children }) {
  return (
    <div className="bg-primary-50 flex justify-center items-center h-screen w-screen overflow-y-auto overflow-x-clip py-4">
      {children}
    </div>
  );
}
