import type { FC } from "react";
import { useEffect, useState } from "react";
import { Calendar, Phone, Stethoscope } from "lucide-react";
import { Input } from "../../../../components/ui/input"; // Assume you have this
import BookAppointmentDialog from "./BookAppointmentModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../../../components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
export interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
}

const AdminDashboard: FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);
  const [filterYear, setFilterYear] = useState("All");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [topPatients, setTopPatients] = useState<
    { name: string; count: number }[]
  >([]);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("incidents") || "[]");

    // Revenue
    const revenue = data
      .filter((a: any) => a.status === "Completed")
      .reduce((sum: number, a: any) => sum + (parseFloat(a.cost) || 0), 0);
    setTotalRevenue(revenue);

    // Status Counts
    setPendingCount(data.filter((a: any) => a.status === "Pending").length);
    setCompletedCount(data.filter((a: any) => a.status === "Completed").length);

    // Top Patients by visit count
    const map = new Map<string, { name: string; count: number }>();
    data.forEach((a: any) => {
      const name = a.patientInfo?.name || "Unknown";
      if (!map.has(a.patientId)) {
        map.set(a.patientId, { name, count: 1 });
      } else {
        map.get(a.patientId)!.count++;
      }
    });
    setTopPatients(
      Array.from(map.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    );
  },[] );

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(storedPatients);
    setFiltered(storedPatients);
  }, []);

  useEffect(() => {
    let result = patients;

    // Filter by search
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by DOB year
    if (filterYear !== "All") {
      result = result.filter((p) => p.dob.startsWith(filterYear));
    }

    setFiltered(result);
  }, [search, filterYear, patients]);

  return (
    <div className="bg-white border-1 p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dr. Ortho Managemet System
      </h2>

      {/* Dashboard KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800 mb-1">
            Total Revenue
          </h4>
          <p className="text-2xl font-bold text-blue-900">₹{totalRevenue}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-100">
          <h4 className="text-sm font-medium text-yellow-800 mb-1">
            Pending Appointments
          </h4>
          <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
          <h4 className="text-sm font-medium text-green-800 mb-1">
            Completed Appointments
          </h4>
          <p className="text-2xl font-bold text-green-900">{completedCount}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-medium text-gray-800 mb-1">
            Top Patient
          </h4>
          <p className="text-md font-semibold text-gray-900">
            {topPatients[0]?.name || "N/A"} ({topPatients[0]?.count || 0}{" "}
            visits)
          </p>
        </div>
      </div>

      <hr />
      {/* Header + Filters */}
      <div className="flex flex-col  mb-6 mt-6 gap-4">
        <div className="flex gap-3 flex-wrap">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-6/12"
          />
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
          >
            <option value="All">All Years</option>
            <option value="1990">Born in 1990</option>
            <option value="1995">Born in 1995</option>
            <option value="2000">Born in 2000</option>
            {/* Add more years dynamically if needed */}
          </select>
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No patients match your search/filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((patient) => (
            <div
              key={patient.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-200 transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold text-xl">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>

                {/* Dropdown for edit/delete */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded hover:bg-gray-100">
                      <MoreVertical size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                      onClick={() => setEditingPatient(patient)}
                      className="flex items-center gap-2"
                    >
                      <Edit size={14} /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeletingPatient(patient)}
                      className="flex items-center gap-2 text-red-600"
                    >
                      <Trash size={14} /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="font-medium">DOB:</span> {patient.dob}
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-green-500" />
                  <span className="font-medium">Contact:</span>{" "}
                  {patient.contact}
                </li>
                <li className="flex items-center gap-2">
                  <Stethoscope size={16} className="text-red-500" />
                  <span className="font-medium">Health Info:</span>{" "}
                  {patient.healthInfo}
                </li>
              </ul>

              <BookAppointmentDialog patientId={patient.id} key={patient.id} />
            </div>
          ))}
        </div>
      )}
      {editingPatient && (
        <Dialog
          open={!!editingPatient}
          onOpenChange={() => setEditingPatient(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Patient</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4 mt-2"
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.target as HTMLFormElement;
                const updatedPatient = {
                  ...editingPatient,
                  name: (form.name as any).value,
                  dob: (form.dob as any).value,
                  contact: (form.contact as any).value,
                  healthInfo: (form.healthInfo as any).value,
                };

                const all = JSON.parse(
                  localStorage.getItem("patients") || "[]"
                );
                const updated = all.map((p: any) =>
                  p.id === updatedPatient.id ? updatedPatient : p
                );
                localStorage.setItem("patients", JSON.stringify(updated));
                setPatients(updated);
                setFiltered(updated);
                setEditingPatient(null);
              }}
            >
              <Input
                name="name"
                defaultValue={editingPatient.name}
                placeholder="Name"
                required
              />
              <Input
                type="date"
                name="dob"
                defaultValue={editingPatient.dob}
                required
              />
              <Input
              type="number"
                        min={10}
                name="contact"
                defaultValue={editingPatient.contact}
                placeholder="Contact"
                required
              />
              <Input
                name="healthInfo"
                defaultValue={editingPatient.healthInfo}
                placeholder="Health Info"
              />
              <Button type="submit" variant={"default"}>
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {deletingPatient && (
        <AlertDialog
          open={!!deletingPatient}
          onOpenChange={() => setDeletingPatient(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete{" "}
                <span className="text-red-600">{deletingPatient.name}</span>?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const all = JSON.parse(
                    localStorage.getItem("patients") || "[]"
                  );
                  const updated = all.filter(
                    (p: any) => p.id !== deletingPatient.id
                  );
                  localStorage.setItem("patients", JSON.stringify(updated));
                  setPatients(updated);
                  setFiltered(updated);
                  setDeletingPatient(null);
                }}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default AdminDashboard;
