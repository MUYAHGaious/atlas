import { Menu, X, Facebook, ChevronDown, List } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/categories";
import { isAdmin, logout } from "@/utils/auth";
import logo from "@/assets/logo.png";
import WhatsAppIcon from "./WhatsAppIcon";
import Footer from "@/components/Footer";

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
            href="https://wa.me/18254184823"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-heading"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
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
          <Link to="/inventory" className="text-foreground hover:text-primary transition-colors">Inventory</Link>

          <div className="relative group/dropdown">
            <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors uppercase">
              Categories
              <ChevronDown className="w-3.5 h-3.5 group-hover/dropdown:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 min-w-[200px]">
              <div className="bg-card border border-border rounded-lg p-2 shadow-xl backdrop-blur-md">
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={`/inventory?category=${encodeURIComponent(cat.label)}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded hover:bg-primary/10 text-foreground transition-colors group/item"
                  >
                    <span className="normal-case font-body tracking-normal font-semibold">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a href="/#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>

          {isAdmin() && (
            <button
              onClick={logout}
              className="ml-4 pl-4 border-l border-border text-xs font-heading font-bold text-destructive hover:opacity-80 transition-opacity uppercase tracking-widest"
            >
              Logout
            </button>
          )}

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
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/18254184823"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded font-heading font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity animate-pulse-glow"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            WHATSAPP
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
            <nav className="container flex flex-col py-6 gap-2 font-heading font-bold uppercase tracking-widest text-sm">
              <Link to="/" className="text-foreground hover:text-primary py-3 border-b border-border/50" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/inventory" className="text-foreground hover:text-primary py-3 border-b border-border/50" onClick={() => setMenuOpen(false)}>Inventory</Link>

              <MobileCategoriesSubmenu setMenuOpen={setMenuOpen} />

              <a href="/#about" className="text-foreground hover:text-primary py-3 border-b border-border/50" onClick={() => setMenuOpen(false)}>About</a>
              <a href="/#contact" className="text-foreground hover:text-primary py-3 border-b border-border/50" onClick={() => setMenuOpen(false)}>Contact</a>

              {isAdmin() && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-destructive text-left py-3 border-b border-border/50 font-heading font-bold uppercase tracking-widest text-xs"
                >
                  Logout
                </button>
              )}

              <a
                href="https://wa.me/18254184823"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-4 rounded font-heading font-bold mt-2 shadow-amber"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WHATSAPP TO BUY — (825) 418-4823
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const MobileCategoriesSubmenu = ({ setMenuOpen }: { setMenuOpen: (val: boolean) => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-foreground hover:text-primary py-3"
      >
        <span>Categories</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-muted/30 rounded-lg mb-2"
          >
            <div className="py-2 flex flex-col">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  to={`/inventory?category=${encodeURIComponent(cat.label)}`}
                  className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:text-primary transition-colors text-xs font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="normal-case">{cat.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
