import type { FC } from "react";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import { Loader2 } from "lucide-react"; // Spinner icon (you can replace this)

const DefaultLayout: FC<any> = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setLoading(true); // Show loading spinner
      setTimeout(() => {
        setRefreshKey((prev) => prev + 1);
        setLoading(false);
      }, 300); // 300ms buffer to allow data propagation
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChanged", handleStorageChange); // custom same-tab listener

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChanged", handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <span className="ml-4 text-gray-600 text-lg">Refreshing...</span>
      </div>
    );
  }

  return (
    <div className="thin-scroll flex h-screen w-full" key={refreshKey}>
      <Sidebar />
      <div className="w-full overflow-y-scroll">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
