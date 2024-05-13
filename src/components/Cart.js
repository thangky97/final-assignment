import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

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

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.total_price, 0);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cart]; // Tạo một bản sao mới của mảng cart
    updatedCart[index].quantity = quantity;
    updatedCart[index].total_price = updatedCart[index].price * quantity;
    setCart(updatedCart);
  };

  const handleSubmit = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length > 0) {
      // Lấy ID của phần tử đầu tiên trong giỏ hàng
      const firstItemId = cart[0].id;
      // Chuyển hướng đến trang thanh toán với ID của phần tử đầu tiên
      navigate(`/checkout/${firstItemId}`);
    } else {
      // Xử lý khi giỏ hàng trống
      // Ví dụ: Hiển thị thông báo lỗi
      console.log("Giỏ hàng trống");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Xoá sản phẩm khỏi giỏ hàng
    setCart(updatedCart);
  };

  const handleUpdateCart = () => {
    const updatedCart = [...cart]; // Tạo một bản sao mới của mảng cart
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu giỏ hàng mới vào localStorage
    // Hiển thị thông báo cập nhật thành công hoặc chuyển hướng đến trang cập nhật thành công (nếu cần)
  };

  return (
    <>
      <header className="position-relative">
        <div className="page-header pt-2 border-radius-xl">
          <div className="container h-100 px-7">
            <div className="row">
              <div className="col-lg-7 mt-auto mb-3">
                <p className="mb-0">
                  <a onClick={() => navigate("/")}>Trang chủ</a> > Giỏ hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="mb-4">
        <div className="container px-7">
          <div className="row">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="card card-cart">
                <div className="card-body pt-3">
                  <h5 className="px-2 text-dark text-sm mb-2">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-lg">Giỏ hàng của bạn</div>
                        <div className="text-lg">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleUpdateCart()}
                          >
                            Cập nhật giỏ hàng
                          </button>
                        </div>
                      </div>
                      <div className="row py-2 mt-3 border-bottom">
                        <div className="col-sm">Tên sản phẩm</div>
                        <div className="col-sm">Giá</div>
                        <div className="col-sm">Số lượng</div>
                        <div className="col-sm">Tổng</div>
                      </div>
                      {cart.map((item, index) => (
                        <div className="row py-2 border-bottom" key={index}>
                          <div className="col-sm text-sm">
                            {" "}
                            <a
                              className="text-sm text-danger mr-2"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Bạn có chắc chắn muốn xoá sản phẩm này?"
                                  )
                                ) {
                                  handleRemoveItem(index);
                                }
                              }}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </a>
                            {item?.name}
                          </div>
                          <div className="col-sm">
                            {number_to_price(item?.price)} <sup>đ</sup>
                          </div>
                          <div className="col-sm">
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() =>
                                handleQuantityChange(
                                  index,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              -
                            </button>
                            <span className="mx-3">{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() =>
                                handleQuantityChange(index, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="col-sm">
                            {number_to_price(item?.total_price)} <sup>đ</sup>
                          </div>
                        </div>
                      ))}
                      <div className="row py-2 mt-3">
                        <div className="col-sm text-lg">Tổng:</div>
                        <div className="col-sm"></div>
                        <div className="col-sm"></div>
                        <div
                          className="col-sm text-danger text-lg"
                          style={{ fontWeight: "700" }}
                        >
                          {number_to_price(calculateTotalPrice())} <sup>đ</sup>
                        </div>
                      </div>
                    </div>
                  </h5>

                  <div className="mt-6 flex justify-around gap-5">
                    <button
                      onClick={() => navigate("/")}
                      className="btn btn-outline-success btn-sm w-50"
                    >
                      Tiếp tục mua hàng
                    </button>
                    {cart.length > 0 ? (
                      <button
                        type="submit"
                        className="btn btn-outline-info btn-sm w-50"
                        onClick={handleSubmit}
                      >
                        Thanh toán
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-outline-info btn-sm w-50"
                        //   onClick={handleSubmit}
                      >
                        Thanh toán
                      </button>
                    )}
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

export default Cart;
