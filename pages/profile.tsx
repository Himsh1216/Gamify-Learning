import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const Profile = () => {
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
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      {/* Add profile details and options here */}
    </div>
  );
};

export default Profile;
