import { Phone, Menu, X, Facebook } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-primary overflow-hidden">
        <div className="container flex items-center justify-between py-1.5 text-sm font-semibold text-primary-foreground">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="font-heading tracking-widest text-[10px] sm:text-xs"
          >
            BUILT TO HAUL. BUILT TO LAST.
          </motion.span>
          <motion.a
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            href="tel:+18254184823"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-heading"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">(825) 418-4823</span>
          </motion.a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Atlas Truck Beds" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="leading-none">
              <span className="font-heading text-xl font-bold text-foreground">ATLAS</span>
              <span className="block text-[10px] font-heading text-muted-foreground tracking-[0.2em]">TRUCK BEDS</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-heading font-bold uppercase tracking-widest">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <a href="/#inventory" className="text-foreground hover:text-primary transition-colors">Inventory</a>
          <a href="/#categories" className="text-foreground hover:text-primary transition-colors">Categories</a>
          <a href="/#about" className="text-foreground hover:text-primary transition-colors">About</a>
          <a href="/#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          <a
            href="https://www.facebook.com/profile.php?id=61586741605227"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </nav>

        {/* CTA + mobile menu */}
        <div className="flex items-center gap-3">
          {localStorage.getItem("adminToken") && (
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin";
              }}
              className="text-[10px] font-heading font-bold text-muted-foreground hover:text-red-500 transition-colors uppercase mr-2"
            >
              Logout
            </button>
          )}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+18254184823"
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded font-heading font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            <Phone className="w-3.5 h-3.5" />
            CALL NOW
          </motion.a>
          <button
            className="md:hidden text-foreground p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden border-t border-border bg-card overflow-hidden"
          >
            <nav className="container flex flex-col py-6 gap-4 font-heading font-bold uppercase tracking-widest text-sm">
              <Link to="/" className="text-foreground hover:text-primary py-2 border-b border-border/50" onClick={() => setMenuOpen(false)}>Home</Link>
              <a href="/#inventory" className="text-foreground hover:text-primary py-2 border-b border-border/50" onClick={() => setMenuOpen(false)}>Inventory</a>
              <a href="/#categories" className="text-foreground hover:text-primary py-2 border-b border-border/50" onClick={() => setMenuOpen(false)}>Categories</a>
              <a href="/#about" className="text-foreground hover:text-primary py-2 border-b border-border/50" onClick={() => setMenuOpen(false)}>About</a>
              <a href="/#contact" className="text-foreground hover:text-primary py-2 border-b border-border/50" onClick={() => setMenuOpen(false)}>Contact</a>
              <a
                href="tel:+18254184823"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-4 rounded font-heading font-bold mt-2 shadow-amber"
              >
                <Phone className="w-4 h-4" />
                CALL TO BUY — (825) 418-4823
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
