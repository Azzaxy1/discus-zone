// import React from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import parser from "html-react-parser";
import VoteThread from "./VoteThread";

const ListThread = ({ data, onUpVote, onDownVote }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <section className="flex md:max-w-[60%] max-w-[90%] m-auto flex-row gap-7">
      <div className="flex flex-col w-full p-5 border-2 rounded-md">
        <h1 className="text-2xl font-bold">Kumpulan Thread</h1>
        <div className="flex flex-wrap gap-5 mt-2">
          {data.threads.map((thread) => (
            <article
              key={thread.id}
              className="flex flex-col w-full gap-2 p-4 border-2 rounded-md "
            >
              <header className="flex flex-col gap-2">
                <span className="px-2 py-1 text-sm border rounded-lg md:text-base border-secondary w-fit">
                  #{thread.category}
                </span>
                <h4 className="text-sm font-semibold md:text-lg">
                  <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
                </h4>
              </header>
              <div className="text-sm md:text-base">
                {parser(truncateText(thread.body, 200))}
              </div>
              <footer className="flex flex-row items-center gap-1">
                <VoteThread
                  thread={thread}
                  onUpVote={onUpVote}
                  onDownVote={onDownVote}
                />
                <div className="flex flex-row items-center gap-[2px] me-1">
                  <FaRegComment />
                  <span>{thread.totalComments}</span>
                </div>
                <p>{showFormattedDate(thread.createdAt)}</p>
                <p className="flex items-center gap-1 ml-1 text-sm md:text-base">
                  Dibuat oleh{" "}
                  <img
                    src={thread.ownerAvatar}
                    alt={thread.ownerUsername}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="font-bold">{thread.ownerUsername}</span>
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
ListThread.propTypes = {
  data: PropTypes.shape({
    threads: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        ownerId: PropTypes.string.isRequired,
        upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
        downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
        totalComments: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
};

export default ListThread;
