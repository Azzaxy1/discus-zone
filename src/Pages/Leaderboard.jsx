// import React from "react";

import { useEffect, useState } from "react";
import { getLeaderboards } from "../utils/network-data";

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      const { error, data } = await getLeaderboards();
      if (!error) {
        setLeaderboards(data);
        setIsLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Data sedang dimuat...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-10 md:pt-24 pt-28 font-quicksand">
      <div className="flex flex-col min-h-[100vh] md:max-w-[60%] max-w-[90%] px-9 md:py-10 py-3 m-auto border-2 p-5 rounded-md">
        <div className="w-full pb-3 border-b border-b-black">
          <h2 className="text-2xl font-bold">Klasmen Pengguna Aktif</h2>
        </div>
        <div className="flex flex-col gap-3 pt-5">
          <header className="flex justify-between pb-2">
            <p className="text-lg font-medium">Pengguna</p>
            <p className="text-lg font-medium">Skor</p>
          </header>
          {leaderboards.leaderboards.map((leaderboard) => (
            <div key={leaderboard.user.id} className="flex justify-between">
              <div className="flex items-center justify-center gap-3">
                <img
                  src={leaderboard.user.avatar}
                  alt={leaderboard.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-xl">{leaderboard.user.name}</p>
              </div>
              <p className="text-xl">{leaderboard.score}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
