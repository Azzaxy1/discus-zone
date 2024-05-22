import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className={'py-5 font-quicksand text-center bg-primary text-white'}>
      <p className={'text-sm md:text-xl'}>
        DiscusZone © 2024; created by{' '}
        <Link
          to="https://github.com/Azzaxy1"
          className={'font-medium underline'}
        >
          Abdurrohman Azis
        </Link>
      </p>
    </footer>
  )
}
