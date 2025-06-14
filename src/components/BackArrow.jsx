import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackArrow() {
  return (
    <div className="absolute top-4 left-4">
      <Link
        to="/"
        className="flex items-center text-blue-500 hover:text-blue-700 gap-1"
      >
        <ArrowLeft />
        <span className="hidden text-lg sm:inline">Zpět</span>
      </Link>
    </div>
  );
}
