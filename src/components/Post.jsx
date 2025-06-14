import { Eye, Trash2 } from "lucide-react"; // ikonky
import { Link } from "react-router-dom";

export default function Post({ title, text, postId, onDelete }) {
  return (
    <li className="grid grid-cols-[4fr_2fr_2fr] sm:grid-cols-[2fr_6fr_1fr_1fr] gap-4 items-center py-3 px-2 border-b text-sm hover:bg-gray-50">
        <span className="truncate">{title}</span> {/* truncate pro ..., pokud se tam text nevleze */}
        <span className="truncate hidden sm:block">{text}</span>
        <span className="flex justify-center">
            <Link
                to={`/posts/${postId}`}
                className="text-blue-400 hover:text-blue-700"
            >
                <Eye />
            </Link>
        </span>
        <span className="flex justify-center">
            <button 
              className="text-red-400 hover:text-red-700"
              onClick={() => onDelete(postId)}
            >
                <Trash2 />
            </button>
        </span>
    </li>
  );
}
