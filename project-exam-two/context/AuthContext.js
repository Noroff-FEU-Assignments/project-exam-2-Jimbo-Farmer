import { useState } from "react";
import React from "react";
import { useEffect } from "react";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState(null);

  useEffect(()=>{
    const localAuth = JSON.parse(localStorage.getItem('Authorization'));
    if(localAuth){setAuth(localAuth)}
  }, []);

  useEffect(()=>{
    localStorage.setItem('Authorization', JSON.stringify(auth));
  }, [auth]);

  return <AuthContext.Provider value = {[auth, setAuth]}>{props.children}</AuthContext.Provider>
}

export default AuthContext;