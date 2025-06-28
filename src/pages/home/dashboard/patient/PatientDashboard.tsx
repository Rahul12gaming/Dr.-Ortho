//@ts-ignore
import { FC, useEffect, useState } from "react";
import { ClipboardList, MessageSquare, Stethoscope } from "lucide-react";
import { format } from "date-fns";

interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
}

interface Appointment {
  id: string;
  patientId: string;
  title: string;
  description: string;
  comments: string;
  appointmentDate: string;
  cost: number;
  status: "Pending" | "Completed";
  treatment: string;
  nextDate: string;
  files: { name: string; url: string }[];
  patientInfo: Patient;
}

const PatientDashboard: FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [past, setPast] = useState<Appointment[]>([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      sessionStorage.getItem("currentUser") || "{}"
    );
    const patientId = loggedInUser?.patientId;

    const allAppointments = JSON.parse(
      localStorage.getItem("incidents") || "[]"
    );
    const myAppointments = allAppointments.filter(
      (a: Appointment) => a.patientId === patientId
    );

    setAppointments(myAppointments);
    //@ts-ignore
    setUpcoming(myAppointments.filter((a) => a.status === "Pending"));
    //@ts-ignore
    setPast(myAppointments.filter((a) => a.status === "Completed"));
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Patient Analytics Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-100">
          <h4 className="text-sm font-medium text-yellow-800 mb-1">
            Upcoming Appointments
          </h4>
          <p className="text-2xl font-bold text-yellow-900">
            {upcoming.length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
          <h4 className="text-sm font-medium text-green-800 mb-1">
            Completed Appointments
          </h4>
          <p className="text-2xl font-bold text-green-900">{past.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-medium text-gray-800 mb-1">
            Total Appointments
          </h4>
          <p className="text-md font-semibold text-gray-900">
            {appointments.length}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upcoming Appointments */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Upcoming Appointments
          </h3>
          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming appointments.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white p-4 rounded-lg shadow border"
                >
                  <h4 className="font-semibold text-blue-700 flex items-center gap-2">
                    <ClipboardList size={16} /> {appt.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {format(new Date(appt.appointmentDate), "PPPp")}
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex gap-2 items-center">
                      <MessageSquare size={14} /> <span>{appt.comments}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <Stethoscope size={14} />{" "}
                      <span>{appt.treatment || "Pending"}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <span className="font-medium">Cost:</span> ₹{appt.cost}
                    </li>
                    <li>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                        {appt.status}
                      </span>
                    </li>
                  </ul>
                  {appt.files?.length > 0 && (
                    <li className="mt-2">
                      <strong>Files:</strong>
                      <ul className="list-disc ml-4 text-xs mt-1 space-y-1">
                        {appt.files.map((file, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                const win = window.open();
                                if (win) {
                                  win.document.write(
                                    `<iframe src="${file.url}" style="width:100%; height:100%;" frameborder="0"></iframe>`
                                  );
                                }
                              }}
                              className="text-blue-600 underline truncate max-w-[80%] text-left"
                            >
                              {file.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past Appointments */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Past Appointments
          </h3>
          {past.length === 0 ? (
            <p className="text-sm text-gray-500">No completed appointments.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {past.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white p-4 rounded-lg shadow border"
                >
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    <ClipboardList size={16} /> {appt.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {format(new Date(appt.appointmentDate), "PPPp")}
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex gap-2 items-center">
                      <MessageSquare size={14} /> <span>{appt.comments}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <Stethoscope size={14} /> <span>{appt.treatment}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <span className="font-medium">Cost:</span> ₹{appt.cost}
                    </li>
                    <li>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                        {appt.status}
                      </span>
                    </li>
                  </ul>
                  {appt.files?.length > 0 && (
                    <li className="mt-2">
                      <strong>Files:</strong>
                      <ul className="list-disc ml-4 text-xs mt-1 space-y-1">
                        {appt.files.map((file, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => {
                                const win = window.open();
                                if (win) {
                                  win.document.write(
                                    `<iframe src="${file.url}" style="width:100%; height:100%;" frameborder="0"></iframe>`
                                  );
                                }
                              }}
                              className="text-blue-600 underline truncate max-w-[80%] text-left"
                            >
                              {file.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;
