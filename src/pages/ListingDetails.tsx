import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Tag, Check } from "lucide-react";
import { useListing } from "@/data/listings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { motion } from "framer-motion";

const ListingDetails = () => {
    const { id } = useParams();
    const { data: listing, isLoading, error } = useListing(id || "");

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading details...</div>;
    if (error || !listing) return <NotFound />;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-8 pb-16">
                <div className="container">
                    {/* Breadcrumb / Back */}
                    <Link
                        to="/#inventory"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Inventory
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Column */}
                        <div className="space-y-4">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted shadow-card relative group">
                                <img
                                    src={listing.image}
                                    alt={listing.title}
                                    className="w-full h-full object-cover"
                                />
                                <span className={`absolute top-4 left-4 px-3 py-1 rounded text-sm font-heading font-semibold ${listing.condition === "New"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground"
                                    }`}>
                                    {listing.condition}
                                </span>
                            </div>
                        </div>

                        {/* Details Column */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                                    {listing.title}
                                </h1>
                                <p className="text-3xl font-heading font-bold text-primary">
                                    {listing.price}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-border">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded bg-muted text-foreground">
                                        <Tag className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-sm text-muted-foreground">FITS</h3>
                                        <p className="font-medium">{listing.fits}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded bg-muted text-foreground">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-sm text-muted-foreground">LOCATION</h3>
                                        <p className="font-medium">{listing.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-heading text-lg font-bold">Description</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {listing.description || `This ${listing.condition.toLowerCase()} ${listing.title.toLowerCase()} is available now in ${listing.location}. Perfect for upgrading your fleet or replacing a damaged bed. Call us today for more details and shipping options.`}
                                </p>
                                <ul className="space-y-2 mt-4">
                                    <li className="flex items-center gap-2 text-sm text-foreground">
                                        <Check className="w-4 h-4 text-primary" />
                                        <span>Heavy-duty construction</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-foreground">
                                        <Check className="w-4 h-4 text-primary" />
                                        <span>Rust-resistant finish</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-foreground">
                                        <Check className="w-4 h-4 text-primary" />
                                        <span>Installation available</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4">
                                <a
                                    href="tel:+18254184823"
                                    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition-opacity shadow-amber animate-pulse-glow"
                                >
                                    <Phone className="w-5 h-5" />
                                    CALL TO BUY: (825) 418-4823
                                </a>
                                <p className="text-center sm:text-left text-xs text-muted-foreground mt-3">
                                    * Shipping available nationwide. Financing options pending.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ListingDetails;
