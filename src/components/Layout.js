import Header from "./header.js";
import Footer from "./footer.js";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
