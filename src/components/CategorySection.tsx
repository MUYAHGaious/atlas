import { categories } from "@/data/categories";

const CategorySection = () => {
  return (
    <section id="categories" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">
          SHOP BY <span className="text-gradient-amber">BRAND</span>
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Select your truck brand to find the perfect fit
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={`/inventory?category=${encodeURIComponent(cat.label)}`}
              className="bg-gradient-card border border-border rounded-lg p-4 md:p-5 flex flex-col items-center gap-2 hover:border-primary/50 transition-all group shadow-card"
            >
              <cat.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-heading text-sm text-foreground">{cat.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
