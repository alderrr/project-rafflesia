import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";

const AdminPage = () => {
  return (
    <>
      <AdminNavBar />
      <Outlet />
    </>
  );
};

export default AdminPage;
