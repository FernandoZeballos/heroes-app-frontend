import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="bg-blue-600">
      <Outlet />
    </div>
  );
};
