import { categories } from "@/data/categories";

const CategorySection = () => {
  return (
    <section id="categories" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">
          EXPLORE <span className="text-gradient-amber">CATEGORIES</span>
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Select a category to find the perfect bed or service body
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={`/inventory?category=${encodeURIComponent(cat.label)}`}
              className="bg-gradient-card border border-border rounded-lg p-5 flex flex-col items-center gap-3 hover:border-primary/50 transition-all group shadow-card text-center"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <cat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-heading text-xs md:text-sm font-bold text-foreground tracking-wide uppercase">{cat.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
