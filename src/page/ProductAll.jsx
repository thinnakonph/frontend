import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: "",
    unit: "",
    price: "",
    stock: "",
    detail: "",
    title: "",
    // Add more fields as needed
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/product/allproduct"
      );
      const sortedProducts = response.data.sort((a, b) => a.id - b.id);
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/product/delete/${productId}`
      );
      console.log(response);
      fetchData(); // Reload data after deletion
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = (product) => {
    setEditingProductId(product.id);
    setEditFormData({
      productName: product.productName,
      unit: product.unit,
      title: product.title,
      price: product.price,
      stock: product.stock,
      detail: product.detail,
      // Set other fields accordingly
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, productId) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:7000/product/update/${editingProductId}`,
        {
          ...editFormData,
        }
      );
      console.log(response);
      setEditingProductId(null);
      setEditFormData({
        productName: "",
        unit: "",
        price: "",
        stock: "",
        detail: "",
        title: "",
        // Reset other fields
      });
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      console.log("API Error:", error.response.data);
    }
  };

  return (
    <div className="card-body ">
      <h2 className="card-title ">รายการสินค้า</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded shadow bg-slate-200 ${
              product.id % 2 === 0 ? "bg-base-100" : "bg-base-300"
            }`}
          >
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!"
              />
            </figure>
            <h3 className="text-xl font-bold text-blue-700">
              {product.productName}
            </h3>
            <p className="text-green-600">
              ราคาต่อ{product.unit} : {product.price} บาท
            </p>
            <p className="text-purple-600">{product.title}</p>
            <p className="text-base-content ">รายละเอียด :{product.detail}</p>
            <p className="text-green-600">
              จำนวน: {product.stock} {product.unit} ทั้งหมด
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(product)}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>

            {editingProductId === product.id && (
              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => handleEditSubmit(e, editingProductId)}
              >
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={editFormData.productName}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Product unit"
                  value={editFormData.unit}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={editFormData.price}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="stock"
                  placeholder="stock Product"
                  value={editFormData.stock}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="detail"
                  placeholder="detail Product"
                  value={editFormData.detail}
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

export default ProductAll;
