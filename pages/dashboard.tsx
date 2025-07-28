import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <p>Please login to view this page.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      {/* Add dashboard content here */}
    </div>
  );
};

export default Dashboard;
