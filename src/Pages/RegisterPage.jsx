// import React from "react";
import { register } from "../utils/network-data";
import FormRegister from "../Components/FormRegister";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
      toast.success("Register success, please login");
    }
  };

  return (
    <section className="flex items-center  justify-center min-h-screen mx-auto font-quicksand text-white ">
      <div className="flex flex-col items-center w-[60%] justify-center py-3 border-dashed rounded-md border-3 md:py-6 border-slate-900 ">
        <article className="w-[85%] rounded-e-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-primary p-7">
          <FormRegister register={onRegisterHandler} />
          <p className="pt-3">
            Already have an account?{" "}
            <Link to="/" className="text-secondary underline">
              Login here
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
};

export default RegisterPage;
