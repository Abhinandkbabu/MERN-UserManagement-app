import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getUser', {
          withCredentials: true, // Ensure cookies are sent with the request if needed
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1">
      <h1 className="text-2xl font-semibold">Admin Home</h1>
      <div className="w-full max-w-4xl border border-gray-300 rounded-md p-4">
        {users.length > 0 ? (
          users.map((data) => <UserList user={data} key={data._id} />)
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
