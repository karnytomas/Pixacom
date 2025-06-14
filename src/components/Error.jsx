export default function Error({ text = "Něco se pokazilo! ☺" }) {
  return (
    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl text-red-500 text-center">
      {text}
    </p>
  );
}
