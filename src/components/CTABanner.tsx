import { Phone } from "lucide-react";

const CTABanner = () => (
  <section className="py-10 md:py-14 bg-primary">
    <div className="container text-center">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-2">
        READY TO FIND YOUR TRUCK BED?
      </h2>
      <p className="text-primary-foreground/80 mb-6 text-sm max-w-md mx-auto">
        Skip the checkout — call us now to negotiate the best price and get your truck bed shipped fast.
      </p>
      <a
        href="tel:+18254184823"
        className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3.5 rounded font-heading font-bold text-lg hover:opacity-90 transition-opacity"
      >
        <Phone className="w-5 h-5" />
        (825) 418-4823
      </a>
    </div>
  </section>
);

export default CTABanner;
