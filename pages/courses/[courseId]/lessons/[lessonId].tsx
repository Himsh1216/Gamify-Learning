import Quiz, { QuizQuestion } from '../../../../components/Quiz';

const questions: QuizQuestion[] = [
  { id: 'q1', question: 'Hello in Spanish?', options: ['Hola', 'Adios'], answer: 'Hola' },
  { id: 'q2', question: 'Thank you in French?', options: ['Merci', 'Gracias'], answer: 'Merci' },
];

export default function LessonPage() {
  const handleComplete = (score: number) => {
    alert(`Score: ${score}/${questions.length}`);
  };

  return (
    <div>
      <h1>Lesson</h1>
      <Quiz questions={questions} onComplete={handleComplete} />
    </div>
  );
}
