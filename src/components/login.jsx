import { useState } from "react";
import { logo_primary } from "../constants";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUserStart, signUserSuccess, signUserFailure } from "../slice/auth";
import AuthService from "../service/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response));
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors));
    }
  };

  return (
    <div className="conteiner w-100 p-5">
      <form className="text-center w-25 mx-auto">
        <img className="mb-4" src={logo_primary} alt="logo" width="72" />
        <h1 className="h3 mb-3 fw-normal">Login</h1>
        <Input
          label={"Email address"}
          type={"email"}
          state={email}
          setState={setEmail}
        />
        <Input
          label={"Password"}
          type={"password"}
          state={password}
          setState={setPassword}
        />
        <button
          className={`btn w-100 py-2 ${
            isLoading ? "btn-warning" : "btn-secondary"
          }`}
          onClick={loginHandler}
          type="submit"
          style={{
            transition: "0.5s ease",
            opacity: `${isLoading ? "0.3" : "1"}`,
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
