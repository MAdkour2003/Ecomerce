import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { updateLocalUser } from "../api/authApi";
import { useAuthActions, useAuthUser, useAuthToken } from "../store/authStore";
import { cn } from "../utils";
import { useDeleteUser, useUpdateUser } from "../Hook/useUser";
import { Button } from "@/components/ui/button";

function Profile() {
  const user = useAuthUser();
  const token = useAuthToken();
  const { clearAuth, setAuth } = useAuthActions();
  const navigate = useNavigate();

  const userId = user?.id ?? 1;

  const [username, setUsername] = useState(user?.username ?? "");
  const [password, setPassword] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);

  const updateUserMutation = useUpdateUser();

  const deleteUserMutation = useDeleteUser();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const oldUsername = user?.username ?? "";

    const payload: { username: string; password?: string } = { username };
    if (password) payload.password = password;
    updateUserMutation.mutate(
      { id: userId, data: payload },
      {
        onSuccess: async () => {
          try {
            await updateLocalUser(oldUsername, username, password || undefined);
            setAuth(token, { id: userId, username, email: user?.email ?? "" });
            setPassword("");
          } catch {
            //error
          }
        },
      },
    );
  };

  const handleDelete = async () => {
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        clearAuth();
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="mb-6 text-4xl font-semibold text-sidebar">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-bgcolorWH p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-text1 text-xl"></i>
        </div>
        <div>
          <p className="text-textbody font-semibold text-base">
            {user?.username || "—"}
          </p>
          {user?.email && <p className="text-textload text-sm">{user.email}</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-bgcolorWH p-6 mb-6">
        <h2 className="text-base font-semibold text-textbody mb-4">
          Update Account
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-textbody">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-sm outline-none",
                "border-bgcolorWH focus:border-primary transition-colors",
              )}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-textbody">
              New password{" "}
              <span className="text-textload font-normal">(optional)</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className={cn(
                "w-full px-3 py-2 rounded-lg border text-sm outline-none",
                "border-bgcolorWH focus:border-primary transition-colors",
              )}
            />
          </div>
          {updateUserMutation.isSuccess && (
            <p className="text-sm text-green-600">
              Account updated successfully.
            </p>
          )}

          {updateUserMutation.isError && (
            <p className="text-sm text-error">
              Update failed. Please try again.
            </p>
          )}
          <Button
            type="submit"
            disabled={updateUserMutation.isPending}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-semibold text-text1 transition-colors",
              "bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {updateUserMutation.isPending ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <h2 className="text-base font-semibold text-error mb-1">
          Delete Account
        </h2>
        <p className="text-sm text-textload mb-4">
          Permanently delete your account. This action cannot be undone.
        </p>
        {!confirmDelete ? (
          <Button
            onClick={() => setConfirmDelete(true)}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-error hover:opacity-90 transition-colors"
          >
            Delete account
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium text-textbody">
              Are you sure you want to delete your account?
            </p>
            {deleteUserMutation.isError && (
              <p className="text-sm text-error">
                Delete failed. Please try again.
              </p>
            )}
            <div className="flex gap-3">
              <Button
                onClick={handleDelete}
                disabled={deleteUserMutation.isPending}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-error hover:opacity-90 disabled:opacity-50 transition-colors"
              >
                {deleteUserMutation.isPending ? "Deleting…" : "Yes, delete"}
              </Button>
              <Button
                onClick={() => {
                  setConfirmDelete(false);
                  deleteUserMutation.reset();
                }}
                disabled={deleteUserMutation.isPending}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-textbody border border-bgcolorWH hover:bg-bgcolorWH transition-colors"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
