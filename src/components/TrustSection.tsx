import { ShieldCheck, Truck, Phone, Star } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Every bed inspected for structural integrity before listing.",
  },
  {
    icon: Truck,
    title: "Nationwide Shipping",
    desc: "We ship truck beds across all 50 states. Call for a freight quote.",
  },
  {
    icon: Phone,
    title: "Talk to a Real Person",
    desc: "No bots, no forms. Call us directly to negotiate and buy.",
  },
  {
    icon: Star,
    title: "Trusted by Pros",
    desc: "Contractors, fleet owners, and mechanics rely on Atlas daily.",
  },
];

const TrustSection = () => {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">
          WHY <span className="text-gradient-amber">ATLAS?</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 text-sm max-w-md mx-auto">
          We're the no-nonsense truck bed marketplace. Real inventory, real people, real deals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gradient-card border border-border rounded-lg p-5 text-center shadow-card"
            >
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-base text-foreground mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
