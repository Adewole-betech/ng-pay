"use client";

import { useContext, useEffect, useState, createContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const navigation = useNavigation();

  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentRoute, setCurrentRoute] = useState(null);
  const [previousRoute, setPreviousRoute] = useState(null);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    setPreviousRoute(currentRoute);
    setCurrentRoute(url);
  }, [pathname, searchParams]);

  return { previousRoute };
};

const NavigationContext = createContext({
  previousRoute: null,
});
