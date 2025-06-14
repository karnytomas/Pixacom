import { CheckCircle } from "lucide-react";

export default function SuccessMessage({ text }){
    return(
        <div className="flex items-center justify-center gap-2 mb-4 text-green-600 font-semibold bg-green-100 px-4 py-2 rounded">
            <CheckCircle className="w-5 h-5" />
            <span>{text}</span>
        </div>
    );
}