import { useState } from "react";
import { Phone, Tag, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useListings, Listing } from "@/data/listings";
import { categories } from "@/data/categories";
import { motion, AnimatePresence } from "framer-motion";
import { isAdmin } from "@/utils/auth";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Pin } from "lucide-react";

interface ListingsSectionProps {
  initialCategory?: string;
}

const ListingsSection = ({ initialCategory }: ListingsSectionProps) => {
  const queryClient = useQueryClient();
  const { data: listings, isLoading, error } = useListings();
  const [filter, setFilter] = useState<"All" | "New" | "Used">("All");

  const handleTogglePin = async (id: number) => {
    try {
      const response = await fetch(`/api/listings/${id}/toggle-pin`, { method: "PATCH" });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.pinned ? "Listing pinned to top" : "Listing unpinned");
        queryClient.invalidateQueries({ queryKey: ["listings"] });
      } else {
        toast.error("Failed to pin listing");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const response = await fetch(`/api/listings/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Listing deleted");
        queryClient.invalidateQueries({ queryKey: ["listings"] });
      } else {
        toast.error("Failed to delete listing");
      }
    } catch (err) {
      toast.error("An error occurred during deletion");
    }
  };

  if (isLoading) return <div className="py-20 text-center">Loading inventory...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Failed to load inventory. Please try again later.</div>;

  const filteredListings = listings?.filter(item => {
    const matchesCondition = filter === "All" ? true : item.condition === filter;

    let matchesCategory = true;
    if (initialCategory) {
      if (item.category) {
        // Use explicit category if available
        matchesCategory = item.category === initialCategory;
      } else {
        // Fallback to fuzzy search for legacy items
        const categoryObj = categories.find(c => c.label === initialCategory);
        if (categoryObj) {
          if (categoryObj.label === "OTHER") {
            const allBrands = categories.filter(c => c.label !== "OTHER").flatMap(c => c.brands);
            matchesCategory = !allBrands.some(brand =>
              item.title.toLowerCase().includes(brand.toLowerCase()) ||
              (item.description && item.description.toLowerCase().includes(brand.toLowerCase()))
            );
          } else {
            matchesCategory = categoryObj.brands.some(brand =>
              item.title.toLowerCase().includes(brand.toLowerCase()) ||
              (item.description && item.description.toLowerCase().includes(brand.toLowerCase()))
            );
          }
        }
      }
    }

    return matchesCondition && matchesCategory;
  })?.sort((a, b) => {
    // Pinned items first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

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
            <ListingCard
              key={item.id}
              {...item}
              onDelete={() => handleDelete(item.id)}
              onTogglePin={() => handleTogglePin(item.id)}
            />
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
  pinned,
  old_price,
  onDelete,
  onTogglePin,
}: Listing & { onDelete: () => void, onTogglePin: () => void }) => {
  const formatPrice = (p: string) => {
    if (!p) return "";
    return p.startsWith("$") ? p : `$${p}`;
  };

  return (
    <div className="bg-gradient-card border border-border rounded-lg overflow-hidden group hover:border-primary/40 transition-all shadow-card flex flex-col">
      <Link to={`/listing/${id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span
            className={`px-2.5 py-0.5 rounded text-[10px] font-heading font-semibold uppercase tracking-wider ${condition === "New"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
              }`}
          >
            {condition}
          </span>
          {pinned === 1 && (
            <span className="bg-amber-500 text-black px-2.5 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider shadow-lg">
              PINNED
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/listing/${id}`} className="block">
          <h3 className="font-heading text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
        </Link>
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-primary font-heading text-xl font-bold">{formatPrice(price)}</p>
          {old_price && (
            <p className="text-muted-foreground text-sm line-through decoration-primary/60 font-medium">{formatPrice(old_price)}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
          <Tag className="w-3.5 h-3.5" />
          <span>{fits}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>
        <div className="mt-auto">
          <div className="flex gap-2 mb-3">
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

          {isAdmin() && (
            <div className="flex gap-2 pt-3 border-t border-border">
              <Link
                to={`/admin/edit/${id}`}
                className="px-3 bg-muted hover:bg-muted/80 text-foreground py-2 rounded text-[10px] font-bold text-center transition-colors uppercase"
              >
                EDIT
              </Link>
              <button
                onClick={onTogglePin}
                className={`px-3 py-2 rounded text-[10px] font-bold transition-colors uppercase ${pinned ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
              >
                {pinned ? 'UNPIN' : 'PIN'}
              </button>
              <button
                onClick={onDelete}
                className="px-3 bg-destructive/10 hover:bg-destructive/20 text-destructive py-2 rounded text-[10px] font-bold transition-colors uppercase"
              >
                DELETE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsSection;
