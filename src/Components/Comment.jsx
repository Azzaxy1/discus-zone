// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { showFormattedDate } from "../utils/formattedDate";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import { createComment } from "../utils/network-data";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import VoteComment from "./VoteComment";

const Comments = ({ comments, onUpVote, onDownVote }) => {
  const [input, setInput] = useState("");
  const { id } = useParams();

  const onCommentHandler = (event) => {
    setInput(event.target.innerHTML);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { error } = await createComment(id, { content: input });
      if (error) {
        throw new Error("Gagal menambahkan komentar");
      }
      window.location.reload();
      toast.success("Berhasil menambahkan komentar");
      setInput("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <article>
        <h3 className="pb-2 text-xl font-bold">Beri Komentar</h3>
        <form onSubmit={onSubmitHandler}>
          <div
            contentEditable
            data-placeholder="Tuliskan deskripsi..."
            className="block w-full h-40 px-2 py-2 border border-gray-500 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            value={input}
            onInput={onCommentHandler}
            aria-required="true"
          />
          <button
            type="submit"
            className="w-full p-2 mt-3 font-bold text-white rounded-md bg-primary hover:bg-hoverBtn"
          >
            Kirim
          </button>
        </form>
      </article>
      <article>
        <h3 className="pb-2 text-xl font-bold">Komentar({comments.length})</h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-2 p-3 mb-2 border rounded-md border-secondary"
          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={comment.owner.avatar}
                  alt={comment.owner.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="font-bold">{comment.owner.name}</span>
              </div>
              <span>{showFormattedDate(comment.createdAt)}</span>
            </header>
            <div>{parser(comment.content)}</div>
            <footer className="flex flex-row items-center gap-1">
              <VoteComment
                comment={comment}
                onUpVote={onUpVote}
                onDownVote={onDownVote}
              />
            </footer>
          </div>
        ))}
      </article>
    </section>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};

export default Comments;
