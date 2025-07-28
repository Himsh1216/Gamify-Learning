import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import ProfileDashboard from '../components/ProfileDashboard';

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
      <ProfileDashboard email={user.email!} xp={0} streak={0} />
    </div>
  );
};

export default Profile;
