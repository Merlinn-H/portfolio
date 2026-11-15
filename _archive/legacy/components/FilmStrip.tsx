export default function FilmStrip({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} w-7 flex flex-col justify-around py-2 opacity-15 pointer-events-none`}
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="w-4 h-3 border border-white/50 mx-auto rounded-[2px]" />
      ))}
    </div>
  );
}
