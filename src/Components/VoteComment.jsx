// eslint-disable-next-line no-unused-vars
import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import PropTypes from "prop-types";

const VoteComment = ({ comment, onUpVote, onDownVote }) => {
  return (
    <section className="flex">
      <div className="flex flex-row items-center gap-[2px] me-2">
        <button type="button" onClick={() => onUpVote(comment.id)}>
          <BiLike className="text-xl" />
        </button>
        <span>{comment.upVotesBy.length}</span>
      </div>
      <div className="flex flex-row items-center gap-[2px] me-2">
        <button type="button" onClick={() => onDownVote(comment.id)}>
          <BiDislike className="text-xl" />
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
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default VoteComment;
