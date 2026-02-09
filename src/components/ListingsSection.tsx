import { useState } from "react";
import { Phone, Tag, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useListings, Listing } from "@/data/listings";
import { motion } from "framer-motion";

const ListingsSection = () => {
  const { data: listings, isLoading, error } = useListings();
  const [filter, setFilter] = useState<"All" | "New" | "Used">("All");

  if (isLoading) return <div className="py-20 text-center">Loading inventory...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Failed to load inventory. Please try again later.</div>;

  const filteredListings = listings?.filter(item =>
    filter === "All" ? true : item.condition === filter
  );

  return (
    <section id="inventory" className="py-12 md:py-16 bg-gradient-dark">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              FEATURED <span className="text-gradient-amber">INVENTORY</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">New & used truck beds ready to ship</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("All")}
              className={`px-3 py-1.5 rounded text-xs font-heading transition-colors ${filter === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter("New")}
              className={`px-3 py-1.5 rounded text-xs font-heading transition-colors ${filter === "New" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              NEW
            </button>
            <button
              onClick={() => setFilter("Used")}
              className={`px-3 py-1.5 rounded text-xs font-heading transition-colors ${filter === "Used" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              USED
            </button>
          </div>
        </div>

        <motion.div
          layout
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {filteredListings?.map((item) => (
            <ListingCard key={item.id} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ListingCard = ({
  id,
  title,
  condition,
  price,
  fits,
  location,
  image,
}: Listing) => (
  <div className="bg-gradient-card border border-border rounded-lg overflow-hidden group hover:border-primary/40 transition-all shadow-card flex flex-col">
    <Link to={`/listing/${id}`} className="block relative aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <span
        className={`absolute top-3 left-3 px-2.5 py-0.5 rounded text-xs font-heading font-semibold ${condition === "New"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
          }`}
      >
        {condition}
      </span>
    </Link>
    <div className="p-4 flex flex-col flex-grow">
      <Link to={`/listing/${id}`} className="block">
        <h3 className="font-heading text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
      </Link>
      <p className="text-primary font-heading text-xl font-bold mb-2">{price}</p>
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
        <Tag className="w-3.5 h-3.5" />
        <span>{fits}</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
        <MapPin className="w-3.5 h-3.5" />
        <span>{location}</span>
      </div>
      <div className="mt-auto flex gap-2">
        <Link
          to={`/listing/${id}`}
          className="flex-1 flex items-center justify-center bg-secondary text-secondary-foreground py-2.5 rounded font-heading font-semibold text-sm hover:bg-muted transition-colors"
        >
          DETAILS
        </Link>
        <a
          href="tel:+18254184823"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" />
          CALL
        </a>
      </div>
    </div>
  </div>
);

export default ListingsSection;
