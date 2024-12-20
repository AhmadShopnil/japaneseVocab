import { SkeletonItemCard } from "@/components/Skeleton/SkeletonItemCard";
import { SkeletonTable } from "@/components/Skeleton/SkeletonTable";
import Spinner from "@/components/Spinner/Spinner";
import { TUserResponse } from "@/interfaces";
import {
  useChangeUserRoleMutation,
  useGetAllUsersQuery,
} from "@/redux/api/userApi";
import { useState } from "react";

const UserManagement = () => {
  const [changeUserRole] = useChangeUserRoleMutation();
  const { data: users, isLoading, isError } = useGetAllUsersQuery("");
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleRoleChange = async (
    userId: string,
    newRole: "user" | "admin"
  ) => {
    setLoadingUserId(userId);
    try {
      await changeUserRole({ userId, role: newRole }).unwrap();
    } finally {
      setLoadingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="hidden lg:block">
          <SkeletonTable />
        </div>
        <div className="lg:hidden">
          <SkeletonItemCard />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load users. Please try again later.
      </p>
    );
  }

  if (users?.data?.length == 0) {
    return <p className="text-center text-gray-600">No users found.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">User Management</h2>

      {/* Table for larger screens */}
      <div className="hidden lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user: TUserResponse) => (
              <tr key={user._id} className="border">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center"
                    >
                      {loadingUserId === user._id ? (
                        <Spinner />
                      ) : (
                        "Promote to Admin"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user._id, "user")}
                      className="bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center"
                    >
                      {loadingUserId === user._id ? (
                        <Spinner />
                      ) : (
                        "Demote to User"
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for smaller screens */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users?.data?.map((user: TUserResponse) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>

            <div className="mt-4">
              {user.role === "user" ? (
                <button
                  onClick={() => handleRoleChange(user._id, "admin")}
                  className="bg-blue-500 text-white px-3 py-2 rounded flex items-center justify-center"
                >
                  {loadingUserId === user._id ? (
                    <Spinner />
                  ) : (
                    "Promote to Admin"
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleRoleChange(user._id, "user")}
                  className="bg-red-500 text-white px-3 py-2 rounded flex items-center justify-center"
                >
                  {loadingUserId === user._id ? <Spinner /> : "Demote to User"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
