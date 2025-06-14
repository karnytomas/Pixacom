import { useState } from "react";
import PostForm from "../components/PostForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import BackArrow from "../components/BackArrow";
import SuccessMessage from "../components/SuccessMessage";


export default function PostNew({ API_URL }){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    //Funkce volaná po odeslání formuláře
    const onSubmit = async (data) => {
      try 
      {
        setIsSubmitting(true); // zobrazit loader
        await axios.post(`${API_URL}/posts/`, data);
        setSuccess(true); // Zobrazit hlášku

        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 2000); // Po 2s přesměrování na seznam příspěvků
      }
      catch (error) 
      {
        console.error("Chyba při vytváření příspěvku:", error);
        alert("Nepodařilo se vytvořit příspěvek.");
      } 
      finally 
      {
        setIsSubmitting(false); // schovat loader
      }
    };

    return(
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BackArrow />
        {success && <SuccessMessage text={"Příspěvek byl úspěšně vytvořen!"} />}
        <h1 className="text-2xl text-blue-400 font-bold text-center mb-16">Vytvořit příspěvek</h1>
        {isSubmitting && <Loader text={"Probíhá vytváření příspěvku"} />}
        <PostForm
          formType={"add"}
          onSubmit={onSubmit}
          buttonText={"Vytvořit"}
          API_URL={API_URL}
        />
      </div>
    );
}
