import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "./db.json";

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [books, setBooks] = useState(data.books);

  // Function to handle displaying all products
  const showAllProducts = () => {
    setBooks(data.books);
  };

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []); // Không có phụ thuộc, chỉ chạy một lần khi component mount

  useEffect(() => {
    const handleCartChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
    };

    window.addEventListener("cartChange", handleCartChange);

    return () => {
      window.removeEventListener("cartChange", handleCartChange);
    };
  }, []);

  //search
  // Hàm xử lý khi thay đổi giá trị của ô nhập liệu tìm kiếm
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTermChangeMobile = (event) => {
    const searchTermValue = event.target.value.toLowerCase();
    setSearchTerm(searchTermValue);

    const filteredBooks = data.books.filter((book) =>
      book.name.toLowerCase().includes(searchTermValue)
    );
    setBooks(filteredBooks);

    navigate(`/?searchTerm=${searchTermValue}`);
  };

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    const filteredBooks = data.books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks(filteredBooks);

    navigate(`/?searchTerm=${searchTerm}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-header navbar-light bg-white py-3">
      <div className="container container-header">
        <a
          className="navbar-brand w-8 d-none d-lg-block"
          onClick={() => navigate("/")}
          data-config-id="brand"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/Logo_Tiki_2023.png"
            width="80"
            alt=""
          />
        </a>

        <a
          className="d-block d-lg-none text-white"
          onClick={() => navigate("/")}
        >
          {"<"}
        </a>

        <button
          className="navbar-toggler shadow-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon mt-2">
            <span className="navbar-toggler-bar bar1 bg-white"></span>
            <span className="navbar-toggler-bar bar2 bg-white"></span>
            <span className="navbar-toggler-bar bar3 bg-white"></span>
          </span>
        </button>

        <div
          class="input-group w-100 d-none d-lg-block"
          style={{ marginLeft: "70px" }}
        >
          <div className="flex input-group">
            <input
              type="text"
              class="form-control w-70"
              placeholder="Freeship đến 30K"
              value={searchTerm}
              name="name"
              onChange={handleSearchTermChange}
            />

            <button
              type="button"
              class="px-3"
              style={{
                color: "#0A68FF",
                marginBottom: "0px",
                border: "1px solid #ccc",
                borderTopRightRadius: "8px",
                borderLeft: "1px solid #ccc !important",
                borderEndEndRadius: "8px",
              }}
              onClick={handleSearch}
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* mobile */}
        <div
          class="input-group w-100 d-block d-lg-none"
          style={{ marginLeft: "70px" }}
        >
          <input
            type="text"
            class="form-control w-100"
            placeholder="Bạn đang tìm kiếm gì"
            value={searchTerm}
            name="name"
            onChange={handleSearchTermChangeMobile}
          />
        </div>

        <div className="w-30 pt-3 pb-2 py-lg-0 flex justify-end item-header">
          <ul className="navbar-nav navbar-nav-hover ms-auto">
            <li className="nav-item mx-2 d-none d-lg-block">
              <a
                onClick={() => navigate("/")}
                className="nav-link ps-2 cursor-pointer"
              >
                <i className="fa fa-home mr-1" aria-hidden="true"></i>Trang chủ
              </a>
            </li>
            <li className="nav-item mx-2 d-none d-lg-block">
              <a
                href="javascript:void(0);"
                className="nav-link ps-2 cursor-pointer"
              >
                <i className="fa fa-user mr-1" aria-hidden="true"></i>Tài khoản
              </a>
            </li>
            <li className="nav-item mx-2 position-relative">
              <a
                onClick={() => navigate("/cart")}
                className="nav-link ps-2 cursor-pointer"
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                {cart.length > 0 && (
                  <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                    {cart.length}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
