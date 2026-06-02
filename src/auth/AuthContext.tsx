import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { customerApi, clearTokens, setTokens, isLoggedIn } from '../api/client';

import type { User } from '../api/types';
import type { LoginResponse } from './loginTypes';



interface AuthContextValue {

  user: User | null;

  loading: boolean;

  loginWithEmail: (email: string, password: string) => Promise<LoginResponse>;

  verifyEmailOtp: (email: string, otp: string, referralCode?: string) => Promise<User>;

  resendEmailOtp: (email: string, password: string) => Promise<LoginResponse>;

  completeProfile: (name: string, phone: string) => Promise<User>;

  refreshUser: () => Promise<void>;

  logout: () => void;

  ensureCustomerRole: () => Promise<void>;

}



const AuthContext = createContext<AuthContextValue | null>(null);



function profileComplete(user: User) {
  const phone = user.phone?.trim() ?? '';
  return !!(
    user.name &&
    user.name.trim().length > 0 &&
    user.emailVerified &&
    /^[6-9]\d{9}$/.test(phone)
  );
}



export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);



  const refreshUser = useCallback(async () => {

    if (!isLoggedIn()) {

      setUser(null);

      return;

    }

    const me = await customerApi.getMe();

    setUser({ ...me, profileComplete: profileComplete(me) });

  }, []);



  useEffect(() => {

    if (!isLoggedIn()) {

      setLoading(false);

      return;

    }

    refreshUser()

      .catch(() => {

        clearTokens();

        setUser(null);

      })

      .finally(() => setLoading(false));

  }, [refreshUser]);



  const ensureCustomerRole = async () => {

    const me = await customerApi.getMe();

    if (!me.roles?.includes('customer') || me.activeRole !== 'customer') {

      const res = await customerApi.setRole('customer');

      setTokens(res.accessToken, res.refreshToken);

      setUser({ ...res.user, profileComplete: profileComplete(res.user) });

    }

  };



  const loginWithEmail = async (email: string, password: string) => {
    const res = await customerApi.loginWithEmail(email, password);
    if (res.requiresOtp === false && res.accessToken && res.refreshToken && res.user) {
      setTokens(res.accessToken, res.refreshToken);
      let u = res.user;
      if (!u.roles?.includes('customer') || u.activeRole !== 'customer') {
        const roleRes = await customerApi.setRole('customer');
        setTokens(roleRes.accessToken, roleRes.refreshToken);
        u = roleRes.user;
      }
      setUser({ ...u, profileComplete: profileComplete(u) });
    }
    return res;
  };



  const verifyEmailOtp = async (email: string, otp: string, referralCode?: string) => {

    const res = await customerApi.verifyEmailOtp(email, otp, referralCode);

    setTokens(res.accessToken, res.refreshToken);

    let u = res.user;

    if (!u.roles?.includes('customer') || u.activeRole !== 'customer') {

      const roleRes = await customerApi.setRole('customer');

      setTokens(roleRes.accessToken, roleRes.refreshToken);

      u = roleRes.user;

    }

    const withFlag = { ...u, profileComplete: profileComplete(u) };

    setUser(withFlag);

    return withFlag;

  };



  const resendEmailOtp = (email: string, password: string) =>
    customerApi.resendEmailOtp(email, password);



  const completeProfile = async (name: string, phone: string) => {
    const u = await customerApi.updateProfile({ name, phone });

    const withFlag = { ...u, profileComplete: profileComplete(u) };

    setUser(withFlag);

    return withFlag;

  };



  const logout = () => {

    clearTokens();

    setUser(null);

    sessionStorage.removeItem('liftoo_pending_auth');

  };



  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        loginWithEmail,

        verifyEmailOtp,

        resendEmailOtp,

        completeProfile,

        refreshUser,

        logout,

        ensureCustomerRole,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must be used within AuthProvider');

  return ctx;

}


