import type { FC } from "react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { toast, Toaster } from "sonner";

const Register: FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    contact: "",
    healthInfo: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const { name, email, dob, contact, password } = form;

    if (!name || !email || !dob || !contact || !password) {
      return toast("Fill all the details!", {
        description: "Please fill in all the required fields to register.",
        action: {
          label: "Close",
          onClick: () => console.log("Toast closed"),
        },
      });
    }

    const patientId = `p_${Date.now()}`;
    const id = `p_${Date.now()}`;

    // Save to `patients` without password
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patients.push({
      id,
      name,
      email,
      dob,
      contact,
      healthInfo: form.healthInfo,
      patientId,
    });
    localStorage.setItem("patients", JSON.stringify(patients));

    // Save to `users` WITH password
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({
      id,
      email,
      password,
      role: "Patient",
      patientId,
    });
    localStorage.setItem("users", JSON.stringify(users));
    
    // Set currentUser (excluding password)
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({
        name,
        email,
        role: "Patient",
        patientId,
      })
    );

    toast.success("Registered successfully!", {
      description: "Redirecting to your dashboard...",
    });

    setTimeout(() => {
      window.location.href = "/patient";
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign up for Dr. Ortho
        </h2>

        <Input
          type="text"
          name="name"
          placeholder="Full name"
          className="w-full mb-4"
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder="Your email address"
          className="w-full mb-4"
          onChange={handleChange}
        />

        <Input
          type="date"
          name="dob"
          className="w-full mb-4"
          onChange={handleChange}
        />

        <Input
          type="tel"
          name="contact"
          placeholder="Contact number"
          className="w-full mb-4"
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4"
          onChange={handleChange}
        />

        <Button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 mb-4"
        >
          Register
        </Button>

        <div className="flex items-center gap-2 my-4 text-gray-400 text-xs uppercase">
          <span className="flex-grow border-t border-gray-200"></span>
          or
          <span className="flex-grow border-t border-gray-200"></span>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
