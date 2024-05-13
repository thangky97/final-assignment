import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [formError, setFormError] = useState({});

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

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = "Vui lòng nhập tên của bạn";
    }
    if (!formData.lastName) {
      errors.lastName = "Vui lòng nhập họ của bạn";
    }
    if (!formData.email) {
      errors.email = "Vui lòng nhập địa chỉ email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Địa chỉ email không hợp lệ";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Vui lòng nhập số điện thoại";
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      const checkoutData = { ...formData, cart };
      console.log("order success:", checkoutData);

      // Xóa dữ liệu trong localStorage
      localStorage.clear();
      //   const newData = [...data, checkoutData];
      navigate("/thank-you");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <header className="position-relative">
        <div className="page-header pt-2 border-radius-xl">
          <div className="container h-100 px-7">
            <div className="row">
              <div className="col-lg-7 mt-auto mb-3">
                <p className="mb-0">
                  <a onClick={() => navigate("/")}>Trang chủ</a> > Thanh toán
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className="container px-7">
          <div className="row">
            <div className="col-lg-7 mb-lg-0 mb-4">
              <div className="card card-plain">
                <form
                  id="contact-form"
                  method="post"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>
                          Tên <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            className="form-control"
                            placeholder="Tên"
                            aria-label="First Name..."
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        {formError.firstName && (
                          <div className="text-danger mt-1 text-sm">
                            {formError.firstName}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 mb-3 ps-2">
                        <label>
                          Họ <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Họ"
                            aria-label="Last Name..."
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        {formError.lastName && (
                          <div className="text-danger mt-1 text-sm">
                            {formError.lastName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label>Công ty</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="eg. Apple Inc."
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label>
                        Email <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="michael@creative-tim.com"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {formError.email && (
                        <div className="text-danger mt-1 text-sm">
                          {formError.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label>
                        Số điện thoại <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control ps-3"
                          aria-label="Số điện thoại"
                          placeholder="Số điện thoại"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                      {formError.phoneNumber && (
                        <div className="text-danger mt-1 text-sm">
                          {formError.phoneNumber}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label>Ghi chú</label>
                      <textarea
                        name="message"
                        className="form-control"
                        placeholder="Nội dung"
                        id="message"
                        rows="4"
                        defaultValue={formData.message}
                        onInput={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 mb-lg-0 mb-4">
              <div className="card">
                <div className="card-body pt-3">
                  <h5 className="px-2 text-dark text-sm mb-2">
                    <div>
                      <div className="text-lg">Tạm tính</div>
                      <div className="row py-2 mt-3 border-bottom">
                        <div className="col-sm">Tên</div>
                        <div className="col-sm">Số lượng</div>
                        <div className="col-sm">Giá</div>
                      </div>
                      {cart.map((item, index) => (
                        <div className="row py-2 border-bottom" key={index}>
                          <div className="col-sm text-sm">{item?.name}</div>
                          <div className="col-sm">{item?.quantity}</div>
                          <div className="col-sm">
                            {number_to_price(item?.total_price)} <sup>đ</sup>
                          </div>
                        </div>
                      ))}
                      <div className="row py-2 mt-3">
                        <div className="col-sm text-lg">Tổng:</div>
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

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="btn btn-outline-info btn-sm w-100"
                      onClick={handleSubmit}
                    >
                      Thanh toán
                    </button>
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

export default Checkout;
