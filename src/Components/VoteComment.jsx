// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import PropTypes from "prop-types";

const VoteComment = ({ comment, onUpVote, onDownVote }) => {
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);

  const handleUpVote = () => {
    onUpVote(comment.id);
    setIsUpVoted(!isUpVoted);
  };

  const handleDownVote = () => {
    onDownVote(comment.id);
    setIsDownVoted(!isDownVoted);
  };

  return (
    <section className="flex">
      <div className="flex flex-row items-center gap-[2px] me-2">
        <button type="button" onClick={handleUpVote}>
          {isUpVoted ? (
            <BiSolidLike className="text-xl" />
          ) : (
            <BiLike className="text-xl" />
          )}
        </button>
        <span>{comment.upVotesBy.length}</span>
      </div>
      <div className="flex flex-row items-center gap-[2px] me-2">
        <button type="button" onClick={handleDownVote}>
          {isDownVoted ? (
            <BiSolidDislike className="text-xl" />
          ) : (
            <BiDislike className="text-xl" />
          )}
        </button>
        <span>{comment.downVotesBy.length}</span>
      </div>
    </section>
  );
};

VoteComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }),
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
  }).isRequired,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};

export default VoteComment;
