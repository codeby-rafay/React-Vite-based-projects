import { useEffect, useState } from "react";
import { Users, LogIn, UserPlus, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { toast, Slide } from "react-toastify";
import { DeleteRecordToast } from "../utils/toastUtils";
import axiosInstance from "../utils/axiosInstance";
import DeleteConfirmationModal from "../components/ModalComponents/DeleteConfirmationModal";

function AdminPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { currentUser } = useShop();
  const [loginData, setLoginData] = useState([]);
  const [signupData, setSignupData] = useState([]);
  const [googleloginData, setGoogleLoginData] = useState([]);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  const [errorSignup, setErrorSignup] = useState(null);
  const [errorGoogleLogin, setErrorGoogleLogin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'login' or 'signup'
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // get login data
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        setLoadingLogin(true);
        setErrorLogin(null);

        const response = await axiosInstance.get("/auth/login");
        const data = response.data;
        const formattedData = data.logins.map((record) => ({
          ...record,
          timestamp: formatDate(record.timestamp),
        }));
        setLoginData(formattedData);
      } catch (error) {
        console.error("Error fetching login data:", error);
        setErrorLogin(error.message);
      } finally {
        setLoadingLogin(false);
      }
    };

    fetchLoginData();
  }, []);

  // get signup data
  useEffect(() => {
    const fetchSignupData = async () => {
      try {
        setLoadingSignup(true);
        setErrorSignup(null);

        const response = await axiosInstance.get("/auth/signup");
        const data = response.data;
        const formattedData = data.signups.map((record) => ({
          ...record,
          createdAt: formatDate(record.createdAt),
        }));
        setSignupData(formattedData);
      } catch (error) {
        console.error("Error fetching signup data:", error);
        setErrorSignup(error.message);
      } finally {
        setLoadingSignup(false);
      }
    };

    fetchSignupData();
  }, []);

  const handleloginDelete = (id) => {
    setRecordToDelete(id);
    setDeleteType("login");
    setShowDeleteModal(true);
  };

  const handleSignupDelete = (id) => {
    setRecordToDelete(id);
    setDeleteType("signup");
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete || !deleteType) return;

    try {
      if (deleteType === "login") {
        await axiosInstance.delete(`/auth/login/${recordToDelete}`);

        // Refresh the login data after deletion
        const response = await axiosInstance.get("/auth/login");

        const data = response.data;
        const formattedData = data.logins.map((record) => ({
          ...record,
          timestamp: formatDate(record.timestamp),
        }));
        setLoginData(formattedData);
      } else if (deleteType === "signup") {
        await axiosInstance.delete(`/auth/signup/${recordToDelete}`);

        // Refresh the signup data after deletion
        const response = await axiosInstance.get("/auth/signup");

        const data = response.data;
        const formattedData = data.signups.map((record) => ({
          ...record,
          createdAt: formatDate(record.createdAt),
        }));
        setSignupData(formattedData);
      }
      DeleteRecordToast();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error(`Failed to delete ${deleteType} record. Please try again.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    } finally {
      setShowDeleteModal(false);
      setRecordToDelete(null);
      setDeleteType(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
    setDeleteType(null);
  };

  return (
    <div className="w-full bg-linear-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
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
                  {loadingLogin ? "..." : loginData.length}
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
                  {loadingSignup ? "..." : signupData.length}
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
              className={`flex-1 py-4 px-6 cursor-pointer font-semibold flex items-center justify-center gap-2 transition-all ${
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
              className={`flex-1 py-4 px-6 cursor-pointer font-semibold flex items-center justify-center gap-2 transition-all ${
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
              {loadingLogin ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading login records...</p>
                </div>
              ) : errorLogin ? (
                <div className="text-center py-12">
                  <p className="text-red-500">Error: {errorLogin}</p>
                </div>
              ) : loginData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No login records found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginData.map((record, index) => (
                      <tr
                        key={record._id}
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
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleloginDelete(record._id)}
                              title="Delete"
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 size={18} className="text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Signup Records Table */}
          {activeTab === "signup" && (
            <div className="overflow-x-auto">
              {loadingSignup ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading signup records...</p>
                </div>
              ) : errorSignup ? (
                <div className="text-center py-12">
                  <p className="text-red-500">Error: {errorSignup}</p>
                </div>
              ) : signupData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No signup records found</p>
                </div>
              ) : (
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
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {signupData.map((record, index) => (
                      <tr
                        key={record._id}
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
                          {record.createdAt}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleSignupDelete(record._id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={18} className="text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        showDeleteModal={showDeleteModal}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        title={
          deleteType === "login"
            ? "Delete Login Record"
            : "Delete Signup Record"
        }
        description={
          deleteType === "login"
            ? "Are you sure you want to delete this login record?"
            : "Are you sure you want to delete this signup record?"
        }
        buttonLabel="Delete"
      />
    </div>
  );
}
export default AdminPage;
