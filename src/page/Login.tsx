import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuthActions } from "../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { cn } from "../utils";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthActions();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      navigate("/", { replace: true });
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const errorMessage =
    loginMutation.error instanceof Error
      ? loginMutation.error.message
      : loginMutation.isError
        ? "Invalid username or password"
        : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgcolorWH px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary px-6 py-5">
          <span className="text-text1 text-xl font-bold tracking-wide">
            MyShop
          </span>
          <p className="text-text1/80 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-textbody">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              placeholder="your username"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-sm outline-none",
                "border-bgcolorWH focus:border-primary transition-colors",
              )}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-textbody">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-sm outline-none",
                "border-bgcolorWH focus:border-primary transition-colors",
              )}
            />
          </div>

          {errorMessage && <p className="text-error text-sm">{errorMessage}</p>}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm font-semibold text-text1 transition-colors",
              "bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {loginMutation.isPending ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-textload">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-textid font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
