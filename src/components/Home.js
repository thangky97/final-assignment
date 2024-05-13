import React, { useEffect, useState } from "react";
import data from "./db.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState(data.books);

  const number_to_price = (v) => {
    if (v === 0) {
      return "0";
    }

    if (!v || v === "") {
      return v;
    }

    v = v.toString();

    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

    v = v.split(",").join("*").split(".").join(".").split("*").join(".");
    return v;
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProducers, setSelectedProducers] = useState([]);
  const [isCheck, setIscheck] = useState(false);

  // Function to filter books based on selected category
  const filterBooksByCategory = (category) => {
    if (category) {
      const filteredBooks = data.books.filter(
        (book) => book.categories.name === category
      );
      setBooks(filteredBooks);
    } else {
      // If no category is selected, display all books
      setBooks(data.books);
    }
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterBooksByCategory(category);
  };

  // Function to handle displaying all products
  const showAllProducts = () => {
    setBooks(data.books);
    setSelectedProducers([]);
  };

  // Extracting all unique categories from data
  const categories = [
    ...new Set(data.books.map((book) => book.categories.name)),
  ];

  //fillter producer
  const producer = [...new Set(data.books.map((book) => book?.current_seller))];

  const filterBooksByProducers = () => {
    if (selectedProducers.length > 0) {
      const filteredBooks = data.books.filter((book) =>
        selectedProducers.includes(book?.current_seller?.name)
      );
      setBooks(filteredBooks);
    } else {
      setBooks(data.books);
    }
  };

  const handleProducerSelect = (producer) => {
    const index = selectedProducers.indexOf(producer);
    let newSelectedProducers = [];

    if (index === -1) {
      newSelectedProducers = [...selectedProducers, producer];
    } else {
      newSelectedProducers = [...selectedProducers];
      newSelectedProducers.splice(index, 1);
    }

    setSelectedProducers(newSelectedProducers);

    // Nếu không có nhà sản xuất nào được chọn, hiển thị tất cả sản phẩm
    if (newSelectedProducers.length === 0) {
      setBooks(data.books);
      return;
    }

    // Lọc các sách theo nhà sản xuất được chọn
    const filteredBooks = data.books.filter((book) =>
      newSelectedProducers.includes(book?.current_seller?.name)
    );
    setBooks(filteredBooks);
  };

  //search
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm");

  useEffect(() => {
    if (searchTerm) {
      const filteredBooks = data.books.filter((book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filteredBooks);
    } else {
      setBooks(data.books);
    }
  }, [searchTerm]);

  //paginate
  const [currentBooks, setCurrentBooks] = useState([]);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;

  // Logic to calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Function to handle pagination button clicks
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    // Logic to calculate index of last book on current page
    const indexOfLastBook = currentPage * booksPerPage;
    // Logic to calculate index of first book on current page
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    // Logic to slice the books array to display books on current page
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    // Update state to reflect current books on current page
    setCurrentBooks(currentBooks);
  }, [currentPage, books]);

  return (
    <>
      <header class="position-relative d-none d-lg-block">
        <div class="page-header pt-2 border-radius-xl">
          <div class="container h-100 px-7">
            <div class="row">
              <div class="col-lg-7 mt-auto mb-3">
                <p class="mb-0">
                  <a onClick={() => navigate("/")}>Trang chủ</a> >{" "}
                  <span style={{ color: "#38383D" }}>Nhà sách Tiki</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header class="position-relative d-block d-lg-none mt-2">
        <div class="page-header pt-2 border-radius-xl">
          <div class="container h-100 px-7">
            <div class="mb-4 flex justify-between">
              <span style={{ color: "#000" }}>Phổ biến</span>
              <span style={{ color: "#000" }}>Bán chạy</span>
              <span style={{ color: "#000" }}>Hàng mới</span>
              <span style={{ color: "#000" }}>Giá</span>
            </div>
          </div>
        </div>
      </header>

      <section class="section-product">
        <div class="container px-7">
          <div class="row navbar-expand-lg">
            <button
              className="navbar-toggler shadow-none mb-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#siderbar"
              aria-controls="siderbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ textAlign: "start" }}
            >
              <i className="fa fa-filter mr-1" aria-hidden="true"></i>Lọc
            </button>
            <div
              id="siderbar"
              class="collapse navbar-collapse col-lg-2 text-lg-start text-center mb-lg-0 mb-4 shadow-lg bg-white"
              style={{ borderRadius: "2px" }}
            >
              <>
                <h6
                  class="fadeIn2 fadeInBottom mb-0 font-weight-bold mt-2"
                  onClick={showAllProducts}
                  style={{ cursor: "pointer", color: "#38383D" }}
                >
                  Danh mục sản phẩm
                </h6>
                <ul class="list-unstyled text-sm mt-2 mb-3">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="py-1"
                      style={{
                        color:
                          selectedCategory === category ? "#0A68FF" : "#38383D",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <h6
                  class="fadeIn2 fadeInBottom mb-0 font-weight-bold"
                  onClick={showAllProducts}
                  style={{ cursor: "pointer", color: "#38383D" }}
                >
                  Nhà cung cấp
                </h6>
                <ul className="list-unstyled mt-2 text-sm mb-3">
                  {producer
                    // Sử dụng Set để loại bỏ các phần tử trùng lặp dựa trên id
                    .filter(
                      (seller, index, self) =>
                        index === self.findIndex((s) => s.id === seller.id)
                    )
                    .map((seller, index) => (
                      <li className="py-1" key={index}>
                        <input
                          type="checkbox"
                          style={{ marginRight: "5px" }}
                          checked={selectedProducers.includes(seller?.name)}
                          onChange={() => handleProducerSelect(seller?.name)}
                        />
                        {seller?.name}
                      </li>
                    ))}
                </ul>

                <h6
                  class="fadeIn2 fadeInBottom mb-0 font-weight-bold"
                  style={{ color: "#38383D" }}
                >
                  Đánh giá
                </h6>
                <div class="rating pt-2">
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <span class="text-sm" style={{ marginLeft: "5px" }}>
                    Từ 5 sao
                  </span>
                </div>
                <div class="rating py-1">
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i class="fas fa-star text-sm" aria-hidden="true"></i>
                  <span class="text-sm" style={{ marginLeft: "5px" }}>
                    Từ 4 sao
                  </span>
                </div>
                <div class="rating">
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i
                    class="fas fa-star text-sm text-warning"
                    aria-hidden="true"
                  ></i>
                  <i class="fas fa-star text-sm" aria-hidden="true"></i>
                  <i class="fas fa-star text-sm" aria-hidden="true"></i>
                  <span class="text-sm" style={{ marginLeft: "5px" }}>
                    Từ 3 sao
                  </span>
                </div>
              </>
            </div>
            <div class="col-lg-10" style={{ marginTop: "8px" }}>
              <div
                class="column-book"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "8px",
                }}
              >
                {currentBooks.map((book, index) => {
                  const startIndex = (currentPage - 1) * booksPerPage;
                  const realIndex = startIndex + index;
                  if (
                    realIndex >= startIndex &&
                    realIndex < startIndex + booksPerPage
                  ) {
                    return (
                      <div class="mb-4" key={realIndex}>
                        <div class="info bg-white shadow-lg border-radius-sm">
                          <div class="" style={{ height: "210px" }}>
                            <img
                              src={book?.images[0]?.base_url}
                              class="w-100 border-radius-sm mt-n2 position-relative z-index-5"
                              alt=""
                              style={{ height: "100%", objectFit: "contain" }}
                            />
                          </div>
                          <Link to={`/product-detail/${book?.id}`}>
                            <h5
                              class="mt-3 px-2"
                              style={{
                                height: "80px",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "#27272A",
                                fontWeight: "400",
                              }}
                            >
                              {book?.name}
                            </h5>
                          </Link>

                          {book?.quantity_sold ? (
                            <div class="rating rating-product px-2">
                              <i
                                class="fas fa-star text-warning"
                                aria-hidden="true"
                                style={{ fontSize: "12px" }}
                              ></i>
                              <i
                                class="fas fa-star text-warning"
                                aria-hidden="true"
                                style={{ fontSize: "12px" }}
                              ></i>
                              <i
                                class="fas fa-star text-warning"
                                aria-hidden="true"
                                style={{ fontSize: "12px" }}
                              ></i>
                              <i
                                class="fas fa-star text-warning"
                                aria-hidden="true"
                                style={{ fontSize: "12px" }}
                              ></i>
                              <i
                                class="fas fa-star-half-alt text-warning"
                                aria-hidden="true"
                                style={{
                                  marginRight: "6px",
                                  fontSize: "12px",
                                  borderRight: "1px solid #ccc",
                                  paddingRight: "6px",
                                }}
                              ></i>
                              <span class="" style={{ fontSize: "10px" }}>
                                {book?.quantity_sold?.text}
                              </span>
                            </div>
                          ) : (
                            <div style={{ height: "22px" }}></div>
                          )}

                          <h5 class="mt-3 mb-4 px-2 text-dark text-sm">
                            <span
                              className="font-weight-bold"
                              style={{ fontSize: "16px" }}
                            >
                              {number_to_price(
                                book?.original_price -
                                  book?.current_seller?.price
                              )}
                              <sup>đ</sup>
                            </span>
                            {book?.current_seller?.price && (
                              <span
                                style={{
                                  marginLeft: "8px",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#27272A",
                                }}
                              >
                                {" "}
                                -
                                {(
                                  (1 -
                                    book?.current_seller?.price /
                                      book?.original_price) *
                                  100
                                ).toFixed(0)}
                                %
                              </span>
                            )}
                          </h5>

                          <p
                            class="px-2 py-2 border-top text-center"
                            style={{ color: "#808089", fontSize: "12px" }}
                          >
                            Giao hàng siêu tốc 2h
                          </p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <ul className="pagination justify-content-center">
          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            if (pageNumber <= Math.ceil(books.length / booksPerPage)) {
              return (
                <li
                  className={`px-1 page-item ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  key={i}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </>
  );
};

export default Home;
