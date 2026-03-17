import { useState } from "react";

const Card = ({ elem, idx }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={elem.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block rounded-xl overflow-hidden relative cursor-pointer"
      style={{
        animationDelay: `${idx * 60}ms`,
        animation: "fadeUp 0.5s ease both",
      }}
    >
      <div className="aspect-square overflow-hidden bg-zinc-900">
        <img
          src={elem.download_url}
          alt={elem.author}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div
        className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent
        flex flex-col justify-end p-3 transition-opacity duration-300
        ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-amber-400 text-xs tracking-widest uppercase font-sans mb-1">
          {elem.id}
        </p>
        <h3
          className="text-white font-bold text-sm leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {elem.author}
        </h3>
        <span className="text-zinc-400 text-xs font-sans mt-1">
          {elem.width} x {elem.height}
        </span>
      </div>

      <div
        className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400
        transition-all duration-300 ${hovered ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </a>
  );
};

export default Card;
