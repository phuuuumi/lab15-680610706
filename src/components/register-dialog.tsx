import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// import icon
import { UserPlus } from 'lucide-react';

// import data
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

type RegisterDialogProps = {
  onRegistered?: () => void;
};

export function RegisterDialog({ onRegistered }: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [enrolledAt, setEnrolledAt] = useState(
    new Date().toTimeString().slice(0, 5),
  );

  function resetForm() {
    setCourseId("");
    setEnrolledAt(new Date().toTimeString().slice(0, 5));
    setFormKey((key) => key + 1);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload

    const selectedCourseId = courseId.split(" - ")[0];
    if (!selectedCourseId || enrollments.some(
      (enrollment) =>
        enrollment.studentId === currentStudent.studentId &&
        enrollment.courseId === selectedCourseId,
    )) {
      return;
    }

    const enrollmentDate = new Date();
    const [hours, minutes] = enrolledAt.split(":").map(Number);
    enrollmentDate.setHours(hours, minutes, 0, 0);
    enrollments.push({
      studentId: currentStudent.studentId,
      courseId: selectedCourseId,
      enrolledAt: enrollmentDate.toISOString(),
    });
    currentStudent.courses = [
      ...(currentStudent.courses ?? []),
      selectedCourseId,
    ];

    resetForm();
    setOpen(false); // ปิด Dialog
    onRegistered?.();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          resetForm();
        }
      }}
    >
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>
          <UserPlus/>
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="studentId">วิชา</Label>
            <Select
              value={courseId}
              onValueChange={(value) => setCourseId(String(value))}
            >
              <SelectTrigger className="w-full overflow-hidden">
                <SelectValue placeholder="เลือกวิชา" className="w-0" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="h-auto">
                  {courses.map((c) => (
                    enrollments.findIndex((e) => e.courseId === c.courseId && currentStudent.studentId === e.studentId) === -1 
                    && <SelectItem
                      key={c.courseId}
                      value={c.courseId + " - " + c.courseTitle}
                    >
                      <span className="whitespace-normal">
                        {c.courseId} - {c.courseTitle}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-input">เวลา</Label>
              <Input
                id="time-input"
                type="time"
                value={enrolledAt}
                onChange={(event) => setEnrolledAt(event.target.value)}
              />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input id="fullName" value={currentStudent.firstName + " " + currentStudent.lastName} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">โปรแกรม</Label>
            <Input id="courseId" defaultValue={currentStudent.program} readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={courseId === ""}>
              ยืนยัน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
