import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
}

interface AuthActions {
  setAuth: (token: string, user?: AuthUser | null) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (token, user = null) => set({ token, user, isAuthenticated: true }),
      clearAuth: () => set({ token: null, user: null, isAuthenticated: false }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const useIsAuthenticated = (): boolean =>
  useAuthStore((s) => s.isAuthenticated);

export const useHasHydrated = (): boolean =>
  useAuthStore((s) => s._hasHydrated);

export const useAuthUser = (): AuthUser | null =>
  useAuthStore((s) => s.user);

export const useAuthToken = (): string | null =>
  useAuthStore((s) => s.token);

export const useAuthActions = (): Pick<AuthActions, 'setAuth' | 'clearAuth'> => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  return { setAuth, clearAuth };
};
