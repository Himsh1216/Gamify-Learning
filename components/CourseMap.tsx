"use client";
import React from "react";

export interface LessonNode {
  id: string;
  title: string;
  unlocked: boolean;
}

interface CourseMapProps {
  lessons: LessonNode[];
  onSelect: (id: string) => void;
}

export default function CourseMap({ lessons, onSelect }: CourseMapProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          disabled={!lesson.unlocked}
          className="p-4 border rounded disabled:opacity-50"
          onClick={() => onSelect(lesson.id)}
        >
          {lesson.title}
        </button>
      ))}
    </div>
  );
}
