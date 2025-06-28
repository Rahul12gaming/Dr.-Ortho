//@ts-ignore
import { FC, useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Default styling
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import { format } from "date-fns";

interface Appointment {
  id: string;
  patientId: string;
  appointmentDate: string;
  title: string;
  patientInfo: {
    name: string;
  };
}

const CalendarView: FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visibleAppointments, setVisibleAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents") || "[]");
    setAppointments(stored);
  }, []);

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);

    const filtered = appointments.filter((a) => {
      const aDate = new Date(a.appointmentDate);
      return (
        aDate.getFullYear() === value.getFullYear() &&
        aDate.getMonth() === value.getMonth() &&
        aDate.getDate() === value.getDate()
      );
    });

    setVisibleAppointments(filtered);
  };

  return (
    <div className="bg-white border-1 p-6 min-h-screen bg-gray-50">
        
 <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Appointment Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
       
        <div className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-100">
          <h4 className="text-sm font-medium text-yellow-800 mb-1">
            Pending Appointments
          </h4>
          <p className="text-2xl font-bold text-yellow-900">{
            //@ts-ignore
          appointments.filter((a)=>a.status==="Pending").length
          }</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
          <h4 className="text-sm font-medium text-green-800 mb-6">
            Completed Appointments
          </h4>
          <p className="text-2xl font-bold text-green-900">{
        //@ts-ignore
        appointments.filter((a)=>a.status==="Completed").length
        }</p>
        </div>
       
      </div>
      <Calendar onClickDay={handleDateClick} />

      <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Appointments on {selectedDate && format(selectedDate, "PPP")}
            </DialogTitle>
          </DialogHeader>
          {visibleAppointments.length === 0 ? (
            <p className="text-gray-500 text-sm">No appointments on this day.</p>
          ) : (
            <ul className="space-y-2 text-sm mt-3">
              {visibleAppointments.map((a) => (
                <li
                  key={a.id}
                  className="border p-3 rounded shadow-sm bg-gray-50 hover:bg-gray-100"
                >
                  <p>
                    <strong>Patient:</strong> {a.patientInfo?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Title:</strong> {a.title}
                  </p>
                  <p>
                    <strong>Time:</strong> {format(new Date(a.appointmentDate), "hh:mm a")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarView;
