import React, { useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import "./Login.css";
import useAuth from "../Hooks/userAuth";
  
const Login = () => {
  const navigate =  useNavigate()
  const {setUser, user} = useAuth()
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const rs = await axios.post("http://localhost:7000/auth/login", input);
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get("http://localhost:7000/auth/me",{
        headers : {Authorization : `Bearer ${rs.data.token}`}
      })
      setUser(rs1.data)
      console.log(user)
      navigate('/')
    } catch (err) {}
  };

  return (
    <div className="form-container1">
      <p className="title1">ผลิตภัณฑ์ทางการเกษตร</p>
      <form className="form1" onSubmit={hdlSubmit} >
        <input
          className="input1"
          type="text"
          name="username"
          value={input.username}
          onChange={hdlChange}
          placeholder="ชื่อผู้ใช้"
        />
        <input
          className="input1"
          type="password"
          name="password"
          value={input.password}
          onChange={hdlChange}
          placeholder="รหัสผ่าน"
        />
        <p className="page-link1">
          <span className="page-link-label1">ลืมรหัสผ่าน?</span>
        </p>
        <button className="form-btn1" >เข้าสู่ระบบ</button>
      </form>
      <p className="sign-up-label1">
        Don't have an account ?
        <Link to="/register">
          <span className="sign-up-link1" >สมัครเข้าใช้งาน</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
