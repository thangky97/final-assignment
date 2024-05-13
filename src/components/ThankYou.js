import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <section class="py-5">
      <div class="container px-7">
        <div class="row">
          <div class="col-lg-6 mx-auto text-center">
            <h2
              class="text-gradient text-info mb-3"
              style={{
                fontSize: "2.25rem",
                lineHeight: "1.3",
                fontWeight: "700",
              }}
            >
              Đặt hàng thành công!
            </h2>
            <p>
              Chúng tôi đã nhận được đơn hàng của bạn, chúng tôi sẽ sớm phản hồi
              lại sớm nhất. Cảm ơn bạn!
            </p>
            <div class="text-center mb-lg-0 my-4">
              <button
                onClick={() => navigate("/")}
                class="btn bg-gradient-info"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
