"use client";
import React, { useState } from "react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);

  const handleAnswer = (option: string) => {
    if (questions[current].answer === option) {
      setCorrect((c) => c + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      onComplete(correct + (questions[current].answer === option ? 1 : 0));
    }
  };

  const q = questions[current];

  return (
    <div className="space-y-4">
      <h3>{q.question}</h3>
      <div className="flex flex-col gap-2">
        {q.options.map((o) => (
          <button
            key={o}
            onClick={() => handleAnswer(o)}
            className="p-2 border rounded"
          >
            {o}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Question {current + 1} of {questions.length}
      </p>
    </div>
  );
}
