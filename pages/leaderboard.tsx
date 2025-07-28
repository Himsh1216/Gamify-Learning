import Leaderboard, { LeaderboardEntry } from '../components/Leaderboard';

const entries: LeaderboardEntry[] = [
  { userId: '1', displayName: 'Alice', xp: 1200 },
  { userId: '2', displayName: 'Bob', xp: 950 },
];

export default function LeaderboardPage() {
  return (
    <div>
      <h1>Leaderboard</h1>
      <Leaderboard entries={entries} />
    </div>
  );
}
