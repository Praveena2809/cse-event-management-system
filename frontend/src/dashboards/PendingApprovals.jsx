import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function PendingApprovals() {
  // const [data, setData] = useState({
  //   events: [],
  //   subevents: [],
  // });
  const [data, setData] =
  useState({
    proposals: [],
    pendingSubevents: [],
  });

  const [reason, setReason] =
    useState({});

  const load = async () => {
    const { data } =
      await api.get(
        "/events/hod/pending"
      );

    // setData({
    //   events:
    //     data.events || [],
    //   subevents:
    //     data.subevents ||
    //     [],
    // });
    setData({
      proposals:
        data.proposals || [],
    
      pendingSubevents:
        data.pendingSubevents ||
        [],
    });
  };

  useEffect(() => {
    load();
  }, []);

  //
  // NORMAL EVENT APPROVAL
  //

  const approveEvent =
    async (id) => {
      await api.post(
        `/events/hod/events/${id}/approve`
      );

      toast.success(
        "Event approved"
      );

      load();
    };

  const rejectEvent =
    async (id) => {
      await api.post(
        `/events/hod/events/${id}/reject`,
        {
          reason:
            reason[id] ||
            "Not specified",
        }
      );

      toast.success(
        "Event rejected"
      );

      load();
    };

  //
  // SUBEVENT APPROVAL
  //

  const approveSubevent =
    async (id) => {
      await api.post(
        `/events/hod/subevents/${id}/approve`
      );

      toast.success(
        "Subevent approved"
      );

      load();
    };

  const rejectSubevent =
    async (id) => {
      await api.post(
        `/events/hod/subevents/${id}/reject`,
        {
          reason:
            reason[id] ||
            "Not specified",
        }
      );

      toast.success(
        "Subevent rejected"
      );

      load();
    };
    const reviewProposal =
  async (
    eventId,
    subevents
  ) => {
    try {
      const payload = {
        overallFeedback:
          reason[
            `event-${eventId}`
          ] || "",

        subevents:
          subevents.map(
            (s) => ({
              subeventId:
                s._id,

                action:
                reason[
                  `decision-${s._id}`
                ] ||
                "revision_requested",

              reason:
                reason[
                  s._id
                ] || "",
            })
          ),
      };

      await api.put(
        `/events/hod/events/${eventId}/review-proposal`,
        payload
      );

      toast.success(
        "Proposal reviewed"
      );

      load();
    } catch (err) {
      toast.error(
        err?.response?.data
          ?.message ||
          "Failed"
      );
    }
  };

  //
  // NEW: CANCEL APPROVAL
  //

  const approveCancel =
    async (id) => {
      try {
        await api.patch(
          `/events/hod/events/${id}/approve-cancel`
        );

        toast.success(
          "Event cancelled"
        );

        load();
      } catch (err) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Failed"
        );
      }
    };

  //
  // NEW: RESCHEDULE APPROVAL
  //

  const approveReschedule =
    async (id) => {
      try {
        await api.patch(
          `/events/hod/events/${id}/approve-reschedule`
        );

        toast.success(
          "Event rescheduled"
        );

        load();
      } catch (err) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Failed"
        );
      }
    };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Pending Approvals
        </h3>

        <button
          onClick={load}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Refresh
        </button>
      </div>

      {/* MAIN EVENTS */}

     {/* EVENT PROPOSALS */}

<div className="space-y-3">
  <p className="font-semibold text-slate-900 dark:text-white">
    Event Proposals
  </p>

  {(
  data.proposals || []
).map(    (proposal) => (
      <div
        key={proposal.event._id}
        className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
      >
        {/* EVENT DETAILS

        <div className="mb-4">
          <p className="text-lg font-bold">
            {proposal.event.name}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            {proposal.event.description}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Created by:{" "}
            {
              proposal.event
                .createdBy?.name
            }{" "}
            (
            {
              proposal.event
                .createdBy?.email
            }
            )
          </p>
        </div> */}
{/* EVENT DETAILS */}

<div className="mb-6 rounded-lg border border-slate-700 p-4">
  <h2 className="text-2xl font-bold">
    {proposal.event.name}
  </h2>

  <p className="mt-2 text-slate-300">
    {proposal.event.description}
  </p>

  <div className="mt-4 grid gap-2 md:grid-cols-2 text-sm text-slate-300">
    <p>
      <strong>
        Event Type:
      </strong>{" "}
      {
        proposal.event
          .eventType
      }
    </p>

    <p>
      <strong>
        Date:
      </strong>{" "}
      {new Date(
        proposal.event.date
      ).toLocaleDateString()}
    </p>

    <p>
      <strong>
        Budget:
      </strong>{" "}
      ₹
      {
        proposal.event
          .budgetEstimate
      }
    </p>

    <p>
      <strong>
        Number of Subevents:
      </strong>{" "}
      {
        proposal.event
          .numberOfSubevents
      }
    </p>
  </div>

  <div className="mt-4">
    <p className="font-semibold">
      Notes for HOD
    </p>

    <p className="text-sm text-slate-400">
      {
        proposal.event
          .miscNotesForHod
      }
    </p>
  </div>

  <div className="mt-4 text-sm text-slate-400">
    Coordinator:
    {" "}
    {
      proposal.event
        .createdBy?.name
    }
    {" "}
    (
    {
      proposal.event
        .createdBy?.email
    }
    )
  </div>
</div>
        {/* SUBEVENTS */}

        <div className="space-y-4">
        {(
  proposal.subevents || []
).map(
            (s) => (
              <div
                key={s._id}
                className="rounded-lg border border-slate-200 p-4 dark:border-slate-800"
              >
                {/* <p className="font-semibold">
                  {s.name}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {
                    s.description
                  }
                </p>

                <div className="mt-2 text-sm text-slate-500">
                  Venue:{" "}
                  {s.venue?.name ||
                    "N/A"}
                </div> */}
                <h4 className="text-lg font-bold">
  {s.name}
</h4>

<p className="mt-1 text-sm text-slate-300">
  {s.description}
</p>

<div className="mt-4 grid gap-2 md:grid-cols-2 text-sm">
  <p>
    <strong>
      Type:
    </strong>{" "}
    {s.type}
  </p>

  <p>
    <strong>
      Venue:
    </strong>{" "}
    {s.venue?.name ||
      "Not selected"}
  </p>

  <p>
    <strong>
      Start Time:
    </strong>{" "}
    {s.startAt
      ? new Date(
          s.startAt
        ).toLocaleString()
      : "N/A"}
  </p>

  <p>
    <strong>
      End Time:
    </strong>{" "}
    {s.endAt
      ? new Date(
          s.endAt
        ).toLocaleString()
      : "N/A"}
  </p>

  <p>
    <strong>
      Eligibility:
    </strong>{" "}
    {s.eligibility ||
      "N/A"}
  </p>

  <p>
    <strong>
      Max Participants:
    </strong>{" "}
    {
      s.maxParticipants
    }
  </p>

  <p>
    <strong>
      Entry Fee:
    </strong>{" "}
    ₹{s.entryFee}
  </p>

  <p>
    <strong>
      Event Manager:
    </strong>{" "}
    {
      s.eventManager
    }
  </p>

  <p>
    <strong>
      Manager Phone:
    </strong>{" "}
    {
      s.managerPhone
    }
  </p>

  <p>
    <strong>
      Prize Pool:
    </strong>{" "}
    {s.prizePool ||
      "N/A"}
  </p>
</div>

                {/* APPROVE / REVISION */}

                <div className="mt-4 flex gap-5">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`decision-${s._id}`}
                      checked={
                        reason[
                          `decision-${s._id}`
                        ] ===
                        "approved"
                      }
                      onChange={() =>
                        setReason(
                          (
                            r
                          ) => ({
                            ...r,
                            [
                              `decision-${s._id}`
                            ]:
                              "approved",
                          })
                        )
                      }
                    />

                    Approve
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`decision-${s._id}`}
                      checked={
                        reason[
                          `decision-${s._id}`
                        ] ===
                        "revision_requested"
                      }
                      onChange={() =>
                        setReason(
                          (
                            r
                          ) => ({
                            ...r,
                            [
                              `decision-${s._id}`
                            ]:
                              "revision_requested",
                          })
                        )
                      }
                    />

                    Request
                    Revision
                  </label>
                </div>

                {reason[
                  `decision-${s._id}`
                ] ===
                  "revision_requested" && (
                  <textarea
                    placeholder="Reason for revision"
                    value={
                      reason[
                        s._id
                      ] || ""
                    }
                    onChange={(
                      e
                    ) =>
                      setReason(
                        (
                          r
                        ) => ({
                          ...r,
                          [s._id]:
                            e.target
                              .value,
                        })
                      )
                    }
                    className="mt-3 w-full rounded-md border border-slate-200 p-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                  />
                )}
              </div>
            )
          )}
        </div>

        {/* OVERALL FEEDBACK */}

        <textarea
          placeholder="Overall feedback to coordinator"
          value={
            reason[
              `event-${proposal.event._id}`
            ] || ""
          }
          onChange={(
            e
          ) =>
            setReason(
              (r) => ({
                ...r,
                [
                  `event-${proposal.event._id}`
                ]:
                  e.target
                    .value,
              })
            )
          }
          className="mt-4 w-full rounded-md border border-slate-200 p-3 text-sm dark:border-slate-800 dark:bg-slate-950"
        />

        <button
          onClick={() =>
            reviewProposal(
              proposal.event
                ._id,
              proposal.subevents
            )
          }
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Submit Review
        </button>
      </div>
    )
  )}

  {!data.proposals
    .length && (
    <p className="text-sm text-slate-600 dark:text-slate-300">
      No pending
      proposals.
    </p>
  )}
</div>
      {/* SUBEVENTS */}

      <div className="space-y-3">
        <p className="font-semibold text-slate-900 dark:text-white">
          Subevents
        </p>

        {(
  data.pendingSubevents ||
  []
).map(          (s) => (
            <div
              key={s._id}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="font-semibold">
                {s.name}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                Main event:{" "}
                {
                  s.event
                    ?.name
                }
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                {
                  s.description
                }
              </p>

              <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_auto]">
                <input
                  placeholder="Rejection reason"
                  value={
                    reason[
                      s._id
                    ] || ""
                  }
                  onChange={(
                    ev
                  ) =>
                    setReason(
                      (
                        r
                      ) => ({
                        ...r,
                        [s._id]:
                          ev
                            .target
                            .value,
                      })
                    )
                  }
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                />

                <button
                  onClick={() =>
                    approveSubevent(
                      s._id
                    )
                  }
                  className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectSubevent(
                      s._id
                    )
                  }
                  className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}