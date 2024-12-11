import React, { createContext, useState, useContext, useEffect } from "react";
import { TUser } from "../interfaces";

interface AuthContextType {
  user: TUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    profilePhoto?: File
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    // Check for existing auth token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // Validate token and set user
      // This is a placeholder and should be replaced with actual token validation
      setUser({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic here
    // This is a placeholder and should be replaced with actual API call
    setUser({ id: "1", name: "John Doe", email, role: "user" });
    localStorage.setItem("authToken", "dummy-token");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    profilePhoto?: File
  ) => {
    // Implement registration logic here
    // This is a placeholder and should be replaced with actual API call
    setUser({ id: "2", name, email, role: "user" });
    localStorage.setItem("authToken", "dummy-token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
