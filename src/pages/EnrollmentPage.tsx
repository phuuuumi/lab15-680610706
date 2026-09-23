import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent } from "@/lib/mock-data";
import { useState } from "react";

export default function Enrollent() {
  const [, setRefresh] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-muted-foreground text-xs">{currentStudent.firstName} {currentStudent.lastName} ({currentStudent.studentId})</p>
        </div>
          <RegisterDialog onRegistered={() => setRefresh((value) => value + 1)} />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={course.courseId}
            onRemoved={() => setRefresh((value) => value + 1)}
          />
        ))}
      </div>
    </div>
  );
}
