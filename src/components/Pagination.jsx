import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onFirst, onPrevious, onNext, onLast }) {
  return (
    <div className="mt-6 flex justify-center gap-2 flex-wrap items-center">
      <button
        onClick={onFirst}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 rounded"
      >
        <ChevronsLeft className="w-5 h-5" />
      </button>

      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 rounded"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="px-3 py-1 font-medium text-sm">
        Stránka {currentPage} z {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 rounded"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <button
        onClick={onLast}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 hover:bg-gray-100 rounded"
      >
        <ChevronsRight className="w-5 h-5" />
      </button>
    </div>
  );
}
