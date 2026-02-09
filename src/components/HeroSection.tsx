import { Phone, Search } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import heroMobile from "@/assets/hero-mobile.png";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroImage}
            alt="Heavy-duty flatbed truck bed"
            className="w-full h-full object-cover object-[65%_center] md:object-[center_55%]"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </motion.div>

      {/* Content */}
      <div className="relative container pb-10 pt-20 md:pb-16">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-heading text-sm tracking-[0.25em] mb-3"
          >
            NEW & USED TRUCK BEDS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-4"
          >
            FIND YOUR <br />
            <span className="text-gradient-amber">PERFECT BED</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-secondary-foreground text-base sm:text-lg mb-8 max-w-md font-body"
          >
            Browse our full inventory of flatbeds, utility beds, service bodies & more. Call to buy — no checkout, just deals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="tel:+18254184823"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded font-heading font-semibold text-lg hover:opacity-90 transition-opacity shadow-amber"
            >
              <Phone className="w-5 h-5" />
              CALL TO BUY
            </a>
            <a
              href="/inventory"
              className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3.5 rounded font-heading font-semibold text-lg hover:bg-muted transition-colors border border-border"
            >
              <Search className="w-5 h-5" />
              BROWSE INVENTORY
            </a>
          </motion.div>
        </div>

        {/* Quick search card - desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden lg:block absolute right-8 bottom-16 w-80"
        >
          <QuickSearch />
        </motion.div>
      </div>
    </section>
  );
};

const QuickSearch = () => (
  <div className="bg-card/95 backdrop-blur border border-border rounded-lg p-5 shadow-card">
    <h3 className="font-heading text-lg text-foreground mb-1">Find the Right Bed</h3>
    <p className="text-muted-foreground text-sm mb-4">Search by truck make, model & year</p>
    <div className="space-y-3">
      <select className="w-full bg-muted text-foreground rounded px-3 py-2.5 text-sm border border-border focus:ring-1 focus:ring-primary outline-none">
        <option>Select Make</option>
        <option>Ford</option>
        <option>Chevrolet</option>
        <option>Ram / Dodge</option>
        <option>GMC</option>
        <option>Toyota</option>
      </select>
      <select className="w-full bg-muted text-foreground rounded px-3 py-2.5 text-sm border border-border focus:ring-1 focus:ring-primary outline-none">
        <option>Select Model</option>
        <option>F-150 / F-250 / F-350</option>
        <option>Silverado</option>
        <option>Sierra</option>
        <option>Ram 1500 / 2500 / 3500</option>
      </select>
      <select className="w-full bg-muted text-foreground rounded px-3 py-2.5 text-sm border border-border focus:ring-1 focus:ring-primary outline-none">
        <option>Select Year</option>
        <option>2020–2025</option>
        <option>2015–2019</option>
        <option>2010–2014</option>
        <option>2005–2009</option>
        <option>Older</option>
      </select>
      <button className="w-full bg-primary text-primary-foreground font-heading font-semibold py-2.5 rounded hover:opacity-90 transition-opacity">
        FIND TRUCK BEDS
      </button>
    </div>
  </div>
);

export default HeroSection;
