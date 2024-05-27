import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

const FormRegister = ({ register }) => {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const onSubmit = (e) => {
    e.preventDefault()

    register({ name, email, password })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="mb-4 text-2xl font-semibold text-lightMode">
        Fill the form to register account.
      </h1>
      <input
        className="px-2 py-3 mb-3 text-base text-black border-none rounded-sm outline-secondary"
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
      <button
        type="submit"
        className="py-2 text-lg text-white border-none rounded-lg cursor-pointer bg-button hover:bg-hoverBtn"
      >
        Register
      </button>
    </form>
  )
}

FormRegister.propTypes = {
  register: PropTypes.func.isRequired
}

export default FormRegister
