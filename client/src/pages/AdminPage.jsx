import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import Footer from "../components/Footer";

const AdminPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <AdminNavBar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminPage;
