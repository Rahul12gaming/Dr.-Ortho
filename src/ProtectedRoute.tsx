// components/auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const currentUser: any = JSON.parse(
    sessionStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) return <Navigate to={"/login"} replace />;
  if (
    currentUser &&
    currentUser?.role === "Patient" &&
    window.location.pathname.includes("/patient")
  )
    return children;
  if (
    currentUser &&
    currentUser?.role === "Patient" &&
    !window.location.pathname.includes("/patient")
  )
    return <Navigate to={"/patient"} replace />;

  return children;
};

import type { ReactNode } from "react";

export const PublicProtectedRoute = ({ children }: { children: ReactNode }) => {
  const currentUser: any = JSON.parse(
    sessionStorage.getItem("currentUser") || "null"
  );
  if (currentUser && currentUser?.role === "Admin") {
    return <Navigate to={"/admin"} replace />;
  } else if (currentUser && currentUser?.role === "Patient") {
    return <Navigate to={"/patient"} replace />;
  }
  return children;
};
