import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#fafaf8]">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
