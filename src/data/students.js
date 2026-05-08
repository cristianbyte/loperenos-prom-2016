export const STUDENTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Estudiante ${String(i + 1).padStart(2, '0')}`,
  photo: `https://picsum.photos/seed/yr${i + 1}/480/640`,
}));
