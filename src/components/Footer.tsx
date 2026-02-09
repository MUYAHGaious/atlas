import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer id="contact" className="border-t border-border bg-card py-12 md:py-16">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 sm:col-span-2 lg:col-span-4 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <img src={logo} alt="Atlas Truck Beds" className="h-16 w-auto object-contain self-start" />
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tighter leading-none uppercase">
              Atlas <span className="text-primary italic">Truck Beds</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl font-body">
            The #1 source for heavy-duty truck beds. Serving haulers across the nation with premium quality and unmatched service. Built tough, built for you.
          </p>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-heading text-xs font-bold text-foreground mb-4 uppercase tracking-[0.2em]">QUICK LINKS</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-heading uppercase tracking-widest text-[11px]">
            <li><Link to="/inventory" className="hover:text-primary transition-colors">Browse Inventory</Link></li>
            <li><a href="/#categories" className="hover:text-primary transition-colors">Categories</a></li>
            <li><a href="/#about" className="hover:text-primary transition-colors">Why Atlas</a></li>
            <li><a href="/#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-heading text-xs font-bold text-foreground mb-4 uppercase tracking-[0.2em]">CATEGORIES</h4>
          <ul className="space-y-3 text-sm text-muted-foreground font-heading uppercase tracking-widest text-[11px]">
            <li className="hover:text-primary transition-colors cursor-default">Flatbeds</li>
            <li className="hover:text-primary transition-colors cursor-default">Utility Beds</li>
            <li className="hover:text-primary transition-colors cursor-default">Service Bodies</li>
            <li className="hover:text-primary transition-colors cursor-default">Dump Inserts</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-heading text-xs font-bold text-foreground mb-4 uppercase tracking-[0.2em]">CONTACT</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <a href="tel:+18254184823" className="hover:text-primary transition-colors font-bold">(825) 418-4823</a>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>atlastruckbeds@gmail.com</span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>Houston, TX</span>
            </li>
            <li className="pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61586741605227"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-muted hover:bg-primary/10 px-4 py-2 rounded-full transition-colors group"
              >
                <Facebook className="w-4 h-4 text-primary" />
                <span className="text-xs font-heading font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Atlas Facebook</span>
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-12 pt-8 border-t border-border text-center text-[10px] font-heading font-bold uppercase tracking-[0.3em] text-muted-foreground">
        © {new Date().getFullYear()} Atlas Truck Beds. Built to haul. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
