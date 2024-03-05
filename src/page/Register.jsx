import axios from "axios";
import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (input.password != input.confirmPassword) {
        return alert("check Password");
      }
      const rs = await axios.post("http://localhost:7000/auth/register", input);
      console.log(rs);
      if (rs.status === 200) {
        alert("Register ");
      }
    } catch (err) {}
  };

  return (
    <div>
      <form className="form" onSubmit={hdlSubmit}>
        <p className="title">สมัครใช้งาน </p>
        <p className="message">
          {" "}
          เพื่อเข้าสู่ระบบสั่งซื้อผลิตภัณฑ์ทางการเกษตร{" "}
        </p>
        <label>
          <input
            type="text"
            className="input"
            name="username"
            value={input.username}
            onChange={hdlChange}
            placeholder="ชื่อผู้ใช้"
          />
        </label>
        <label>
          <input
            type="password"
            className="input"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="รหัสผ่าน"
          />
        </label>
        <label>
          <input
            type="password"
            className="input"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
            placeholder="ยืนยันรหัสผ่าน"
          />
        </label>
        <label>
          <input
            required=""
            placeholder="อีเมล"
            type="email"
            className="input"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        <button className="submit" type="submit">
          ยืนยัน
        </button>
        <p className="signin">
        มีบัญชีอยู่แล้ว ?{" "}
          <Link to="/login">
            <span className="sign-up-link1">เข้าสู่ ระบบ</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
