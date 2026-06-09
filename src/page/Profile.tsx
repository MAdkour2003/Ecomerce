import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../api/usersApi';
import { updateLocalUser } from '../api/authApi';
import { useAuthActions, useAuthUser, useAuthToken } from '../store/authStore';
import { cn } from '../utils';

function Profile() {
  const user = useAuthUser();
  const token = useAuthToken();
  const { clearAuth, setAuth } = useAuthActions();
  const navigate = useNavigate();

  const userId = user?.id || 1;

  const [username, setUsername] = useState(user?.username ?? '');
  const [password, setPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setUpdateMsg(null);
    setUpdateLoading(true);
    const oldUsername = user?.username ?? '';
    try {
      const payload: { username: string; password?: string } = { username };
      if (password) payload.password = password;
      await updateUser(userId, payload);
      updateLocalUser(oldUsername, username, password || undefined);
      setAuth(token!, { id: userId, username, email: user?.email ?? '' });
      setPassword('');
      setUpdateMsg({ ok: true, text: 'Account updated successfully.' });
    } catch {
      setUpdateMsg({ ok: false, text: 'Update failed. Please try again.' });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError('');
    setDeleteLoading(true);
    try {
      await deleteUser(userId);
      clearAuth();
      navigate('/login', { replace: true });
    } catch {
      setDeleteError('Delete failed. Please try again.');
      setDeleteLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-lg'>
      <h1 className='mb-6 text-4xl font-semibold text-sidebar'>My Profile</h1>

      {/* User info card */}
      <div className='bg-white rounded-2xl shadow-sm border border-bgcolorWH p-5 mb-6 flex items-center gap-4'>
        <div className='w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0'>
          <i className='fas fa-user text-text1 text-xl'></i>
        </div>
        <div>
          <p className='text-textbody font-semibold text-base'>{user?.username || '—'}</p>
          {user?.email && (
            <p className='text-textload text-sm'>{user.email}</p>
          )}
        </div>
      </div>

      {/* Update account */}
      <div className='bg-white rounded-2xl shadow-sm border border-bgcolorWH p-6 mb-6'>
        <h2 className='text-base font-semibold text-textbody mb-4'>Update Account</h2>
        <form onSubmit={handleUpdate} className='space-y-4'>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-textbody'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={cn(
                'w-full px-3 py-2 rounded-lg border text-sm outline-none',
                'border-bgcolorWH focus:border-primary transition-colors'
              )}
            />
          </div>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-textbody'>
              New password{' '}
              <span className='text-textload font-normal'>(optional)</span>
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Leave blank to keep current'
              className={cn(
                'w-full px-3 py-2 rounded-lg border text-sm outline-none',
                'border-bgcolorWH focus:border-primary transition-colors'
              )}
            />
          </div>
          {updateMsg && (
            <p className={cn('text-sm', updateMsg.ok ? 'text-green-600' : 'text-error')}>
              {updateMsg.text}
            </p>
          )}
          <button
            type='submit'
            disabled={updateLoading}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-semibold text-text1 transition-colors',
              'bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {updateLoading ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Delete account */}
      <div className='bg-white rounded-2xl shadow-sm border border-red-100 p-6'>
        <h2 className='text-base font-semibold text-error mb-1'>Delete Account</h2>
        <p className='text-sm text-textload mb-4'>
          Permanently delete your account. This action cannot be undone.
        </p>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className='px-5 py-2 rounded-lg text-sm font-semibold text-white bg-error hover:opacity-90 transition-colors'
          >
            Delete account
          </button>
        ) : (
          <div className='space-y-3'>
            <p className='text-sm font-medium text-textbody'>
              Are you sure you want to delete your account?
            </p>
            {deleteError && <p className='text-sm text-error'>{deleteError}</p>}
            <div className='flex gap-3'>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className='px-5 py-2 rounded-lg text-sm font-semibold text-white bg-error hover:opacity-90 disabled:opacity-50 transition-colors'
              >
                {deleteLoading ? 'Deleting…' : 'Yes, delete'}
              </button>
              <button
                onClick={() => { setConfirmDelete(false); setDeleteError(''); }}
                disabled={deleteLoading}
                className='px-5 py-2 rounded-lg text-sm font-semibold text-textbody border border-bgcolorWH hover:bg-bgcolorWH transition-colors'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
