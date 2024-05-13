import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import data from "./db.json";
import "../index.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm, mặc định là 1
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State để kiểm soát hiển thị thông báo
  const [totalPrice, setTotalPrice] = useState(
    (product?.original_price - product?.current_seller?.price) * quantity
  );

  useEffect(() => {
    // Kiểm tra xem id có tồn tại không
    if (!id) {
      // Xử lý trường hợp id không tồn tại (có thể thông báo lỗi hoặc chuyển hướng)
      return;
    }

    // Truy cập thông tin của sản phẩm từ cơ sở dữ liệu hoặc một nguồn dữ liệu khác
    // Trong ví dụ này, chúng ta sử dụng data từ db.json
    const getProductById = () => {
      const foundProduct = data.books.find(
        (book) => parseInt(book.id) === parseInt(id)
      );
      // Kiểm tra xem sản phẩm có tồn tại không
      if (foundProduct) {
        // Cập nhật state product nếu sản phẩm được tìm thấy
        setProduct(foundProduct);
      } else {
        // Xử lý trường hợp không tìm thấy sản phẩm (có thể thông báo lỗi hoặc chuyển hướng)
      }
    };

    getProductById();
  }, [id]);

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

  const renderSpecifications = () => {
    return product?.specifications.map((spec, index) => (
      <div key={index}>
        <h6 className="text-[#38383D] font-semibold mb-3">
          Thông tin chi tiết
        </h6>
        {spec.attributes.map((attribute, attrIndex) => (
          <div className="row py-2 border-bottom" key={attrIndex}>
            <div className="col-sm">{attribute.name}</div>
            <div className="col-sm">{attribute.value}</div>
          </div>
        ))}
      </div>
    ));
  };

  //cart
  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    const newTotalPrice = calculateTotalPrice(
      product?.original_price - product?.current_seller?.price,
      newQuantity
    );
    setTotalPrice(newTotalPrice);
  };

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product?.original_price - product?.current_seller?.price,
      quantity: quantity,
      total_price:
        (product?.original_price - product?.current_seller?.price) * quantity,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].total_price = calculateTotalPrice(
        cart[existingItemIndex].price,
        cart[existingItemIndex].quantity,
        cart[existingItemIndex].quantity
      );
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);
  };

  //mua ngay
  const buyNow = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product?.original_price - product?.current_seller?.price,
      quantity: quantity,
      total_price:
        (product?.original_price - product?.current_seller?.price) * quantity,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
      cart[existingItemIndex].total_price = calculateTotalPrice(
        cart[existingItemIndex].price,
        cart[existingItemIndex].quantity,
        cart[existingItemIndex].quantity
      );
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 10000);

    navigate(`/checkout/${product?.id}`);
  };

  return (
    <>
      <header class="position-relative">
        <div class="page-header pt-2 border-radius-xl">
          <div class="container h-100 px-7">
            <div class="row">
              <div class="col-lg-7 mt-auto mb-3">
                <p class="mb-0">
                  <a onClick={() => navigate("/")}>Trang chủ</a> > Chi tiết sách
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section class="mb-4">
        <div class="container px-7">
          <div class="row">
            <div class="col-lg-3 mb-lg-0 mb-4">
              <div class="card">
                <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                  <a href="javascript:;" class="d-block">
                    <img
                      src={product?.images[0]?.base_url}
                      class="img-fluid border-radius-lg"
                    />
                  </a>
                  <div class="row mt-3">
                    <div class="col-lg-4 col-md-4 col-4">
                      <img
                        src={product?.images[0]?.thumbnail_url}
                        class="img-fluid border-radius-lg mb-3"
                        alt="Product Image 1"
                        style={{ height: "110px" }}
                      />
                    </div>
                    <div class="col-lg-4 col-md-4 col-4">
                      <img
                        src={product?.images[0]?.thumbnail_url}
                        class="img-fluid border-radius-lg mb-3"
                        alt="Product Image 1"
                        style={{ height: "110px" }}
                      />
                    </div>
                    <div class="col-lg-4 col-md-4 col-4">
                      <img
                        src={product?.images[0]?.thumbnail_url}
                        class="img-fluid border-radius-lg mb-3"
                        alt="Product Image 1"
                        style={{ height: "110px" }}
                      />
                    </div>
                  </div>
                </div>

                <div class="card-body pt-3">
                  <h6
                    class="fadeIn2 fadeInBottom mb-0 font-weight-bold"
                    style={{ color: "#38383D", fontSize: "16px" }}
                  >
                    Đặc điểm nổi bật
                  </h6>
                  <ul class="list-unstyled text-sm mt-3 mb-5">
                    <li>
                      Kích thước lớn và bìa cứng, tạo cảm giác sang trọng và bền
                      bỉ.
                    </li>
                    <li className="py-2">
                      Hình vẽ ngộ nghĩnh và màu sắc sống động, thu hút sự chú ý
                      của trẻ em.
                    </li>
                    <li>
                      Cung cấp thông tin tổng quát về diện tích, dân số và ngôn
                      ngữ của các quốc gia.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-lg-0 mb-4">
              <div class="card">
                <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                  <div class="text-sm px-2">
                    <span
                      class="mb-0"
                      style={{ color: "#0077ff", fontWeight: "700" }}
                    >
                      Chính hãng{" "}
                    </span>
                    <span style={{ marginLeft: "8px" }}>
                      Tác giả:{" "}
                      <span style={{ color: "#0077ff", fontWeight: "500" }}>
                        {product?.authors && product?.authors[0]?.name}
                      </span>
                    </span>
                  </div>
                  <h5 class="mt-2 pl-2 mb-2 text-dark text-lg font-weight-bold">
                    {product?.name}
                  </h5>
                  <div class="rating px-2">
                    <span
                      className="text-sm font-weight-bold"
                      style={{ marginRight: "5px" }}
                    >
                      {product?.rating_average}
                    </span>
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
                      class="fas fa-star-half-alt text-sm text-warning"
                      aria-hidden="true"
                    ></i>
                    {product?.quantity_sold?.value && (
                      <span
                        class="text-sm"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        ({product?.quantity_sold?.value})
                      </span>
                    )}

                    <span
                      class="text-sm"
                      style={{
                        marginLeft: "8px",
                        borderLeft: "1px soild #ccc",
                        paddingLeft: "5px",
                      }}
                    >
                      {product?.quantity_sold?.text}
                    </span>
                  </div>
                  <h5 class="mt-3 px-2 text-dark text-sm">
                    <span className="text-lg font-weight-bold">
                      {number_to_price(
                        product?.original_price - product?.current_seller?.price
                      )}
                      <sup>đ</sup>
                    </span>
                    {product?.current_seller?.price && (
                      <span style={{ marginLeft: "8px" }}>
                        {" "}
                        -
                        {(
                          (1 -
                            product?.current_seller?.price /
                              product?.original_price) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    )}
                  </h5>
                </div>

                <div class="card-body pt-5">
                  <div>{renderSpecifications()}</div>
                </div>
              </div>
              <div className="card my-3">
                <div class="card-header p-0 mx-3 mt-2 mb-4 position-relative z-index-1">
                  <h5
                    class="mt-3 px-2 text-dark font-weight-bold"
                    style={{ color: "#38383D", fontSize: "16px" }}
                  >
                    Mô tả sản phẩm
                  </h5>
                  <span className="text-sm px-2">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: product?.description,
                      }}
                    ></p>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 mb-lg-0 mb-4">
              <div class="card card-quantity-productDetail">
                <div class="card-body pt-3">
                  <a
                    href="javascript:;"
                    class="text-darker card-title font-weight-bold h5 d-block"
                    style={{ fontSize: "16px" }}
                  >
                    Số lượng
                  </a>
                  <div class="input-group mb-1">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                      >
                        -
                      </button>
                    </div>
                    <div className="px-2">
                      <input
                        type="number"
                        class="form-control text-center"
                        value={quantity}
                        onChange={handleQuantityChange} // Xử lý khi người dùng thay đổi số lượng
                        min="1"
                        style={{ width: "50px", height: "35px" }}
                      />
                    </div>
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <h5 class="text-dark text-sm mb-2">
                    <div
                      className="font-weight-bold"
                      style={{ fontSize: "16px" }}
                    >
                      Tạm tính
                    </div>
                    <div
                      className="text-lg mt-2 text-dark"
                      style={{ fontWeight: "700" }}
                    >
                      {number_to_price(
                        product?.original_price - product?.current_seller?.price
                      )}
                      <sup>đ</sup>
                    </div>
                  </h5>

                  <div class="author align-items-center mt-4">
                    <button
                      className="btn bg-gradient-danger w-100"
                      onClick={buyNow}
                    >
                      Mua ngay
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={addToCart}
                      className="btn btn-outline-primary btn-sm w-100"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                  {/* Hiển thị thông báo khi thêm vào giỏ hàng thành công */}
                  {showSuccessMessage && (
                    <div class="alert alert-success mt-3" role="alert">
                      Sản phẩm đã được thêm vào giỏ hàng!
                    </div>
                  )}
                  <div>
                    <a href="javascript:;" class="btn bg-gradient-info w-100">
                      Mua trước trả sau
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
