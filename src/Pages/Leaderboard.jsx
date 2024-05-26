import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLeaderboars } from '../redux/leaderboards/action'
import LeaderboardItem from '../Components/LeaderboardItem'

const Leaderboard = () => {
  const leaderboards = useSelector((states) => states.leaderboards)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncLeaderboars())
  }, [dispatch])

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
          {leaderboards.map((leaderboard, i) => (
          <LeaderboardItem key={i} name={leaderboard.user.name} score={leaderboard.score} avatar={leaderboard.user.avatar}/>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Leaderboard
