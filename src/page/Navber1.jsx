import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/userAuth";

function Navbar1() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const hdlLogout = () => {
    logout();
    navigate("/");

  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <div>
          <Link to="/" className="p-4">
          ระบบจัดคลังสินค้าผลิตภัณฑ์ทางการเกษตร
          </Link>
        </div>
        <div>
          <Link to="/order" className="p-4">
            ใบสั่งซื้อ
          </Link>
        </div>
        <div>
          <Link to="/showshpingaddress" className="p-4">
            ที่อยู่จัดส่ง
          </Link>
        </div>
      </div>

      <div className="flex-none">

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/Profile">
                <div className="justify-between">Profile</div>
                <span className="badge">{user.username}</span>
              </Link>
            </li>{" "}
            <li>
              <div>
                <Link to="/product" className="justify-between">
                  สร้างสินค้า
                </Link>
              </div>
            </li>
            <li>
              <Link to="/contact">
                <div className="justify-between">contact</div>
              </Link>
            </li>
            <li>
              <Link to="/shippingaddress">
                <div className="justify-between">shippingaddress</div>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={hdlLogout}>
                Logout
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar1;
