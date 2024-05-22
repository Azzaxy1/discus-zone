// import React from "react";
import { MdOutlineForum } from "react-icons/md";
import Category from "../Components/Category";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { downVoteThread, upVoteThread } from "../utils/network-data";
import ListThread from "../Components/ListThread";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSeeAllThreads,
  asyncToggleLikeThread,
} from "../redux/threads/action";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSeeAllThreads());
  }, [dispatch]);

  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const handleUpVoteThread = async (threadId) => {
    dispatch(asyncToggleLikeThread(threadId));
  };

  const handleDownVoteThread = async (threadId) => {
    await downVoteThread(threadId);
  };

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <main className="min-h-screen py-24 md:py-20 font-quicksand">
      <header className="md:py-10 py-3 m-auto bg-[#f4f4f5]">
        <div className="flex flex-row justify-center md:px-48 px-9 gap-7">
          <MdOutlineForum className="text-7xl" />
          <div className="max-w-sm md:max-w-md">
            <h1 className="text-lg font-semibold md:text-2xl">
              Selamat datang di DiscusZone
            </h1>
            <p className="text-sm font-thin md:text-base">
              DiscusZone merupakan sebuah platform diskusi online yang
              memungkinkan pengguna untuk berbagi informasi, bertanya, dan
              berdiskusi mengenai berbagai topik
            </p>
          </div>
        </div>
      </header>
      <Category
        data={threads}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <ListThread
        filteredThreads={filteredThreads}
        users={users}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
      />
      <aside className="fixed bottom-5 right-5">
        <Link to="/add-thread">
          <IoIosAddCircle className="text-5xl " />
        </Link>
      </aside>
    </main>
  );
};

export default HomePage;
