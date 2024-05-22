import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <main className="min-h-screen place-content-center">
      <section
        className="flex flex-col items-center justify-center space-y-8"
      >
        <h1 className="font-semibold text-8xl">Oops!</h1>
        <p className="text-lg font-semibold">404 Page Not Found...</p>
        <p className="font-semibold ">
          <Link to="/" className="underline  hover:text-primary">
            Kembali ke Halaman Utama
          </Link>
        </p>
      </section>
    </main>
  )
}

export default ErrorPage
