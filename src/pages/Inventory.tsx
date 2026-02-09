import Header from "@/components/Header";
import ListingsSection from "@/components/ListingsSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

import { useSearchParams } from "react-router-dom";

const Inventory = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category") || undefined;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-8">
                <div className="container mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground uppercase">
                            {category ? `${category} ` : "Our "}
                            <span className="text-gradient-amber">Inventory</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl font-body">
                            {category
                                ? `Browse our selection of ${category.toLowerCase()}. Find the perfect fit for your truck today.`
                                : "Browse our complete selection of new and used truck beds, service bodies, and utility beds."
                            }
                        </p>
                    </motion.div>
                </div>
                <ListingsSection initialCategory={category} />
            </main>
            <Footer />
        </div>
    );
};

export default Inventory;
