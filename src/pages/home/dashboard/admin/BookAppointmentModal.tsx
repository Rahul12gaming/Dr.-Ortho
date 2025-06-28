import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";

interface Props {
  patientId: string;
}

const BookAppointmentDialog = ({ patientId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [cost, setCost] = useState("");

const handleBook = () => {
  // Fetch all patients
  const allPatients = JSON.parse(localStorage.getItem("patients") || "[]");

  // Find the full patient object
  const patient = allPatients.find((p: any) => p.id === patientId);
  if (!patient) {
    alert("Patient not found");
    return;
  }

  // Create new incident with embedded patient info
  const newIncident = {
    id: `i-${Date.now()}`,
    patientId,
    patientInfo: {
      name: patient.name,
      dob: patient.dob,
      contact: patient.contact,
      healthInfo: patient.healthInfo,
    },
    title,
    description,
    comments,
    appointmentDate: dateTime,
    cost: parseFloat(cost) || null,
    status: "Pending",
    treatment: "",
    nextDate: "",
    files: [],
  };

  // Save to incidents
  const existingIncidents = JSON.parse(localStorage.getItem("incidents") || "[]");
  const updatedIncidents = [...existingIncidents, newIncident];
  localStorage.setItem("incidents", JSON.stringify(updatedIncidents));

  

  console.log("Patient booked", patient.name);
  alert("Appointment booked successfully!");

  // Reset form
  setTitle("");
  setDescription("");
  setComments("");
  setDateTime("");
  setCost("");
};



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="tertiary" size="sm">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Textarea
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Cost (₹)"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full"
          />
          <Button className="w-full mt-2" onClick={handleBook}>
            Save Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentDialog;