export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">Department of CSE</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Anna University affiliated college — Event Management System
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">Contact</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">cse-events@college.edu</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">+91 90000 00001</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">Social</p>
          <div className="mt-2 flex gap-3 text-sm text-slate-600 dark:text-slate-300">
            <a className="hover:underline" href="#" onClick={(e) => e.preventDefault()}>
              Instagram
            </a>
            <a className="hover:underline" href="#" onClick={(e) => e.preventDefault()}>
              LinkedIn
            </a>
            <a className="hover:underline" href="#" onClick={(e) => e.preventDefault()}>
              YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} CSE Department. All rights reserved.
      </div>
    </footer>
  );
}

