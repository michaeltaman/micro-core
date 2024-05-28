import { CoursesList } from "@/features/courses-list/pub/courses-list";
import { CreateCourseForm } from "@/features/courses-list/pub/create-course-form";
import { PrismaClient } from "@prisma/client";
import "./globals.css";

const client = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

export default async function Home() {

  const courses = await client.course.findMany();

  console.log(courses);

  return (
    <main className="flex min-h-screen flex-col p-8">
     <h1 className="courseTitleStyle">Courses</h1>
      <CreateCourseForm revalidatePagePath="/" className="max-w-{300px} mb-10"/>
      <CoursesList revalidatePagePath="/" />
    </main>
  );
}
