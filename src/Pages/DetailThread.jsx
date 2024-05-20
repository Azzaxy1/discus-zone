// import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { showFormattedDate } from "../utils/formattedDate";
import { useEffect, useState } from "react";
import {
  downVoteComment,
  getDetailThread,
  upVoteComment,
} from "../utils/network-data";
import { useParams } from "react-router-dom";
import Comments from "../Components/Comment";
import parser from "html-react-parser";

const DetailThread = () => {
  const [thread, setThread] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  // const isMounted = useRef(true);

  useEffect(() => {
    const fetchDetailThread = async () => {
      const { error, data } = await getDetailThread(id);
      if (!error) {
        setThread(data);
      }
      setLoading(false);
    };

    fetchDetailThread();
  }, [id]);

  const handleUpVoteComment = async (commentId) => {
    const { error, data } = await upVoteComment(
      thread.detailThread.id,
      commentId
    );
    if (!error) {
      const updatedComments = thread.detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy:
              data.vote.voteType === 1
                ? [...comment.upVotesBy, data.vote.userId]
                : comment.upVotesBy.filter((id) => id !== data.vote.userId),
          };
        }
        return comment;
      });

      setThread({
        ...thread,
        detailThread: {
          ...thread.detailThread,
          comments: updatedComments,
        },
      });
    }
  };
  const handleDownVoteComment = async (commentId) => {
    const { error, data } = await downVoteComment(
      thread.detailThread.id,
      commentId
    );
    console.log(data);
    if (!error) {
      const updatedComments = thread.detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            downVotesBy:
              data.vote.voteType === -1
                ? [...comment.downVotesBy, data.vote.userId]
                : comment.downVotesBy.filter((id) => id !== data.vote.userId),
          };
        }
        return comment;
      });

      setThread({
        ...thread,
        detailThread: {
          ...thread.detailThread,
          comments: updatedComments,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Data sedang dimuat...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 md:pt-12 font-quicksand ">
      <section className="flex flex-col my-10 md:max-w-[60%]  max-w-[90%]  md:py-10 py-3 m-auto  p-5">
        <div className="flex flex-col border-2 rounded-md px-9 md:py-10">
          {thread && (
            <div className="pt-5 md:pt-0">
              <article>
                <header className="flex flex-col w-full gap-2">
                  <span className="px-2 py-1 text-sm border rounded-lg md:text-sm border-secondary w-fit">
                    #{thread.detailThread.category}
                  </span>
                  <h2 className="text-2xl font-bold md:text-4xl">
                    {thread.detailThread.title}
                  </h2>
                </header>
                <div className="flex flex-col gap-3 pt-3">
                  <div className="text-sm font-medium md:text-lg">
                    {parser(thread.detailThread.body)}
                  </div>
                  <footer className="flex flex-row items-center gap-1">
                    <button
                      type="button"
                      className="flex flex-row items-center gap-[2px] me-2"
                    >
                      <BiLike className="text-lg md:text-xl" />
                      <span>{thread.detailThread.upVotesBy.length}</span>
                    </button>
                    <button
                      type="button"
                      className="flex flex-row items-center gap-[2px] me-2"
                    >
                      <BiDislike className="text-lg md:text-xl" />
                      <span>{thread.detailThread.downVotesBy.length}</span>
                    </button>
                    <div className="flex items-center gap-1 ml-1 text-sm md:text-base">
                      Dibuat oleh
                      <img
                        src={thread.detailThread.owner.avatar}
                        alt={thread.detailThread.owner.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="font-bold">
                        {thread.detailThread.owner.name}
                      </span>
                    </div>
                    <p className="ml-2 text-sm md:text-base">
                      {showFormattedDate(thread.detailThread.createdAt)}
                    </p>
                  </footer>
                </div>
              </article>
            </div>
          )}
          <article className="py-5">
            <Comments
              comments={thread.detailThread.comments}
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
