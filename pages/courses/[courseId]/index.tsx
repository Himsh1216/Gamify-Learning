import CourseMap, { LessonNode } from '../../../components/CourseMap';

const mockLessons: LessonNode[] = [
  { id: '1', title: 'Intro', unlocked: true },
  { id: '2', title: 'Basics', unlocked: false },
];

export default function CourseMapPage() {
  const handleSelect = (id: string) => {
    // TODO: integrate with router
    console.log('Selected lesson', id);
  };

  return (
    <div>
      <h1>Course Map</h1>
      <CourseMap lessons={mockLessons} onSelect={handleSelect} />
    </div>
  );
}
