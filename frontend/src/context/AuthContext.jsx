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

  const signUp = async (data) => {
    const res = await axios.post("/auth/signup", data);
    if (res.data.code === 1) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
    setUser(res.data);
    return res.data;
  };

  const logIn = async (data) => {
    const res = await axios.post("/auth/login", data, {
      withCredentials: true,
    });
    if (res.data.code === 0) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setUser(res.data.user);
    return res;
  };

  const signOut = async () => {
    await axios.post("/auth/signout", {
      withCredentials: true,
    });
    setUser(null);
    setIsAuth(false);
  };

  const restorePassword = async (data) => {
    await axios.put("/auth/login", data);
  };

  const sendRestorePasswordEmail = async (data) => {
    await axios.post("/auth/send-mail", data);
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
      value={{
        user,
        isAuth,
        signUp,
        logIn,
        restorePassword,
        signOut,
        sendRestorePasswordEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
