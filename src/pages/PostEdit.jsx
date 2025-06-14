import { useParams } from "react-router-dom";
import { useState } from "react";
import PostForm from "../components/PostForm";
import axios from "axios";
import Loader from "../components/Loader";
import BackArrow from "../components/BackArrow";
import SuccessMessage from "../components/SuccessMessage";


export default function PostEdit({ API_URL }){
    const { postId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    //Funkce volaná po odeslání formuláře
    const onSubmit = async (data) => {
      try 
      {
        setIsSubmitting(true); // zobrazit loader
        await axios.put(`${API_URL}/posts/${postId}`, data);
        setSuccess(true); // Zobrazit hlášku

        setTimeout(() => {
          setSuccess(false);
        }, 2000); // Po 2s zmizí hláška
      }
      catch (error) 
      {
        console.error("Chyba při ukládání změn:", error);
        alert("Nepodařilo se uložit změny.");
      } 
      finally 
      {
        setIsSubmitting(false); // schovat loader
      }
    };

    return(
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BackArrow />
        {success && <SuccessMessage text={"Příspěvek byl úspěšně upraven!"} />}
        <h1 className="text-2xl text-blue-400 font-bold text-center">Upravit příspěvek</h1>
        {isSubmitting && <Loader text={"Probíhá úprava příspěvku"} />}
        <PostForm
          formType={"edit"}
          postId={postId}
          onSubmit={onSubmit}
          buttonText={"Uložit"}
          API_URL={API_URL}
        />
      </div>
    );
}