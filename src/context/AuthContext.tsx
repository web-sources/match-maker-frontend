"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string;
  isprofile_complete?: boolean;
  isvip_user?: boolean;
  is_user?: boolean;
  is_admin?: boolean;
  login: (
    access: string,
    is_admin: boolean,
    isprofile: boolean,
    isvip: boolean,
    isuser: boolean
  ) => void;
  logout: () => void;
  loading: boolean; // 🆕 loading state
};

const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  isprofile_complete: false,
  isvip_user: false,
  is_user: false,
  is_admin: false,
  login: () => {},
  logout: () => {},
  loading: true, // 🆕 loading state
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isvip_user, setIsVipUser] = useState(false);
  const [isprofile_complete, setIsProfileComplete] = useState(false);
  const [is_user, setIsUser] = useState(false);
  const [is_admin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    const access = localStorage.getItem("accessToken");

    const isprofile = localStorage.getItem("is_profile_compeleted");

    if (access) {
      setAccessToken(access);
    }

    if (isprofile) {
      setIsProfileComplete(JSON.parse(isprofile));
    }

    setLoading(false);
  }, []);

  const login = (
    access: string,
    is_admin: boolean,
    isprofile: boolean,
    isvip: boolean,
    isuser: boolean
  ) => {
    setAccessToken(access);
    setIsAdmin(is_admin);
    setIsProfileComplete(isprofile);
    setIsVipUser(isvip);
    setIsUser(isuser);
    localStorage.setItem("accessToken", access);
    localStorage.setItem("is_profile_compeleted", isprofile.toString());
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken("");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isprofile_complete,
        isvip_user,
        is_user,
        is_admin,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
