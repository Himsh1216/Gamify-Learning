import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import ProfileDashboard from '../components/ProfileDashboard';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
      },
      (e) => {
        setError(e as Error);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

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
