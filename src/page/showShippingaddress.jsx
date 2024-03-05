import React, { useState, useEffect } from "react";
import axios from "axios";

const shippingAddress = () => {
  const [shppingaddress, setshppingaddress] = useState([]);
  const [editshppingId, seteditshppingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName:"",
    lastName:"",
    identityNumber:"",
    email:"",
    phone:"",
    address:"",
    province:"",
    subDistrict:"",
    district:"",
    postalCode:"",
    isMainAddress:""
    // Add more fields as needed
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/shippingAddress/shippingAddress"
      );
      const sortedshippingAddressid = response.data.sort((a, b) => a.id - b.id);
      setshppingaddress(sortedshippingAddressid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (shippingAddressId) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/shippingAddress/delete/${shippingAddressId}`
      );
      console.log(response);
      fetchData(); // Reload data after deletion
      alert("shippingAddress deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = (shippingAddress) => {
    seteditshppingId(shippingAddress.id);
    console.log(shppingaddress[0].id)
    setEditFormData({
        firstName: shippingAddress.firstName ,
        lastName: shippingAddress.lastName,
        identityNumber: shippingAddress.identityNumber,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        province: shippingAddress.province,
        subDistrict: shippingAddress.subDistrict,
        district: shippingAddress.district,
        postalCode: shippingAddress.postalCode,
        isMainAddress : shippingAddress.isMainAddress
      // Set other fields accordingly
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, editshppingId) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7000/shippingAddress/update/${editshppingId}`,
        {
          ...editFormData,
        }
      );
      console.log(response);
      seteditshppingId(null);
      setEditFormData({
        firstName:"",
        lastName:"",
        identityNumber:"",
        email:"",
        phone:"",
        address:"",
        province:"",
        subDistrict:"",
        district:"",
        postalCode:"",
        isMainAddress:""
        // Reset other fields
      });
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      console.log("API Error:", error.response.data);
    }
  };

  return (
    <div className="card-body " >
      <h2 className="card-title " >
        รายการที่อยู่ ลูกค้าประจำ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {shppingaddress.map((shippingAddress) => (
          <div
            key={shippingAddress.id}
            className={`p-4 rounded shadow bg-slate-200 ${
              shippingAddress.id % 2 === 0 ? "bg-base-100" : "bg-base-300"
            }`}
          >
            <h3 className="text-xl font-bold text-blue-700">
              {shippingAddress.shippingAddressName}
            </h3>
            <p className="text-green-600">ชื่อ:{shippingAddress.firstName} {shippingAddress.lastName}</p>
            <p className="text-green-600">รหัสประจำตัว : {shippingAddress.identityNumber} Email : {shippingAddress.email}</p>
            <p className="text-green-600">เบอร์โทร : {shippingAddress.phone} </p>
            <p className="text-green-600">ที่อยู่ : {shippingAddress.address} </p>
            <p className="text-green-600">ตำบล : {shippingAddress.subDistrict} </p>
            <p className="text-green-600">อำเภอ : {shippingAddress.district} </p>
            <p className="text-green-600">จังหวัด : {shippingAddress.province} </p>
            <p className="text-green-600">รหัสไปรษณีย์ : {shippingAddress.postalCode} </p>

            <div  className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(shippingAddress)}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(shippingAddress.id)}
              >
                Delete
              </button>
            </div>

            {editshppingId === shippingAddress.id && (
              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => handleEditSubmit(editshppingId)}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="shippingAddress firstName"
                  value={editFormData.firstName}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="lastName"
                  value={editFormData.lastName}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="identityNumber"
                  placeholder="shippingAddress identityNumber"
                  value={editFormData.identityNumber}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="phone shippingAddress"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="address shippingAddress"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="postalCode shippingAddress"
                  value={editFormData.postalCode}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="province"
                  placeholder="province shippingAddress"
                  value={editFormData.province}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="district"
                  placeholder="district shippingAddress"
                  value={editFormData.district}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="subDistrict"
                  placeholder="subDistrict shippingAddress"
                  value={editFormData.subDistrict}
                  onChange={handleEditChange}
                  className="input"
                />
                <button type="submit" className="btn btn-primary">
                  Submit Update
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default shippingAddress;
