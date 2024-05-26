import React from 'react'
import PropTypes from 'prop-types'

const LeaderboardItem = ({ name, score, avatar }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-center gap-3">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
        <p className="text-xl">{name}</p>
      </div>
      <p className="text-xl">{score}</p>
    </div>
  )
}

LeaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired
}

export default LeaderboardItem
