import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function CommentList({ postId, API_URL }){
    const [comments, setComments] = useState([]);

    //Načte komentáře z API do proměnné comments
    useEffect(() => {
        axios
        .get(`${API_URL}/comments`, {
            params: {
            postId: postId, // filtrujeme dle id příspěvku
            },
        })
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Chyba při načítání komentářů:", err));
    }, [postId, API_URL]);

    //Funkce pro odstranění komentáře
    const handleDelete = async (commentId) => {
        try 
        {
            await axios.delete(`${API_URL}/comments/${commentId}`);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        }
        catch (error) 
        {
            console.error("Chyba při mazání komentáře:", error);
        }
    };


    return (
  <>
    <h2 className="font-medium">Komentáře k příspěvku</h2>

    
    {(comments.length === 0) ? (
        <p className="text-sm text-gray-500 text-center mt-2">
            Nebyly nalezeny žádné komentáře k tomuto příspěvku.
        </p>
    ) : (
        <ul className="w-full max-h-[500px] overflow-y-auto  divide-y border-y text-sm mt-4">
            {/* Hlavička – zobrazí se jen na větších obrazovkách */}
            <li className="hidden sm:grid sm:grid-cols-[2fr_3fr_4fr_1fr] gap-4 py-2 px-2 font-semibold text-gray-600">
                <span>Jméno</span>
                <span>E-mail</span>
                <span>Text</span>
                <span></span>
            </li>

            {/* Komentáře */}
            {comments.map((comment) => (
                <li
                    key={comment.id}
                    className="flex flex-col sm:grid sm:grid-cols-[2fr_3fr_4fr_1fr] gap-2 sm:gap-4 items-start sm:items-center py-3 px-2 hover:bg-gray-50"
                >
                    <div className="sm:truncate">
                        <span className="font-semibold sm:hidden">Jméno: </span>
                        {comment.username}
                    </div>

                    <div className="sm:truncate break-all">
                        <span className="font-semibold sm:hidden">E-mail: </span>
                        {comment.email}
                    </div>

                    <div className="sm:truncate break-words">
                        <span className="font-semibold sm:hidden">Text: </span>
                        {comment.text}
                    </div>

                    <div className="sm:flex justify-center w-full sm:w-auto">
                        <button
                            onClick={() => handleDelete(comment.id)}
                            className="flex justify-center w-full text-blue-400 hover:text-blue-700"
                        >
                            <Trash2 />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )}
  </>
);

}