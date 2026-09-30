import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const features = [
  { icon: "🔍", title: "Powerful Search", desc: "Find any movie or TV show instantly." },
  { icon: "🎭", title: "Rich Details", desc: "Cast, ratings, genres, summaries & more." },
  { icon: "📱", title: "Fully Responsive", desc: "Perfect on mobile, tablet & desktop." },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why <span className="text-primary">MovieExplorer</span>?
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-primary text-center"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/movies"
            className="inline-block px-8 py-3 bg-primary hover:bg-red-700 rounded-lg font-semibold"
          >
            Start Exploring →
          </Link>
        </div>
      </section>
    </main>
  );
}