import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>AdminNavBar</div>
      <div>
        <Link to={"/admin"}>Dashboard</Link>
        <Link to={"/admin/room"}>Room</Link>
        <Link to={"/admin/guest"}>Guests</Link>
        <Link to={"/admin/history"}>Histories</Link>
      </div>
    </>
  );
};

export default AdminNavBar;
