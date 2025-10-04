import React from "react";
import { AuthForm } from "../components/AuthForm.jsx";

export const LoginPage = () => {
  return (
    <div className="grid gap-8">
      <AuthForm mode="login" />
    </div>
  );
};
