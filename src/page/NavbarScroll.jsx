import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // นำเข้า CSS ของ Bootstrap
import axios from "axios";

function NavbarScroll() {
  const [onLogin, setOnLogin] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/product/allproduct"
        );
        // จัดเรียงสินค้าตามรหัส
        const sortedProducts = response.data.sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">
            ระบบจัดคลังสินค้าผลิตภัณฑ์ทางการเกษตร
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#">หน้าหลัก</Nav.Link>
                <Nav.Link href="/contact">ติดต่อ</Nav.Link>
                <Nav.Link href="#" disabled>
                  อื่นๆ
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                {!onLogin && (
                  <Link to="/login">
                    <Button onClick={() => setOnLogin(true)}>
                      เข้าสู่ระบบ
                    </Button>
                  </Link>
                )}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="flex flex-wrap ">
        {products.map((product) => (
          <div className="card w-96 glass mb-1 top-6" key={product.id}>
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              <p>
                ราคต่อ{product.unit} : {product.price} บาท
              </p>
              <p>
                จำนวนสินค้าทั้งหมด : {product.stock} {product.unit}
              </p>
              <p>รายระเอียด : {product.detail}</p>
              <div>
                <button
                  className="btn btn-active btn-primary mr-2"
                  onClick={() => handleUpdate(product.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-active btn-secondary m-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavbarScroll;
