import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { addUser } from '../api/usersApi';
import { useAdduser } from "../Hook/useUser";
import { login, saveLocalUser } from "../api/authApi";
import { useAuthActions } from "../store/authStore";
import { cn } from "../utils";

function Signup() {
  const navigate = useNavigate();
  const { setAuth } = useAuthActions();
  const signup = useAdduser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (password !== confirm) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }

    signup.mutate(
      {
        username,
        email: `${username}@example.com`,
        name: { firstname: "", lastname: "" },
        address: {
          city: "",
          street: "",
          number: 0,
          zipcode: "",
          geolocation: { lat: "0", long: "0" },
        },
        phone: "",
      },
      {
        onSuccess: async (newUser) => {
          await saveLocalUser(
            newUser.id,
            username,
            `${username}@example.com`,
            password,
          );
          const { token, user } = await login(username, password);
          setAuth(token, user);
          navigate("/", { replace: true });
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgcolorWH px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary px-6 py-5">
          <span className="text-text1 text-xl font-bold tracking-wide">
            MyShop
          </span>
          <p className="text-text1/80 text-sm mt-1">Create your account</p>
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
              placeholder="choose a username"
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
              placeholder="At least 8 characters"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-sm outline-none",
                "border-bgcolorWH focus:border-primary transition-colors",
              )}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-textbody">
              Confirm password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-sm outline-none",
                "border-bgcolorWH focus:border-primary transition-colors",
                confirm && confirm !== password ? "border-error" : "",
              )}
            />
            {confirm && confirm !== password && (
              <p className="text-error text-xs">Passwords do not match</p>
            )}
          </div>

          {(validationError || signup.error) && (
            <p className="text-error text-sm">
              {validationError || (signup.error as Error).message}
            </p>
          )}

          <button
            type="submit"
            disabled={signup.isPending}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm font-semibold text-text1 transition-colors",
              "bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {signup.isPending ? "Creating account…" : "Create account"}
          </button>

          <p className="text-center text-sm text-textload">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-textid font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
