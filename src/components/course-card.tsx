import type { Course, Student } from "@/lib/types";
import { enrollments } from "@/lib/mock-data";

// import ui
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
};
import { Trash2 } from "lucide-react";

export function CourseCard({ course, student }: CourseCardProps) {
  const isEnrolled = enrollments.find((e) => e.studentId === student.studentId && course.courseId === e.courseId);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        </div>
          {(isEnrolled)? <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-purple-700 " > ลงทะเบียนแล้ว </Badge>
                      : <Badge className="bg-purple-50 text-purple-700 dark:bg-amber-950 dark:text-amber-300" > เปิดรับ </Badge>}
      </CardHeader>
      {(isEnrolled)?
      <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>
            ลงทะเบียนเมื่อ: {isEnrolled.enrolledAt
              ? new Date(isEnrolled.enrolledAt).toLocaleString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : null}
          </p>
        </div>
        <Button variant="ghost" >
          <Trash2 className="text-destructive" size="icon" />
        </Button>
      </CardContent>
      : null
    }
    </Card>
  );
}
