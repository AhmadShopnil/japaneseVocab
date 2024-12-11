import { useState, useEffect } from "react";
import { User } from "../../types";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from API

    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId: string,
    newRole: "user" | "admin"
  ) => {
    // Update user role in API

    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    if (response.ok) {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } else {
      alert("Failed to update user role");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
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
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                {user.role === "user" ? (
                  <button
                    onClick={() => handleRoleChange(user.id, "admin")}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Promote to Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user.id, "user")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Demote to User
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
