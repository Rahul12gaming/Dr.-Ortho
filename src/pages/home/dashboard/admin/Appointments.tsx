import { Input } from "../../../../components/ui/input";
import { useEffect, useState, type FC } from "react";
import {
  Calendar,
  User,
  Stethoscope,
  MessageSquare,
  IndianRupee,
  ClipboardList,
} from "lucide-react";
import type { Patient } from "./AdminDashboard";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../../../components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../../components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import { File, FileImage, FileText } from "lucide-react";

interface Appointments {
  patientInfo: Patient;
  title: string;
  status: string;
  treatment: string;
  patientId: string;
  nextDate: string;
  appointmentDate: string;
  comments: string;
  cost: string;
  files: any;
  description: string;
  id: string;
}

const Appointments: FC = () => {
  const [editingAppointment, setEditingAppointment] =
    useState<Appointments | null>(null);
  const [deletingAppointment, setDeletingAppointment] =
    useState<Appointments | null>(null);
  const [updatingAppointment, setUpdatingAppointment] =
    useState<Appointments | null>(null);
  const [fileList, setFileList] = useState<{ name: string; url: string }[]>(
    editingAppointment?.files || []
  );

  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [filtered, setFiltered] = useState<Appointments[]>([]);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  useEffect(() => {
    const storedAppointments = JSON.parse(
      localStorage.getItem("incidents") || "[]"
    );
    setAppointments(storedAppointments);
    setFiltered(storedAppointments);
  }, []);

  useEffect(() => {
    const result = appointments.filter((item) =>
      item.patientInfo.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, appointments]);

  return (
    <div className="bg-white border-1 p-6 min-h-screen bg-gray-50">
      {/* Header + Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-100">
          <h4 className="text-sm font-medium text-yellow-800 mb-1">
            Total Appointments
          </h4>
          <p className="text-2xl font-bold text-yellow-900">{appointments.length}</p>
        </div>
        
      </div>
      <div className="flex flex-col mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Appointment Management
        </h2>
        <div className="flex gap-3 flex-wrap">
          <Input
            placeholder="Search by patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-6/12"
          />
        </div>
      </div>

      {/* Appointment Cards */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <h3 className="text-lg font-semibold text-blue-600">
                    {appointment.patientInfo.name}
                  </h3>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreVertical size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="flex gap-2 items-center"
                      onClick={() => setEditingAppointment(appointment)}
                    >
                      <Edit size={14} /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2 items-center"
                      onClick={() => setUpdatingAppointment(appointment)}
                    >
                      <CheckCircle size={14} /> Mark Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2 items-center text-red-600"
                      onClick={() => setDeletingAppointment(appointment)}
                    >
                      <Trash2 size={14} /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <ClipboardList size={16} className="text-gray-500" />
                  <span className="font-medium">Title:</span>{" "}
                  {appointment.title}
                </li>
                <li className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(appointment.appointmentDate).toLocaleString()}
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-green-600" />
                  <span className="font-medium">Comments:</span>{" "}
                  {appointment.comments || "None"}
                </li>
                <li className="flex items-center gap-2">
                  <Stethoscope size={16} className="text-red-500" />
                  <span className="font-medium">Treatment:</span>{" "}
                  {appointment.treatment || "Pending"}
                </li>
                <li className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-yellow-600" />
                  <span className="font-medium">Cost:</span>{" "}
                  {appointment.cost ? `₹${appointment.cost}` : "Not added"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      appointment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </li>
              </ul>
              {appointment.files.map((f: any, index: number) => {
                const ext = f.name.split(".").pop()?.toLowerCase();
                const icon =
                  ext === "pdf" ? (
                    <FileText size={14} />
                  ) : ext === "png" || ext === "jpg" || ext === "jpeg" ? (
                    <FileImage size={14} />
                  ) : (
                    <File size={14} />
                  );

                return (
                  <li key={index} className="flex items-center gap-2 mt-4 text-xs">
                    {icon}
                    <button
            onClick={() => {
              const win = window.open();
              if (win) {
                win.document.write(
                  `<iframe src="${f.url}" style="width:100%; height:100%;" frameborder="0"></iframe>`
                );
              }
            }}
            className="text-blue-600 underline truncate max-w-[80%] text-left"
          >
            {f.name}
          </button>
                  </li>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {deletingAppointment && (
        <AlertDialog
          open={!!deletingAppointment}
          onOpenChange={() => setDeletingAppointment(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this appointment?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-sm text-gray-500">
              Patient: <strong>{deletingAppointment.patientInfo.name}</strong>
            </p>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  const updated = appointments.filter(
                    (a) => a.id !== deletingAppointment.id
                  );
                  setAppointments(updated);
                  setFiltered(updated);
                  localStorage.setItem("incidents", JSON.stringify(updated));
                  setDeletingAppointment(null);
                }}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {updatingAppointment && (
        <AlertDialog
          open={!!updatingAppointment}
          onOpenChange={() => setUpdatingAppointment(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to mark completed this appointment?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-sm text-gray-500">
              Patient: <strong>{updatingAppointment.patientInfo.name}</strong>
            </p>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  let updated = appointments.filter(
                    (a) => a.id === updatingAppointment.id
                  );
                  let remaining = appointments.filter(
                    (a) => a.id !== updatingAppointment.id
                  );
                  updated[0].status = "Completed";
                  setAppointments([...updated, ...remaining]);
                  setFiltered(updated);
                  localStorage.setItem(
                    "incidents",
                    JSON.stringify([...updated, ...remaining])
                  );
                  setDeletingAppointment(null);
                }}
              >
                Yes, Mark Completed
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {editingAppointment && (
        <Dialog
          open={!!editingAppointment}
          onOpenChange={() => setEditingAppointment(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>

            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;

                const updatedAppointment = {
                  ...editingAppointment,
                  treatment: (form.treatment as any).value,
                  cost: (form.cost as any).value,
                  status: (form.status as any).value || "Pending",
                  nextDate: (form.nextDate as any).value,
                  files: fileList,
                };

                const all = JSON.parse(
                  localStorage.getItem("incidents") || "[]"
                );
                const updatedList = all.map((a: any) =>
                  a.id === updatedAppointment.id ? updatedAppointment : a
                );

                localStorage.setItem("incidents", JSON.stringify(updatedList));
                setAppointments(updatedList);
                setFiltered(updatedList);
                setEditingAppointment(null);
              }}
            >
              <Textarea
                name="treatment"
                defaultValue={editingAppointment.treatment}
                placeholder="Treatment description"
              />
              <Input
                name="cost"
                type="number"
                defaultValue={editingAppointment.cost}
                placeholder="Cost (₹)"
              />

              <Select name="status" defaultValue={editingAppointment.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Input
                name="nextDate"
                type="datetime-local"
                defaultValue={editingAppointment.nextDate}
              />

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Upload Files
                </label>
                <Input
                  type="file"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    const converted = await Promise.all(
                      files.map(async (file) => {
                        //@ts-ignore
                        const base64 = await toBase64(file);
                        return { name: file.name, url: base64 as string };
                      })
                    );
                    setFileList([...fileList, ...converted]);
                  }}
                />
              </div>

              {/* File Preview */}
              {fileList.length > 0 && (
                <ul className="text-xs mt-2 space-y-1">
                  {fileList.map((f, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center border rounded p-1 px-2"
                    >
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline truncate w-3/4"
                      >
                        {f.name}
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setFileList((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                        className="text-red-500 text-xs ml-2 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditingAppointment(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Appointments;
