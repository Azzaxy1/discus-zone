// import React from "react";
import FormRegister from "../Components/FormRegister";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../redux/users/action";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegisterHandler = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate("/");
  };

  return (
    <section className="flex items-center justify-center min-h-screen mx-auto text-white font-quicksand ">
      <div className="flex flex-col items-center w-[60%] justify-center py-3 border-dashed rounded-md border-3 md:py-6 border-slate-900 ">
        <article className="w-[85%] rounded-e-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-primary p-7">
          <FormRegister register={onRegisterHandler} />
          <p className="pt-3">
            Already have an account?{" "}
            <Link to="/" className="underline text-secondary">
              Login here
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default RegisterPage;
