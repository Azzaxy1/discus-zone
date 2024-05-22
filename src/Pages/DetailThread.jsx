// import React from "react";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { showFormattedDate } from "../utils/formattedDate";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Comments from "../Components/Comment";
import parser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDownVoteComment,
  asyncThreadDetail,
  asyncUpVoteComment,
} from "../redux/threadDetail/action";
import {
  asyncDownVoteThread,
  asyncUpVoteThread,
} from "../redux/threads/action";

const DetailThread = () => {
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncThreadDetail(id));
  }, [id, dispatch]);

  const thread = useSelector((state) => state.detailThread);

  const handleUpVoteThread = () => {
    dispatch(asyncUpVoteThread(thread.id));
    setIsUpVoted(!isUpVoted);
  };

  const handleDownVoteThread = () => {
    dispatch(asyncDownVoteThread(thread.id));
    setIsDownVoted(!isDownVoted);
  };

  const handleUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId));
  };
  const handleDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId));
  };

  return (
    <main className="min-h-screen pt-20 md:pt-12 font-quicksand ">
      <section className="flex flex-col my-10 md:max-w-[60%]  max-w-[90%]  md:py-10 py-3 m-auto  p-5">
        <div className="flex flex-col border-2 rounded-md px-9 md:py-10">
          {thread && (
            <div className="pt-5 md:pt-0">
              <article>
                <header className="flex flex-col w-full gap-2">
                  <span className="px-2 py-1 text-sm border rounded-lg md:text-sm border-secondary w-fit">
                    #{thread?.category}
                  </span>
                  <h2 className="text-2xl font-bold md:text-4xl">
                    {thread?.title}
                  </h2>
                </header>
                <div className="flex flex-col gap-3 pt-3">
                  <div className="text-sm font-medium md:text-lg">
                    {parser(thread?.body)}
                  </div>
                  <footer className="flex flex-row items-center gap-1">
                    <button
                      type="button"
                      className="flex flex-row items-center gap-[2px] me-2"
                      onClick={handleUpVoteThread}
                    >
                      {isUpVoted ? (
                        <BiSolidLike className="text-xl" />
                      ) : (
                        <BiLike className="text-xl" />
                      )}
                      <span>{thread?.upVotesBy.length}</span>
                    </button>
                    <button
                      type="button"
                      className="flex flex-row items-center gap-[2px] me-2"
                      onClick={handleDownVoteThread}
                    >
                      {isDownVoted ? (
                        <BiSolidDislike className="text-xl" />
                      ) : (
                        <BiDislike className="text-xl" />
                      )}
                      <span>{thread?.downVotesBy.length}</span>
                    </button>
                    <div className="flex items-center gap-1 ml-1 text-sm md:text-base">
                      Dibuat oleh
                      <img
                        src={thread?.owner.avatar}
                        alt={thread?.owner.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="font-bold">{thread?.owner.name}</span>
                    </div>
                    <p className="ml-2 text-sm md:text-base">
                      {showFormattedDate(thread?.createdAt)}
                    </p>
                  </footer>
                </div>
              </article>
            </div>
          )}
          <article className="py-5">
            <Comments
              comments={thread?.comments || []}
              onUpVote={handleUpVoteComment}
              onDownVote={handleDownVoteComment}
            />
          </article>
        </div>
      </section>
    </main>
  );
};

export default DetailThread;
