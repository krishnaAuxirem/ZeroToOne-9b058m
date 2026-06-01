import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '@/types';
import { DEMO_USERS } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setRole: (role: UserRole) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'zerotoone_user',
  USERS_DB: 'zerotoone_users_db',
  TOKEN: 'zerotoone_token',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setIsLoading(false);
  }, []);

  const getUsersDb = (): User[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
    return [];
  };

  const saveUsersDb = (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  };

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));

    // Check demo users
    const demo = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (demo) {
      const { password: _, ...userWithoutPassword } = demo;
      const u = userWithoutPassword as User;
      setUser(u);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
      localStorage.setItem(STORAGE_KEYS.TOKEN, `token_${u.id}`);
      setIsLoading(false);
      return { success: true };
    }

    // Check registered users
    const usersDb = getUsersDb();
    const found = usersDb.find((u: any) => u.email === email && (u as any).password === password);
    if (found) {
      setUser(found);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(found));
      localStorage.setItem(STORAGE_KEYS.TOKEN, `token_${found.id}`);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: 'Invalid email or password. Please check your credentials.' };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const allUsers = [...DEMO_USERS, ...getUsersDb()];
    if (allUsers.find(u => u.email === data.email)) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered. Please login instead.' };
    }

    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      role: 'founder',
      phone: data.phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      bio: '',
      company: '',
      location: '',
      skills: [],
      createdAt: new Date().toISOString(),
      password: data.password,
    };

    const usersDb = getUsersDb();
    saveUsersDb([...usersDb, newUser]);

    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  }, [user]);

  const setRole = useCallback((role: UserRole) => {
    if (!user) return;
    updateUser({ role });
  }, [user, updateUser]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      setRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
