import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Users", icon: User },
  { name: "Reports", icon: FileText },
  { name: "Analytics", icon: BarChart3 },
  { name: "Notifications", icon: Bell },
  { name: "Settings", icon: Settings },
];

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 750 },
  { name: "May", users: 900 },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarShrink, setSidebarShrink] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden md:block"
        } ${
          sidebarShrink ? "w-20" : "w-64"
        } bg-white shadow-md fixed md:relative z-20 transition-all duration-300`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <button onClick={() => setSidebarShrink(!sidebarShrink)}>
            {sidebarShrink ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <div className="flex flex-col items-center py-4">
          <img
            src="data:image/jpeg;base64,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"
            alt="Company Logo"
          className="w-16 h-16 rounded-full mb-2 border border-gray-300 shadow-md cursor-pointer"
          />
          {!sidebarShrink && <span className="font-semibold">Super Admin</span>}
        </div>
        <nav className="mt-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              <item.icon className="w-5 h-5" />
              {!sidebarShrink && <span className="ml-3">{item.name}</span>}
            </div>
          ))}
          <div className="flex items-center px-4 py-3 text-red-600 hover:bg-red-100 cursor-pointer">
            <LogOut className="w-5 h-5" />
            {!sidebarShrink && <span className="ml-3">Logout</span>}
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarShrink ? "md:ml-20" : "md:ml-64"
      } ml-0 pt-0 md:px-6 px-4`}>
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </header>

        <main className="py-6">
          <h2 className="text-2xl font-bold mb-4">Welcome Back, Admin!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow cursor-pointer">
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-2xl font-bold mt-2">1,204</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-2xl font-bold mt-2">$53,000</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Signups</h3>
              <p className="text-2xl font-bold mt-2">320</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Performance</h3>
              <p className="text-2xl font-bold mt-2">87%</p>
            </div>
          </div>

          {/* Graph section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
