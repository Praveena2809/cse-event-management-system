import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function CoordinatorLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoordinator, setSelectedCoordinator] =
  useState(null);
  const [search,setSearch]=
  useState("");
  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data } = await api.get(
        "/leaderboard/coordinators"
      );

      setLeaderboard(data.leaderboard);
    } catch (err) {
      console.error(err);
      alert("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-lg">
        Loading leaderboard...
      </div>
    );
  }
  const topCoordinator = leaderboard[0];

  const averageRating =
  leaderboard.length === 0
  ? 0
  : (
  leaderboard.reduce(
  (sum,c)=>sum+c.averageRating,
  0
  )
  /
  leaderboard.length
  ).toFixed(1);
  
  const averageAttendance =
  leaderboard.length === 0
  ? 0
  : Math.round(
  leaderboard.reduce(
  (sum,c)=>sum+c.attendanceRate,
  0
  )
  /
  leaderboard.length
  );
  return (
    <div className="space-y-6 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          🏆 Coordinator Leaderboard
        </h1>
        <div className="grid gap-4 md:grid-cols-4">

<div className="rounded-xl border p-4">
<h3 className="text-sm text-slate-500">
🏆 Top Coordinator
</h3>

<p className="mt-2 text-xl font-bold">
{topCoordinator?.name || "-"}
</p>

<p>
{topCoordinator?.score || 0} pts
</p>
</div>

<div className="rounded-xl border p-4">
<h3 className="text-sm text-slate-500">
👥 Coordinators
</h3>

<p className="mt-2 text-xl font-bold">
{leaderboard.length}
</p>
</div>

<div className="rounded-xl border p-4">
<h3 className="text-sm text-slate-500">
⭐ Average Rating
</h3>

<p className="mt-2 text-xl font-bold">
{averageRating}
</p>
</div>

<div className="rounded-xl border p-4">
<h3 className="text-sm text-slate-500">
🎯 Avg Attendance
</h3>

<p className="mt-2 text-xl font-bold">
{averageAttendance}%
</p>
</div>

</div>

        <p className="mt-1 text-slate-500">
          Rankings are calculated using event performance,
          registrations, attendance and participant feedback.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
      <input
type="text"
placeholder="Search coordinator..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
className="w-full rounded-lg border p-3"
/>
        <table className="min-w-full">

          <thead className="bg-slate-100 dark:bg-slate-900">

            <tr>

              <th className="p-3 text-left">Rank</th>

              <th className="p-3 text-left">
                Coordinator
              </th>

              <th className="p-3 text-center">
                Score
              </th>

              <th className="p-3 text-center">
                Level
              </th>

              <th className="p-3 text-center">
                Events
              </th>

              <th className="p-3 text-center">
                Subevents
              </th>

              <th className="p-3 text-center">
                Registrations
              </th>

              <th className="p-3 text-center">
                Attendance
              </th>

              <th className="p-3 text-center">
                Attendance %
              </th>

              <th className="p-3 text-center">
                Rating
              </th>

              <th className="p-3 text-center">
                Badges
              </th>

            </tr>

          </thead>

          <tbody>

          {leaderboard
  .filter((c) =>
    c.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((c) => (

    <tr
    key={c.coordinatorId}
    onClick={() => setSelectedCoordinator(c)}
    className="cursor-pointer border-t hover:bg-slate-50 dark:hover:bg-slate-900"
  >

                <td className="p-3 font-bold">

                  {c.rank === 1 && "🥇"}

                  {c.rank === 2 && "🥈"}

                  {c.rank === 3 && "🥉"}

                  {c.rank > 3 && c.rank}

                </td>

                <td className="p-3">

                  <div className="font-semibold">
                    {c.name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {c.email}
                  </div>

                </td>

                <td className="p-3">

<div className="text-center font-bold">
  {c.score}
</div>

<div className="mt-2 h-2 rounded-full bg-slate-300">

  <div
    className="h-2 rounded-full bg-green-500"
    style={{
      width: `${Math.min(c.score / 10, 100)}%`,
    }}
  />

</div>

</td>

                <td className="p-3 text-center">
  <span
    className={`rounded-full px-3 py-1 text-sm font-semibold text-white
    ${
      c.level.includes("Elite")
        ? "bg-purple-600"
        : c.level.includes("Gold")
        ? "bg-yellow-500"
        : c.level.includes("Silver")
        ? "bg-gray-500"
        : c.level.includes("Bronze")
        ? "bg-orange-500"
        : "bg-blue-500"
    }`}
  >
    {c.level}
  </span>
</td>

                <td className="p-3 text-center">
                  {c.approvedEvents}
                </td>

                <td className="p-3 text-center">
                  {c.approvedSubevents}
                </td>

                <td className="p-3 text-center">
                  {c.registrations}
                </td>

                <td className="p-3 text-center">
                  {c.attendance}
                </td>

                <td className="p-3 text-center">
                <div className="text-center">

<p>{c.attendanceRate}%</p>

<div className="mt-2 h-2 rounded-full bg-slate-300">

  <div
    className={`h-2 rounded-full
    ${
      c.attendanceRate >= 90
        ? "bg-green-500"
        : c.attendanceRate >= 75
        ? "bg-blue-500"
        : c.attendanceRate >= 60
        ? "bg-yellow-500"
        : "bg-red-500"
    }`}
    style={{
      width: `${c.attendanceRate}%`,
    }}
  />

</div>

</div>
                </td>

                <td className="p-3 text-center">
                  ⭐ {c.averageRating}
                </td>

                <td className="p-3">

                  <div className="flex flex-wrap gap-1">

                    {c.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-yellow-100 px-2 py-1 text-xs"
                      >
                        {badge}
                      </span>
                    ))}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {selectedCoordinator && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

<div className="w-[650px] rounded-xl bg-white p-6 dark:bg-slate-900">

<h2 className="text-2xl font-bold">

Coordinator Performance

</h2>

<div className="mt-6 grid grid-cols-2 gap-4">

<p><b>Name:</b> {selectedCoordinator.name}</p>

<p><b>Email:</b> {selectedCoordinator.email}</p>

<p><b>Phone:</b> {selectedCoordinator.phone}</p>

<p><b>Rank:</b> #{selectedCoordinator.rank}</p>

<p><b>Score:</b> {selectedCoordinator.score}</p>

<p><b>Level:</b> {selectedCoordinator.level}</p>

<p><b>Approved Events:</b> {selectedCoordinator.approvedEvents}</p>

<p><b>Approved Subevents:</b> {selectedCoordinator.approvedSubevents}</p>

<p><b>Registrations:</b> {selectedCoordinator.registrations}</p>

<p><b>Attendance:</b> {selectedCoordinator.attendance}</p>

<p><b>Attendance %:</b> {selectedCoordinator.attendanceRate}%</p>

<p><b>Rating:</b> ⭐ {selectedCoordinator.averageRating}</p>

<p><b>Cancelled Events:</b> {selectedCoordinator.cancelledEvents}</p>

</div>

<div className="mt-6">

<h3 className="font-semibold">

Badges

</h3>

<div className="mt-2 flex flex-wrap gap-2">

{selectedCoordinator.badges.map((badge) => (

<span
key={badge}
className="rounded-full bg-yellow-100 px-3 py-1 text-sm"
>

{badge}

</span>

))}

</div>

</div>

<button

onClick={() => setSelectedCoordinator(null)}

className="mt-6 rounded-lg bg-red-600 px-5 py-2 text-white"

>

Close

</button>

</div>

</div>

)}
    </div>
  );
}