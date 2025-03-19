import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Navigation Bar</div>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/rooms"}>Rooms</Link>
        <Link to={"/rules"}>Rules</Link>
      </div>
    </>
  );
};

export default NavigationBar;
