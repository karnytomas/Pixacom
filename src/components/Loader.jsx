export default function Loader({ text }){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-gray-600">{text}</p>
        </div>
    );
}