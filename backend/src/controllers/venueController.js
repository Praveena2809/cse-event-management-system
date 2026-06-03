import { asyncHandler } from "../utils/asyncHandler.js";
import { Venue } from "../models/Venue.js";
import { Subevent } from "../models/Subevent.js";

const isOverlapping = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;

export const listVenues = asyncHandler(async (req, res) => {
  const venues = await Venue.find({ isActive: true }).sort({ name: 1 });
  res.json({ venues });
});

export const createVenue = asyncHandler(async (req, res) => {
  const { name, location, capacity, notes } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Venue name is required");
  }
  const exists = await Venue.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error("Venue name already exists");
  }
  const venue = await Venue.create({ name, location, capacity, notes });
  res.status(201).json({ venue });
});

/**
 * Availability checker used by the coordinator venue booking UI.
 * - returns conflicts for the selected venue
 * - suggests alternate venues that are free in the same time window
 */
export const checkAvailability = asyncHandler(async (req, res) => {
  const { venueId, startAt, endAt } = req.query;
  if (!venueId || !startAt || !endAt) {
    res.status(400);
    throw new Error("venueId, startAt, endAt are required");
  }

  const start = new Date(startAt);
  const end = new Date(endAt);

  const bookings = await Subevent.find({
    venue: venueId,
    status: { $ne: "rejected" },
  }).select("name startAt endAt");

  const conflicts = bookings.filter((b) => isOverlapping(start, end, b.startAt, b.endAt));

  const allVenues = await Venue.find({ isActive: true }).select("name location");
  const suggested = [];

  for (const v of allVenues) {
    if (String(v._id) === String(venueId)) continue;
    const otherBookings = await Subevent.find({ venue: v._id, status: { $ne: "rejected" } }).select(
      "startAt endAt"
    );
    const hasConflict = otherBookings.some((b) => isOverlapping(start, end, b.startAt, b.endAt));
    if (!hasConflict) suggested.push(v);
  }

  res.json({
    conflicts,
    suggestedAlternateVenues: suggested,
  });
});

