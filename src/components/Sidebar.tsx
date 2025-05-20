'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaCog, FaHome, FaAddressBook } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const linkClass = (path: string) =>
    `flex items-center space-x-2 p-3 rounded-md transition-colors ${
      isActive(path)
        ? "bg-cyan-100 text-cyan-600"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="bg-slate-100 min-h-screen p-4 rounded-xl">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <FaHome className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/skill"
            className={linkClass("/dashboard/skill")}
          >
            <GiSkills className="h-5 w-5" />
            <span>Skills</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/project"
            className={linkClass("/dashboard/project")}
          >
            <FaAddressBook className="h-5 w-5" />
            <span>Projects</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/experience"
            className={linkClass("/dashboard/experience")}
          >
            <FaMessage className="h-5 w-5" />
            <span>Experience</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/userInfo"
            className={linkClass("/dashboard/userInfo")}
          >
            <FaUser className="h-5 w-5" />
            <span>User Info</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/settings"
            className={linkClass("/dashboard/settings")}
          >
            <FaCog className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;