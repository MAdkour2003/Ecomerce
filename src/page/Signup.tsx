import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/authApi';
import { useAuthActions } from '../store/authStore';
import { cn } from '../utils';

function Signup() {
  const navigate = useNavigate();
  const { setAuth } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await signup(email, password);
      setAuth(token, user);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-bgcolorWH px-4'>
      <div className='w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden'>
        <div className='bg-primary px-6 py-5'>
          <span className='text-text1 text-xl font-bold tracking-wide'>LOGO</span>
          <p className='text-text1/80 text-sm mt-1'>Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className='px-6 py-6 space-y-4'>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-textbody'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder='you@example.com'
              className={cn(
                'w-full px-3 py-2 rounded-lg border text-sm outline-none',
                'border-bgcolorWH focus:border-primary transition-colors'
              )}
            />
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium text-textbody'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='At least 8 characters'
              className={cn(
                'w-full px-3 py-2 rounded-lg border text-sm outline-none',
                'border-bgcolorWH focus:border-primary transition-colors'
              )}
            />
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium text-textbody'>Confirm password</label>
            <input
              type='password'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder='••••••••'
              className={cn(
                'w-full px-3 py-2 rounded-lg border text-sm outline-none',
                'border-bgcolorWH focus:border-primary transition-colors',
                confirm && confirm !== password ? 'border-error' : ''
              )}
            />
            {confirm && confirm !== password && (
              <p className='text-error text-xs'>Passwords do not match</p>
            )}
          </div>

          {error && <p className='text-error text-sm'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className={cn(
              'w-full py-2.5 rounded-lg text-sm font-semibold text-text1 transition-colors',
              'bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          <p className='text-center text-sm text-textload'>
            Already have an account?{' '}
            <Link to='/login' className='text-textid font-medium hover:underline'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
