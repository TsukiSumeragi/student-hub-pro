import { create } from 'zustand';
import { allCourses, Course } from '@/data/courses-data';

interface CourseStore {
  courses: Course[];
  enrollCourse: (courseId: string) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: allCourses,
  enrollCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === courseId
          ? { ...c, enrolled: true, joined: new Date().toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) }
          : c
      ),
    })),
}));
