import { useState } from "react";
import { Users, LogIn, UserPlus, Trash2, Eye } from "lucide-react";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("login");

  // Mock data for login records
  const loginData = [
    {
      id: 1,
      email: "john@example.com",
      timestamp: "2026-04-23 10:30 AM",
      status: "Success",
      ipAddress: "192.168.1.1",
    },
    {
      id: 2,
      email: "jane@example.com",
      timestamp: "2026-04-23 11:45 AM",
      status: "Success",
      ipAddress: "192.168.1.2",
    },
    {
      id: 3,
      email: "invalid@example.com",
      timestamp: "2026-04-23 12:00 PM",
      status: "Failed",
      ipAddress: "192.168.1.3",
    },
    {
      id: 4,
      email: "rafay@example.com",
      timestamp: "2026-04-23 02:15 PM",
      status: "Success",
      ipAddress: "192.168.1.4",
    },
  ];

  // Mock data for signup records
  const signupData = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      timestamp: "2026-04-20 08:30 AM",
      status: "Active",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      timestamp: "2026-04-21 09:15 AM",
      status: "Active",
    },
    {
      id: 3,
      fullName: "Rafay Khan",
      email: "rafay@example.com",
      timestamp: "2026-04-22 03:45 PM",
      status: "Active",
    },
    {
      id: 4,
      fullName: "Ahmed Ali",
      email: "ahmed@example.com",
      timestamp: "2026-04-23 11:20 AM",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Users className="text-white" size={32} />
            </div>
            <div>
              <h1
                className="text-4xl font-bold text-gray-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Manage login and signup records
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Logins
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loginData.length}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <LogIn className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Signups
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {signupData.length}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <UserPlus className="text-green-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "login"
                  ? "text-orange-600 bg-orange-50 border-b-2 border-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LogIn size={20} />
              Login Records
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === "signup"
                  ? "text-orange-600 bg-orange-50 border-b-2 border-orange-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <UserPlus size={20} />
              Signup Records
            </button>
          </div>

          {/* Login Records Table */}
          {activeTab === "login" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      IP Address
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loginData.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {record.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            record.status === "Success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.ipAddress}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <Eye size={18} className="text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Signup Records Table */}
          {activeTab === "signup" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Full Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Signup Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {signupData.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {record.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {record.timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            record.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                            <Eye size={18} className="text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Empty State Message */}
        {(activeTab === "login" ? loginData : signupData).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default AdminPage;
