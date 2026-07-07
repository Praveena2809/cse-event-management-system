export default function Contact() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact</h2>
      <p className="text-slate-600 dark:text-slate-300">
        For event-related queries, contact the department office or mail us.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
        <p className="font-semibold text-slate-900 dark:text-white">Department of CSE</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">Anna University affiliated college</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Email: cse-events@college.edu</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">Phone: +91 90000 00001</p>
      </div>
    </div>
  );
}

