import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import CommentList from "./CommentList";


export default function PostForm({formType, postId = 0 , onSubmit, buttonText, API_URL}){
    const form = useForm();
    const { register, handleSubmit, formState: { errors }, reset } = form;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pokud jde o editaci, načti data
    useEffect(() => {
        if (formType === "edit" && postId !== "0")
        {
            axios
            .get(`${API_URL}/posts/${postId}`)
            .then((res) => {
                reset({
                    title: res.data.title,
                    text: res.data.text,
                });
            })
            .catch(() =>
                setError("Chyba při načítání příspěvku k úpravě!")
            )
            .finally(() => setLoading(false));
        }
        else if(formType === "edit")
        {
            setError("Příspěvek nenalezen!");
        }
    }, [formType, postId, reset, API_URL]);

    //Loader
    if (loading && formType === "edit") 
        return <Loader text="Načítání detailů..." />;

    //Zobrazení chyb
    if (error !== "")
        return <Error text={error} />;

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
            <div>
                <label className="block font-medium mb-1">Nadpis</label>
                <input 
                    {...register("title", {
                        required: "Zadejte název příspěvku!",
                        validate: (value) =>
                        value.length > 2 || "Název musí mít více než 2 znaky",
                    })}
                    className="w-full border p-2 rounded"
                    placeholder="Zadejte název příspěvku"
                >
                </input>
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="block font-medium mb-1">Text</label>
                <textarea
                    {...register("text", {
                        required: "Zadejte text příspěvku!",
                        minLength: {
                            value: 5,
                            message: "Text musí mít alespoň 5 znaků",
                        },
                        maxLength: {
                            value: 1000,
                            message: "Text nesmí mít více než 1000 znaků"
                        }
                    })}
                    className="w-full border p-2 rounded max-h-64"
                    placeholder="Zde zadejte text"
                    rows={6}
                />
                {errors.text && (
                <p className="text-red-500 text-sm">{errors.text.message}</p>
                )}
            </div>

            {formType === "edit" && (
                <CommentList postId={postId} API_URL={API_URL} />
            )}
            
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
}