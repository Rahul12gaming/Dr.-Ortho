import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  FileText,
  ShieldCheck,
  UserPlus,
  Stethoscope,
 
  Info,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast, Toaster } from "sonner";

const dropdownMenuList = [
  {
    icon: <CalendarCheck size={18} />,
    title: "Treatments",
    href: "/treatments",
    desc: "Manage procedures like root canals, cleanings, and implants.",
  },
  {
    icon: <CalendarCheck size={18} />,
    title: "Appointments",
    href: "/appointments",
    desc: "Book, reschedule, or cancel patient appointments easily.",
  },
  {
    icon: <FileText size={18} />,
    title: "Medical Records",
    href: "/records",
    desc: "View and upload patient treatment histories and X-rays.",
  },
  {
    icon: <UserPlus size={18} />,
    title: "Patient Registration",
    href: "/patients",
    desc: "Add, edit, or manage patients with health details.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Insurance Claims",
    href: "/insurance",
    desc: "Handle and verify insurance documents and approvals.",
  },
  {
    icon: <Stethoscope size={18} />,
    title: "Doctors & Staff",
    href: "/staff",
    desc: "View or manage dentists, hygienists, and assistants.",
  },
];

// @ts-ignore
const currentUser: any = JSON.parse(sessionStorage.getItem("currentUser") || "null");

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [healthInfo, setHealthInfo] = useState("");
  const navigate = useNavigate();

  const handleAddPatient = () => {
    const newPatient = {
      id: `p-${Date.now()}`,
      name,
      dob,
      contact,
      healthInfo,
    };

    const existing = JSON.parse(localStorage.getItem("patients") || "[]");
    const updated = [...existing, newPatient];
    localStorage.setItem("patients", JSON.stringify(updated));

    setName("");
    setDob("");
    setContact("");
    setHealthInfo("");

   toast("Invalid email or password", {
          description: "Please check your credentials and try again.",
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Main Navigation */}
      <Toaster/>
      <main className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Logo and mobile menu toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="/" className="text-xl font-bold text-blue-700 font-inconsolata">
            Dr. Ortho
          </a>
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Dentistry</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {dropdownMenuList.map((item, index) => (
                      <NavigationMenuLink asChild key={index}>
                        <a
                          href={item.href}
                          className="flex items-start gap-3 hover:bg-gray-50 p-3 rounded-md transition-colors"
                        >
                          <div className="mt-1 text-blue-600">{item.icon}</div>
                          <div>
                            <div className="text-sm font-semibold">{item.title}</div>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <a href="https://github.com/Rahul12gaming" className="text-sm hover:text-blue-600 flex gap-1 items-center">
            <Info size={14} /> GitHub
          </a>
         
        </div>

        {/* Auth Section */}
        <div className="hidden md:block">
          {currentUser?.role === "Admin" ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Add Patient</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                  <DialogDescription>
                    Enter the patient’s information to add them to your records.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                  <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                  <Input placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
                  <Input placeholder="Health Info" value={healthInfo} onChange={(e) => setHealthInfo(e.target.value)} />
                  <Button type="button" className="w-full mt-2" onClick={handleAddPatient}>
                    Save Patient
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          ) : currentUser?.role === "Patient" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex items-center justify-center hover:ring-2 ring-blue-300 transition">
                  {currentUser?.email?.charAt(0)?.toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mr-4">
                <div className="px-3 py-2 text-sm text-gray-600">
                  Signed in as <br />
                  <span className="font-medium">{currentUser.email}</span>
                </div>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600"
                  onClick={() => {
                    sessionStorage.removeItem("currentUser");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button onClick={() => navigate("/login")} variant="ghost">
                Login
              </Button>
              <Button onClick={() => navigate("/register")} variant="default">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3 border-t bg-white">
          {dropdownMenuList.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm text-gray-700 hover:text-blue-600"
            >
              {item.title}
            </a>
          ))}
          
          <a href="https://github.com/Rahul12gaming" className="block text-sm hover:text-blue-600">
            GitHub
          </a>
          {!currentUser && (
            <div className="flex flex-col gap-2 pt-4">
              <Button onClick={() => navigate("/login")} variant="outline">
                Login
              </Button>
              <Button onClick={() => navigate("/register")} variant="default">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Subnav */}
      {!currentUser && (
        <main className="bg-gray-50 hidden md:flex items-center justify-around py-3 text-gray-500 text-sm px-4">
          <div className="flex gap-4 items-center">
            <button className="hover:text-blue-600">Root Canal</button>
            <button className="hover:text-blue-600">Braces</button>
            <button className="hover:text-blue-600">Teeth Whitening</button>
            <button className="hover:text-blue-600">Oral Surgery</button>
          </div>
          <input
            type="text"
            placeholder="Search treatments, patients..."
            className="w-[400px] bg-gray-100 border border-gray-300 text-sm rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
          />
        </main>
      )}
    </header>
  );
};

export default Header;
