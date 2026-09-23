type FooterProps ={
    year: string,
    fullName: string,
    studentId: string,
}

export default function Footer({ year, fullName, studentId }: FooterProps) {
  return (
    <footer className="w-full text-center">
      <p className="border p-2 text-muted-foreground text-xs">
        Copyright © {year} {fullName} {studentId}
      </p>
    </footer>
  );
}