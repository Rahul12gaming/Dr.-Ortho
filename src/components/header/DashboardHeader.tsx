import type { FC } from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const DashboardHeader: FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [healthInfo, setHealthInfo] = useState("");

  const handleAddPatient = () => {
    const newPatient = {
      id: `p-${Date.now()}`, // unique ID
      name,
      dob,
      contact,
      healthInfo,
    };

    const existing = JSON.parse(localStorage.getItem("patients") || "[]");
    const updated = [...existing, newPatient];
    localStorage.setItem("patients", JSON.stringify(updated));

    // Reset form
    setName("");
    setDob("");
    setContact("");
    setHealthInfo("");

    alert("Patient added successfully.");
  };

  return (
    <header className="relative top-0 w-full bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
      {/* Left: Title */}
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>

      {/* Right: Add Patient Dialog */}
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
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <Input
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <Input
              placeholder="Health Info (e.g., Allergies)"
              value={healthInfo}
              onChange={(e) => setHealthInfo(e.target.value)}
            />
            <Button type="button" className="w-full mt-2" onClick={handleAddPatient}>
              Save Patient
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default DashboardHeader;
