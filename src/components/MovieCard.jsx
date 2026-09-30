export default function MovieCard({ movie, onClick }) {
  const image =
    movie.image?.medium ||
    "https://via.placeholder.com/210x295/1a1a1a/666666?text=No+Image";

  return (
    <div
      onClick={() => onClick(movie)}
      className="group cursor-pointer bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={movie.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        {movie.rating?.average && (
          <span className="absolute top-2 right-2 bg-black/80 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
            ★ {movie.rating.average}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary">
          {movie.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {movie.premiered?.slice(0, 4) || "N/A"} •{" "}
          {movie.genres?.slice(0, 2).join(", ") || "Unknown"}
        </p>
      </div>
    </div>
  );
}