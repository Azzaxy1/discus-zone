// import React from "react";
import { Link } from "react-router-dom";
import FormLogin from "../Components/FormLogin";
import { useDispatch } from "react-redux";
import { asyncLoginSucess } from "../redux/auth/action";

const LoginPage = () => {
  const dispatch = useDispatch();

  const onLoginHandler = ({ email, password }) => {
    dispatch(asyncLoginSucess({ email, password }));
  };

  return (
    <section className="flex items-center justify-center min-h-screen mx-auto text-white font-quicksand ">
      <div className="flex flex-col items-center w-[60%] justify-center py-3 border-dashed rounded-md border-3 md:py-6 border-slate-900 ">
        <article className="w-[85%] rounded-e-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-primary p-7">
          <FormLogin login={onLoginHandler} />
          <p className="pt-3">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-secondary">
              Register here
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default LoginPage;
