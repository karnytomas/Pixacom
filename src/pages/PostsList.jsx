import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "./../components/Post";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";


export default function PostsList({ API_URL }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; //Počet příspěvků na stránku

  //Funkce pro smazání příspěvku
  const handleDelete = async (id) => {
    try 
    {
        await axios.delete(`${API_URL}/posts/${id}`);
        setPosts((prev) => prev.filter((post) => post.id !== id));
    } 
    catch (error) 
    {
        console.error("Chyba při mazání:", error);
    }
  };

  //výpočet totalPages
  useEffect(() => {
    const fetchTotal = async () => {
      try 
      {
        const res = await axios.get(`${API_URL}/posts`);
        const totalCount = res.data.length;
        setTotalPages(Math.ceil(totalCount / limit));
      }
      catch (error)
      {
        console.error("Chyba při zjišťování celkového počtu:", error);
      }
    };
    fetchTotal();
  }, [API_URL]);

  // Načtení příspěvků pro aktuální stránku
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/posts`, {
        params: {
          page: currentPage,
          limit: limit,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Chyba při načítání příspěvků:", err))
      .finally(() => setLoading(false));
  }, [currentPage, API_URL]);

  //Před načtením dat se zobrazí Loader
  if (loading)
    return (
        <Loader text={"Načítání příspěvků..."} />
    );

  //Funkce pro stránkování
  const goToFirst = () => setCurrentPage(1);
  const goToPrevious = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goToLast = () => setCurrentPage(totalPages);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-2xl text-blue-400 font-bold">Příspěvky</h1>
          <Link to={`/posts/new`} >
            <button className="border border-blue-400 text-blue-400 px-4 py-1 rounded hover:bg-blue-100">
              + Nový
            </button>
          </Link>
      </div>

      <ul className="w-full">
        {/* Hlavička */}
        <li className="grid grid-cols-[4fr_2fr_2fr] sm:grid-cols-[2fr_6fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-600 border-b py-2 px-2">
          <span>Nadpis</span>
          <span className="hidden sm:block">Text</span>
          <span className="text-center">Detail</span>
          <span className="text-center">Smazat</span>
        </li>

        {/* Příspěvky */}
        {posts.map((post) => (
            <Post 
                key={post.id} 
                title={post.title} 
                text={post.text} 
                postId={post.id}
                onDelete={handleDelete}
            />
        ))}
      </ul>

      {/* Stránkování */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onFirst={goToFirst}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onLast={goToLast}
      />
    </div>
  );
}
