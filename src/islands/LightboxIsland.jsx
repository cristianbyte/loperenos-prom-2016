import { useEffect, useState } from 'preact/hooks';

function getEventIndex(detail, total) {
  if (!detail || typeof detail.index !== 'number') {
    return null;
  }

  return ((detail.index % total) + total) % total;
}

export default function LightboxIsland({ students }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const currentStudent = currentIndex === null ? null : students[currentIndex];

  useEffect(() => {
    const handleOpen = (event) => {
      const nextIndex = getEventIndex(event.detail, students.length);

      if (nextIndex !== null) {
        setCurrentIndex(nextIndex);
      }
    };

    const handleKeydown = (event) => {
      if (currentIndex === null) {
        return;
      }

      if (event.key === 'Escape') {
        setCurrentIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setCurrentIndex((index) => (index + 1) % students.length);
      }

      if (event.key === 'ArrowLeft') {
        setCurrentIndex((index) => (index - 1 + students.length) % students.length);
      }
    };

    window.addEventListener('student:open', handleOpen);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('student:open', handleOpen);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [currentIndex, students.length]);

  if (!currentStudent) {
    return null;
  }

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={() => setCurrentIndex(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto de ${currentStudent.name}`}
    >
      <div class="relative w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          class="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#3b1f0e] text-white shadow-md transition hover:bg-[#5c3317]"
          onClick={() => setCurrentIndex(null)}
          aria-label="Cerrar visor"
        >
          ✕
        </button>

        <button
          type="button"
          class="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#3b1f0e]/80 text-white transition hover:bg-[#3b1f0e] sm:-left-12"
          onClick={() => setCurrentIndex((index) => (index - 1 + students.length) % students.length)}
          aria-label="Foto anterior"
        >
          ←
        </button>

        <article class="overflow-hidden rounded-sm bg-[#f7f0e6] p-2 shadow-2xl">
          {currentStudent.photo ? (
            <img
              src={currentStudent.photo}
              alt={currentStudent.name}
              class="aspect-[3/4] w-full object-cover sepia-[0.12]"
            />
          ) : (
            <div class="flex aspect-[3/4] items-center justify-center bg-[#ddd0b8] text-sm text-[#5c3317]/70">
              Sin foto
            </div>
          )}

          <div class="px-2 pb-1 pt-3 text-center">
            <p class="truncate text-base text-[#3b1f0e]">{currentStudent.name}</p>
            <p class="mt-1 text-xs uppercase tracking-[0.3em] text-[#5c3317]/60">
              {currentIndex + 1} / {students.length}
            </p>
          </div>
        </article>

        <button
          type="button"
          class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#3b1f0e]/80 text-white transition hover:bg-[#3b1f0e] sm:-right-12"
          onClick={() => setCurrentIndex((index) => (index + 1) % students.length)}
          aria-label="Foto siguiente"
        >
          →
        </button>
      </div>
    </div>
  );
}
