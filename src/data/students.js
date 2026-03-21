export const STUDENTS = Array.from({ length: 50 }, (_, i) => ({
  id:    i + 1,
  name:  `Estudiante ${String(i + 1).padStart(2, '0')}`,
  photo: null,
  type:  i < 32 ? 'confirmed' : i < 45 ? 'pending' : i < 48 ? 'default' : 'empty',
}));