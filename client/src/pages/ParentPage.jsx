import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";

const ParentPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="fixed bottom-0 left-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ParentPage;
