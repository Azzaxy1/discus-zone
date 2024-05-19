// import React from "react";
import { MdOutlineForum } from "react-icons/md";
import Category from "../Components/Category";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  downVoteThread,
  getAllThreads,
  getAllUsers,
  upVoteThread,
} from "../utils/network-data";
import ListThread from "../Components/ListThread";

const HomePage = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchThreadsAndUsers = async () => {
      const threadResponse = await getAllThreads();
      const userResponse = await getAllUsers();

      if (!threadResponse.error && !userResponse.error) {
        const users = userResponse.data.users;

        const updatedThreads = threadResponse.data.threads.map((thread) => {
          const user = users.find((user) => user.id === thread.ownerId);
          return {
            ...thread,
            ownerUsername: user ? user.name : "Unknown",
            ownerAvatar: user ? user.avatar : "",
          };
        });

        setThreads({ threads: updatedThreads });
      }
      setLoading(false);
    };

    fetchThreadsAndUsers();
  }, []);

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const handleUpVoteThread = async (threadId) => {
    await upVoteThread(threadId);
  };

  const handleDownVoteThread = async (threadId) => {
    await downVoteThread(threadId);
  };

  const filteredThreads = selectedCategory
    ? threads.threads.filter((thread) => thread.category === selectedCategory)
    : threads.threads;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Data sedang dimuat...</p>
      </div>
    );
  }

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
        data={threads.threads}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <ListThread
        data={{ threads: filteredThreads }}
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
