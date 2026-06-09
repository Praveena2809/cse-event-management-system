import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function PendingApprovals() {
  const [data, setData] = useState({
    events: [],
    subevents: [],
  });

  const [reason, setReason] =
    useState({});

  const load = async () => {
    const { data } =
      await api.get(
        "/events/hod/pending"
      );

    setData({
      events:
        data.events || [],
      subevents:
        data.subevents ||
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

      <div className="space-y-3">
        <p className="font-semibold text-slate-900 dark:text-white">
          Main Events
        </p>

        {data.events.map(
          (e) => (
            <div
              key={e._id}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <p className="font-semibold">
                {e.name}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                {
                  e.description
                }
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Created by:{" "}
                {
                  e
                    .createdBy
                    ?.name
                }{" "}
                (
                {
                  e
                    .createdBy
                    ?.email
                }
                )
              </p>

              {/* CANCELLATION REQUEST */}

              {e.status ===
                "cancel_requested" && (
                <div className="mt-3 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                  <p className="font-semibold">
                    Cancellation
                    Requested
                  </p>

                  <p>
                    Reason:{" "}
                    {
                      e.cancelReason
                    }
                  </p>

                  <button
                    onClick={() =>
                      approveCancel(
                        e._id
                      )
                    }
                    className="mt-3 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Approve
                    Cancellation
                  </button>
                </div>
              )}

              {/* RESCHEDULE REQUEST */}

              {e.status ===
                "reschedule_requested" && (
                <div className="mt-3 rounded-lg bg-yellow-100 p-3 text-sm text-yellow-800">
                  <p className="font-semibold">
                    Reschedule
                    Requested
                  </p>

                  <p>
                    New Date:{" "}
                    {new Date(
                      e
                        .rescheduleRequest
                        ?.newDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    New Venue:{" "}
                    {
                      e
                        .rescheduleRequest
                        ?.newVenue
                    }
                  </p>

                  <p>
                    New Time:{" "}
                    {
                      e
                        .rescheduleRequest
                        ?.newTime
                    }
                  </p>

                  <p>
                    Reason:{" "}
                    {
                      e
                        .rescheduleRequest
                        ?.reason
                    }
                  </p>

                  <button
                    onClick={() =>
                      approveReschedule(
                        e._id
                      )
                    }
                    className="mt-3 rounded-md bg-yellow-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Approve
                    Reschedule
                  </button>
                </div>
              )}

              {/* NORMAL APPROVAL */}

              {e.status ===
                "pending" && (
                <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_auto]">
                  <input
                    placeholder="Rejection reason"
                    value={
                      reason[
                        e._id
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
                          [e._id]:
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
                      approveEvent(
                        e._id
                      )
                    }
                    className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectEvent(
                        e._id
                      )
                    }
                    className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )
        )}

        {!data.events
          .length && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            No pending
            main events.
          </p>
        )}
      </div>

      {/* SUBEVENTS */}

      <div className="space-y-3">
        <p className="font-semibold text-slate-900 dark:text-white">
          Subevents
        </p>

        {data.subevents.map(
          (s) => (
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