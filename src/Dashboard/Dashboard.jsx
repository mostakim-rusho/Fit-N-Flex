import { NavLink, Navigate, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useTrainer from "../Hooks/useTrainer";
import useMember from "../Hooks/useMember";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();
  const [isMember] = useMember();

  const { signOutUser, setUser } = useContext(AuthContext);

  const signOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
      })
      .catch(() => {});
  };

  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Dashboard | Fit N Flex Arena</title>
      </Helmet>
      <div className="sticky top-0 min-h-screen w-64 bg-amber-500 p-4 pt-0">
        <nav className="sticky top-0 space-y-2 pt-4">
          {isAdmin && (
            <>
              <li className="list-none">
                <NavLink
                  to="newsletter"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  All Newsletter Subscribers
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="allTrainers"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  All Trainers
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="appliedTrainer"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Applied Trainer
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="balance"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Balance
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="addNewClass"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Add New Class
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="addNewForum"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Add New Forum
                </NavLink>
              </li>
            </>
          )}
          {isTrainer && (
            <>
              <li className="list-none">
                <NavLink
                  to="manageSlots"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Manage Slots
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="addNewSlot"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Add New Slot
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="addNewForum"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Add New Forum
                </NavLink>
              </li>
            </>
          )}
          {isMember && (
            <>
              <li className="list-none">
                <NavLink
                  to="activityLog"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Activity Log
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="bookedTrainer"
                  className={({ isActive }) =>
                    `block rounded-md p-2 ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : "hover:bg-amber-600 hover:text-white"
                    }`
                  }
                >
                  Booked Trainer
                </NavLink>
              </li>
            </>
          )}
          {isAdmin && <Navigate to="/dashboard/newsletter"></Navigate>}
          {isTrainer && <Navigate to="/dashboard/manageSlots"></Navigate>}
          {isMember && <Navigate to="/dashboard/activityLog"></Navigate>}
          <hr className="my-4 border-gray-300" />
          <li className="list-none">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md p-2 ${
                  isActive
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-600 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              onClick={signOut}
              to="/"
              className={({ isActive }) =>
                `block rounded-md p-2 ${
                  isActive
                    ? "bg-amber-600 text-white"
                    : "hover:bg-amber-600 hover:text-white"
                }`
              }
            >
              Logout
            </NavLink>
          </li>
        </nav>
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
