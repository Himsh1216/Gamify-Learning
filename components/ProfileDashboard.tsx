import React from "react";

interface ProfileDashboardProps {
  email: string;
  xp: number;
  streak: number;
}

export default function ProfileDashboard({ email, xp, streak }: ProfileDashboardProps) {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{email}</p>
      <p>XP: {xp}</p>
      <p>Streak: {streak} days</p>
    </div>
  );
}
