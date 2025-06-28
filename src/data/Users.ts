import type { Patient } from "@/pages/home/dashboard/admin/AdminDashboard";

// src/data/initUsers.ts
export interface TUsers {
  id: string | number;
  role: "Admin" | "Patient";
  email: string;
  password: string;
  patientId?: string | number;
}

const defaultUsers: TUsers[] = [
  {
    id: "1",
    role: "Admin",
    email: "admin@entnt.in",
    password: "admin123",
  },
  {
    id: "2",
    role: "Patient",
    email: "john@entnt.in",
    password: "patient123",
    patientId: "p1",
  },
];

const defaultPatient: Patient[] = [
  
    {
      id: "p1",
      name: "John Doe",
      dob: "1990-05-10",
      contact: "1234567890",
      healthInfo: "No allergies",
    },
  
];

export const initializeUsers = () => {
  const existingUsers = localStorage.getItem("users");
   const existingPatients = localStorage.getItem("patients");
  if (!existingUsers) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    
  }
  if(!existingPatients)
  {
    localStorage.setItem("patients", JSON.stringify(defaultPatient));
  }
};
