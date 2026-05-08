function openLightbox(student, index) {
  window.dispatchEvent(
    new CustomEvent('student:open', {
      detail: { student, index },
    }),
  );
}

export default function StudentCard({ student, index }) {
  return (
    <button
      type="button"
      class="group flex w-full flex-col gap-2 text-left"
      onClick={() => openLightbox(student, index)}
      aria-label={`Abrir foto de ${student.name}`}
    >
      <span class="relative block aspect-[3/4] overflow-hidden rounded-sm border border-[#5c3317]/25 bg-[#f7f0e6] shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg group-focus-visible:-translate-y-0.5 group-focus-visible:shadow-lg">
        {student.photo ? (
          <img
            src={student.photo}
            alt={student.name}
            loading="lazy"
            class="h-full w-full object-cover sepia-[0.22] transition duration-200 group-hover:sepia-0"
          />
        ) : (
          <span class="absolute inset-0 flex items-center justify-center text-[#5c3317]/40">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="17" r="9" stroke="currentColor" strokeWidth="3" />
              <path d="M5 44c0-10.5 8.5-19 19-19s19 8.5 19 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </span>
      <span class="block truncate text-center text-xs text-[#3b1f0e] sm:text-sm">
        {student.name}
      </span>
    </button>
  );
}
