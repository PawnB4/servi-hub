import axios from "../api/axios";
import Cookie from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(false);

  const signUp = async (data) => {
    const res = await axios.post("/auth/signup", data);
    setUser(res.data);
    setIsAuth(true);
  };

  const logIn = async (data) => {
    const res = await axios.post("/auth/login", data, {
      withCredentials: true,
    });
    setUser(res.data);
    setIsAuth(true);
  };

  const signOut = async () => {
    const res = await axios.post("/auth/signout", {
      withCredentials: true,
    });
    setUser(null);
    setIsAuth(false);
  };

  const restorePassword = async (data) => {
    const res = await axios.put("/api/auth/login", data);
  };

  useEffect(() => {
    if (Cookie.get("token")) {
      axios
        .get("/auth/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch((err) => {
          setUser(null);
          setIsAuth(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, signUp, logIn, restorePassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
