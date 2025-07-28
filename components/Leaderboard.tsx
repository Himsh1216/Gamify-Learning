import React from "react";

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  xp: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <table className="min-w-full text-left border">
      <thead>
        <tr>
          <th className="p-2 border">User</th>
          <th className="p-2 border">XP</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.userId}>
            <td className="p-2 border">{e.displayName}</td>
            <td className="p-2 border">{e.xp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
