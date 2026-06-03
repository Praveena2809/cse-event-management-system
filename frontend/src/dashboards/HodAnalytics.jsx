import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HodAnalytics() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/events/public");
      setEvents(data.events || []);
    })();
  }, []);

  const chart = useMemo(() => {
    const labels = events.map((e) => e.name).slice(0, 8);
    const counts = events.map((e) => (e.subevents || []).length).slice(0, 8);
    return {
      data: {
        labels,
        datasets: [
          {
            label: "Subevents",
            data: counts,
            backgroundColor: "rgba(99, 102, 241, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "top" }, title: { display: true, text: "Subevents per Main Event" } },
      },
    };
  }, [events]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analytics</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Basic overview (extend this with attendance/feedback reports in production).
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <Bar data={chart.data} options={chart.options} />
      </div>
    </div>
  );
}

