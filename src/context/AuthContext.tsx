"use client";

import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  last_seen: string;
  profile_picture_url: string | null;
};

type AuthContextType = {
  accessToken: string;
  isprofile_complete?: boolean;
  isvip_user?: boolean;
  is_user?: boolean;
  is_admin?: boolean;
  userId?: string;
  userProfile?: UserProfile | null;
  login: (
    access: string,
    is_admin: boolean,
    isprofile: boolean,
    isvip: boolean,
    isuser: boolean,
    user_id: string
  ) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  isprofile_complete: false,
  isvip_user: false,
  is_user: false,
  is_admin: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isvip_user, setIsVipUser] = useState(false);
  const [isprofile_complete, setIsProfileComplete] = useState(false);
  const [is_user, setIsUser] = useState(false);
  const [is_admin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;
  const router = useRouter();

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/startup/fun/common/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setUserProfile(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error fetching user profile:", error.message);
      }
    }
  };

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const isprofile = localStorage.getItem("is_profile_compeleted");

    if (access) {
      setAccessToken(access);
      fetchUserProfile(access);
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
    isuser: boolean,
    user_id: string
  ) => {
    setAccessToken(access);
    setIsAdmin(is_admin);
    setIsProfileComplete(isprofile);
    setIsVipUser(isvip);
    setIsUser(isuser);
    setUserId(user_id);
    localStorage.setItem("accessToken", access);
    localStorage.setItem("is_profile_compeleted", isprofile.toString());

    fetchUserProfile(access);
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken("");
    setUserProfile(null);
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
        userId,
        userProfile,
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
