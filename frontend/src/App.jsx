// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import MainLayout from "./layouts/MainLayout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import Events from "./pages/Events";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import VerifyEmail from "./pages/VerifyEmail";

// import ParticipantDashboard from "./dashboards/ParticipantDashboard";
// import ParticipantOverview from "./dashboards/ParticipantOverview";
// import MyRegistrations from "./dashboards/MyRegistrations";
// import ApplyCoordinator from "./dashboards/ApplyCoordinator";
// import Profile from "./dashboards/Profile";

// import CoordinatorDashboard from "./dashboards/CoordinatorDashboard";
// import CoordinatorOverview from "./dashboards/CoordinatorOverview";
// import CreateMainEvent from "./dashboards/CreateMainEvent";
// import MyEvents from "./dashboards/MyEvents";
// import QRAttendance from "./dashboards/QRAttendance";

// import HodDashboard from "./dashboards/HodDashboard";
// import HodOverview from "./dashboards/HodOverview";
// import PendingApprovals from "./dashboards/PendingApprovals";
// import CoordinatorApplications from "./dashboards/CoordinatorApplications";
// import HodAnalytics from "./dashboards/HodAnalytics";

// import AdminDashboard from "./dashboards/AdminDashboard";
// import AdminOverview from "./dashboards/AdminOverview";
// import ManageUsers from "./dashboards/ManageUsers";
// import ManageVenues from "./dashboards/ManageVenues";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />

//           {/* Participant */}
//           <Route element={<ProtectedRoute roles={["participant"]} />}>
//             <Route path="/dashboard/participant" element={<ParticipantDashboard />}>
//               <Route index element={<ParticipantOverview />} />
//               <Route path="registrations" element={<MyRegistrations />} />
//               <Route path="apply-coordinator" element={<ApplyCoordinator />} />
//               <Route path="profile" element={<Profile />} />
//             </Route>
//           </Route>

//           {/* Coordinator */}
//           <Route element={<ProtectedRoute roles={["coordinator"]} />}>
//             <Route path="/dashboard/coordinator" element={<CoordinatorDashboard />}>
//               <Route index element={<CoordinatorOverview />} />
//               <Route path="create-event" element={<CreateMainEvent />} />
//               <Route path="my-events" element={<MyEvents />} />
//               <Route path="qr-attendance" element={<QRAttendance />} />
//             </Route>
//           </Route>

//           {/* HOD */}
//           <Route element={<ProtectedRoute roles={["hod"]} />}>
//             <Route path="/dashboard/hod" element={<HodDashboard />}>
//               <Route index element={<HodOverview />} />
//               <Route path="pending-approvals" element={<PendingApprovals />} />
//               <Route path="coordinator-applications" element={<CoordinatorApplications />} />
//               <Route path="analytics" element={<HodAnalytics />} />
//             </Route>
//           </Route>

//           {/* Admin */}
//           <Route element={<ProtectedRoute roles={["admin"]} />}>
//             <Route path="/dashboard/admin" element={<AdminDashboard />}>
//               <Route index element={<AdminOverview />} />
//               <Route path="users" element={<ManageUsers />} />
//               <Route path="venues" element={<ManageVenues />} />
//             </Route>
//           </Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

import ParticipantDashboard from "./dashboards/ParticipantDashboard";
import ParticipantOverview from "./dashboards/ParticipantOverview";
import MyRegistrations from "./dashboards/MyRegistrations";
import ApplyCoordinator from "./dashboards/ApplyCoordinator";
import Profile from "./dashboards/Profile";

import CoordinatorDashboard from "./dashboards/CoordinatorDashboard";
import CoordinatorOverview from "./dashboards/CoordinatorOverview";
import CreateMainEvent from "./dashboards/CreateMainEvent";
import MyEvents from "./dashboards/MyEvents";
import QRAttendance from "./dashboards/QRAttendance";

import HodDashboard from "./dashboards/HodDashboard";
import HodOverview from "./dashboards/HodOverview";
import PendingApprovals from "./dashboards/PendingApprovals";
import CoordinatorApplications from "./dashboards/CoordinatorApplications";
import HodAnalytics from "./dashboards/HodAnalytics";

import AdminDashboard from "./dashboards/AdminDashboard";
import AdminOverview from "./dashboards/AdminOverview";
import ManageUsers from "./dashboards/ManageUsers";
import ManageVenues from "./dashboards/ManageVenues";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/:role" element={<Login />} />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />
          <Route
            path="/verify-email"
            element={<VerifyEmail />}
          />

          {/* Participant */}
          <Route
            element={
              <ProtectedRoute roles={["participant"]} />
            }
          >
            <Route
              path="/dashboard/participant"
              element={<ParticipantDashboard />}
            >
              <Route
                index
                element={<ParticipantOverview />}
              />
              <Route
                path="registrations"
                element={<MyRegistrations />}
              />
              <Route
                path="apply-coordinator"
                element={<ApplyCoordinator />}
              />
              <Route
                path="profile"
                element={<Profile />}
              />
            </Route>
          </Route>

          {/* Coordinator */}
          <Route
            element={
              <ProtectedRoute roles={["coordinator"]} />
            }
          >
            <Route
              path="/dashboard/coordinator"
              element={<CoordinatorDashboard />}
            >
              <Route
                index
                element={<CoordinatorOverview />}
              />
              <Route
                path="create-event"
                element={<CreateMainEvent />}
              />
              <Route
                path="my-events"
                element={<MyEvents />}
              />
              <Route
                path="qr-attendance"
                element={<QRAttendance />}
              />
            </Route>
          </Route>

          {/* HOD */}
          <Route
            element={<ProtectedRoute roles={["hod"]} />}
          >
            <Route
              path="/dashboard/hod"
              element={<HodDashboard />}
            >
              <Route
                index
                element={<HodOverview />}
              />
              <Route
                path="pending-approvals"
                element={<PendingApprovals />}
              />
              <Route
                path="coordinator-applications"
                element={<CoordinatorApplications />}
              />
              <Route
                path="analytics"
                element={<HodAnalytics />}
              />
            </Route>
          </Route>

          {/* Admin */}
          <Route
            element={
              <ProtectedRoute roles={["admin"]} />
            }
          >
            <Route
              path="/dashboard/admin"
              element={<AdminDashboard />}
            >
              <Route
                index
                element={<AdminOverview />}
              />
              <Route
                path="users"
                element={<ManageUsers />}
              />
              <Route
                path="venues"
                element={<ManageVenues />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}