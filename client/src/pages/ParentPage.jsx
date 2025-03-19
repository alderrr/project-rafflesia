import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const ParentPage = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default ParentPage;
