import type { FC } from "react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import type { TUsers } from "@/data/Users";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react"; // optional: spinner icon

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as TUsers[];

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        sessionStorage.setItem("currentUser", JSON.stringify(foundUser));

        if (foundUser.role === "Admin") {
          navigate("/admin");
          window.location.reload();
        } else if (foundUser.role === "Patient") {
          navigate("/patient");
        }
      } else {
        toast("Invalid email or password", {
          description: "Please check your credentials and try again.",
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      }

      setLoading(false);
    }, 1200); // simulate async
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Dr. Ortho
        </h2>

        <label className="text-sm text-gray-600 mb-1 block">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <label className="text-sm text-gray-600 mb-1 block">Password</label>
        <Input
          type="password"
          placeholder="*****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />

        <Button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 mb-4"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" /> Logging in...
            </div>
          ) : (
            "Continue"
          )}
        </Button>

        <div className="flex items-center gap-2 my-4 text-gray-400 text-xs uppercase">
          <span className="flex-grow border-t border-gray-200"></span>
          or
          <span className="flex-grow border-t border-gray-200"></span>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
