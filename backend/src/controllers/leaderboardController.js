import { User }
from "../models/User.js";
import { Event } from "../models/Event.js";
import { Subevent } from "../models/Subevent.js";
import { Registration } from "../models/Registration.js";
import { Attendance } from "../models/Attendance.js";
import { Feedback } from "../models/Feedback.js";
export const getParticipantLeaderboard =
async (req, res) => {
  try {
    const leaderboard =
      await User.find({
        role: "participant",
      })
        .sort({
          points: -1,
        })
        .select(
          "name email points"
        )
        .limit(10);

    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:");
    console.error(error);
  
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getCoordinatorLeaderboard = async (req, res) => {
  try{

  const coordinators = await User.find({
    role: "coordinator"
});
const leaderboard = [];
for (const coordinator of coordinators) {
  const approvedEvents =
  await Event.countDocuments({
      createdBy: coordinator._id,
      status: "approved",
  });
  const events = await Event.find({
    createdBy: coordinator._id,
    status: "approved",
});

const eventIds =
events.map(e => e._id);
const subevents = await Subevent.find({
  event: {
      $in: eventIds,
  },
  status: "approved",
});
const approvedSubevents = subevents.length;
const subeventIds = subevents.map(
  (subevent) => subevent._id
);
const registrations =
await Registration.countDocuments({
    subevent: {
        $in: subeventIds,
    },
});
const registrationDocs =
await Registration.find({
    subevent: {
        $in: subeventIds,
    },
});

const registrationIds =
registrationDocs.map(
    r => r._id
);
const uniqueAttendance =
await Attendance.distinct(
  "registration",
  {
    registration: {
      $in: registrationIds,
    },
  }
);

const attendance =
uniqueAttendance.length;
const feedbacks =
await Feedback.find({
    subevent: {
        $in: subeventIds,
    },
});
let averageRating = 0;

if (feedbacks.length > 0) {

    averageRating =
        feedbacks.reduce(
            (sum, f) => sum + f.rating,
            0
        ) / feedbacks.length;

}
const cancelledEvents =
await Event.countDocuments({
    createdBy: coordinator._id,
    status: "cancelled",
});
let score = 0;

score += approvedEvents * 100;

score += approvedSubevents * 25;

score += Math.floor(registrations / 10) * 10;

score += Math.floor(attendance / 10) * 15;

score -= cancelledEvents * 50;
if (averageRating >= 4.5)

  score += 100;

else if (averageRating >= 4)

  score += 70;

else if (averageRating >= 3.5)

  score += 40;
  let level = "Beginner";

if (score >= 900)

    level = "Elite Coordinator";

else if (score >= 700)

    level = "Gold Coordinator";

else if (score >= 500)

    level = "Silver Coordinator";

else if (score >= 300)

    level = "Bronze Coordinator";
    const badges = [];

if (approvedEvents >= 5)
    badges.push("🏆 Event Master");

if (registrations >= 100)
    badges.push("🔥 Crowd Puller");

if (averageRating >= 4.5)
    badges.push("⭐ Highly Rated");

if (attendance >= 100)
    badges.push("🎯 Attendance Expert");
const attendanceRate =
registrations === 0
? 0
: Math.round(
(attendance / registrations) * 100
);
    leaderboard.push({

      coordinatorId:
          coordinator._id,
  
      name:
          coordinator.name,
  
      email:
          coordinator.email,
          phone:
coordinator.phone,
  
      approvedEvents,
  
      approvedSubevents,
  
      registrations,
  
      attendance,
  
      averageRating:
Number(averageRating.toFixed(1)),
  
      cancelledEvents,
  
      score,
  
      level,
      badges,
      attendanceRate,
  
  });
}
leaderboard.sort((a, b) => {
  if (b.score !== a.score)
      return b.score - a.score;

  return b.approvedEvents - a.approvedEvents;
});
leaderboard.forEach(
  (c,index)=>{

      c.rank = index+1;

  }
);
res.json({
  totalCoordinators: leaderboard.length,
  leaderboard,
});
}
catch (error) {
  console.error("Leaderboard Error:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};