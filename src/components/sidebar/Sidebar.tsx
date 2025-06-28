import {
  LayoutDashboard,
  Users,
  UserCircle,

} from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Sidebar: FC = () => {
  const currentUser:any=JSON.parse(sessionStorage.getItem("currentUser")||"null")
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Workspace Title */}
        <div className="p-4 border-b border-gray-200">
          
          <h2 className="text-lg font-semibold text-gray-800">{
            //@ts-ignore
          JSON.parse(sessionStorage.getItem("currentUser")).email
          }</h2>
          <select className="mt-1 text-sm text-gray-600 w-full outline-none bg-transparent">
            <option>General</option>
            {/* Add more teams if needed */}
          </select>
        </div>

        {/* Navigation */}
       {currentUser?.role==="Admin"? <nav className="mt-4">
          <ul className="flex flex-col gap-1 px-2">
            <SidebarItem icon={<LayoutDashboard size={18} />} label="Home" href="/admin" />
            <SidebarItem icon={<Users size={18} />} label="Appointment" href="/appointment" />
            <SidebarItem icon={<Users size={18} />} label="Check Calendar" href="/calendar/view" />
            
          </ul>
        </nav>:<nav className="mt-4">
          <ul className="flex flex-col gap-1 px-2">
            <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" href="/patient" />
            
            
          </ul>
        </nav>}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 flex items-center gap-3">
        <UserCircle className="w-6 h-6 text-gray-500" />
        <div>
          <p className="text-sm font-medium text-gray-800">{
            //@ts-ignore
          JSON.parse(sessionStorage.getItem("currentUser")).email
          }</p>
          <Button onClick={()=>{
            sessionStorage.clear();
            window.location.href='/'
          }}>
            LogOut
          </Button>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <li>
      <Link
        to={href}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
