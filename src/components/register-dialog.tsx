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

import { UserPlus } from 'lucide-react';


// import data
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

export function RegisterDialog() {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");


  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    alert(courseId);
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>
          <UserPlus/>
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                defaultValue={new Date().toTimeString().slice(0, 5)}
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
