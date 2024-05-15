// import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { toast } from "react-hot-toast";

const FormRegister = ({ register }) => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="mb-4 text-2xl font-semibold text-lightMode">
        Fill the form to register account.
      </h1>
      <input
        className="px-2 py-3 mb-3 text-black text-base border-none rounded-sm outline-secondary"
        type="text"
        placeholder="Username"
        value={name}
        onChange={onNameChange}
        required
      />
      <input
        className="px-2 py-3 mb-3 text-base text-black border-none rounded-sm outline-secondary"
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <input
        className="px-2 py-3 mb-3 text-base text-black border-none rounded-sm outline-secondary"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <input
        className="px-2 py-3 mb-3 text-base text-black border-none rounded-sm outline-secondary"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        required
      />
      <button
        type="submit"
        className="py-2 text-lg  bg-button hover:bg-hoverBtn text-white border-none rounded-lg cursor-pointer"
      >
        Register
      </button>
    </form>
  );
};

FormRegister.propTypes = {
  register: PropTypes.func.isRequired,
};

export default FormRegister;
