import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setloading(true);
        let token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const rs = await axios.get("http://localhost:7000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(rs.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setloading(false);
      }
    };
    run();
  }, []);

  const logout = () =>{
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading ,logout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
