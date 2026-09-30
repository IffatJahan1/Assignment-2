export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie or TV show..."
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-primary hover:bg-red-700 rounded-lg font-semibold"
      >
        Search
      </button>
    </form>
  );
}