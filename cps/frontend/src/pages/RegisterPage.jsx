import { AuthForm } from "../components/AuthForm.jsx";

export const RegisterPage = () => {
  return (
    <div className="grid gap-8">
      <AuthForm mode="register" />
    </div>
  );
};
