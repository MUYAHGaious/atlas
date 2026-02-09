import { Wrench, Truck, Shield, Package, Layers, Settings } from "lucide-react";

const categories = [
  { icon: Truck, label: "Flatbeds", count: 24 },
  { icon: Wrench, label: "Utility Beds", count: 18 },
  { icon: Shield, label: "Service Bodies", count: 12 },
  { icon: Package, label: "Dump Inserts", count: 8 },
  { icon: Layers, label: "Stake Beds", count: 6 },
  { icon: Settings, label: "Custom Beds", count: 4 },
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">
          SHOP BY <span className="text-gradient-amber">CATEGORY</span>
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Every type of truck bed — new and used
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href="#inventory"
              className="bg-gradient-card border border-border rounded-lg p-4 md:p-5 flex flex-col items-center gap-2 hover:border-primary/50 transition-all group shadow-card"
            >
              <cat.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-heading text-sm text-foreground">{cat.label}</span>
              <span className="text-xs text-muted-foreground">{cat.count} listings</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
