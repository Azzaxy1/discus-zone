import React, { useState } from 'react'
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import PropTypes from 'prop-types'

const VoteThread = ({ thread, onUpVote, onDownVote }) => {
  const [isUpVoted, setIsUpVoted] = useState(false)
  const [isDownVoted, setIsDownVoted] = useState(false)

  const handleUpVote = () => {
    onUpVote(thread.id)
    setIsUpVoted((prev) => !prev)
  }

  const handleDownVote = () => {
    onDownVote(thread.id)
    setIsDownVoted((prev) => !prev)
  }

  return (
    <section className="flex">
      <div className="flex flex-row items-center gap-[2px] me-2">
        <button type="button" onClick={handleUpVote}>
          {isUpVoted
            ? (
            <BiSolidLike className="text-xl" />
              )
            : (
            <BiLike className="text-xl" />
              )}
        </button>
        <span>{thread.upVotesBy.length}</span>
      </div>
      <div className="flex flex-row items-center gap-[2px] me-2">
        <button type="button" onClick={handleDownVote}>
          {isDownVoted
            ? (
            <BiSolidDislike className="text-xl" />
              )
            : (
            <BiDislike className="text-xl" />
              )}
        </button>
        <span>{thread.downVotesBy.length}</span>
      </div>
    </section>
  )
}

VoteThread.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    ownerId: PropTypes.string,
    totalComments: PropTypes.number,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    ownerUsername: PropTypes.string,
    ownerAvatar: PropTypes.string
  }),
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func
}

export default VoteThread
