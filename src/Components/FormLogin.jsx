import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

const FormLogin = ({ login }) => {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const onSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="mb-4 text-2xl font-semibold text-lightMode">
        Login to use app, please.
      </h1>
      <input
        className="px-2 py-3 mb-3 text-base text-black border-none rounded-sm outline-primary"
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <input
        className="px-2 py-3 mb-3 text-base text-black border-none rounded-sm outline-primary"
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
        Login
      </button>
    </form>
  )
}

FormLogin.propTypes = {
  login: PropTypes.func.isRequired
}

export default FormLogin
