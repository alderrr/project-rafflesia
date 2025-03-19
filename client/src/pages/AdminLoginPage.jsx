import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const inputUsernameOnChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const inputPasswordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const formOnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${url}/admin/login`, {
        username,
        password,
      });
      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>AdminLoginPage</div>
      <div>
        <form onSubmit={formOnSubmitHandler}>
          <input
            type="text"
            placeholder="Username"
            defaultValue={username}
            onChange={inputUsernameOnChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={inputPasswordOnChangeHandler}
          />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default AdminLoginPage;
