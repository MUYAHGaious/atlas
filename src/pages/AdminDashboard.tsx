import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { useListing } from "@/data/listings";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import { useQueryClient } from "@tanstack/react-query";
import { categories } from "@/data/categories";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { id } = useParams();
    const isEditMode = !!id;
    const { data: existingListing, isLoading: isLoadingListing } = useListing(id || "");

    const [title, setTitle] = useState("");
    const [condition, setCondition] = useState("New");
    const [price, setPrice] = useState("");
    const [oldPrice, setOldPrice] = useState("");
    const [category, setCategory] = useState("OTHER");
    const [fits, setFits] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [pinned, setPinned] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);



    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
        }
    }, [navigate]);

    useEffect(() => {
        if (isEditMode && existingListing) {
            setTitle(existingListing.title);
            setCondition(existingListing.condition);
            setPrice(existingListing.price || "");
            setOldPrice(existingListing.old_price || "");
            setCategory(existingListing.category || "OTHER");
            setFits(existingListing.fits || "");
            setLocation(existingListing.location);
            setDescription(existingListing.description || "");
            setPinned(!!existingListing.pinned);
            if (existingListing.images) {
                setPreviews(existingListing.images);
            } else if (existingListing.image) {
                setPreviews([existingListing.image]);
            }
        }
    }, [isEditMode, existingListing]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        if (!price.trim()) {
            toast.error("Price is required");
            return;
        }
        if (!fits.trim()) {
            toast.error("Fits information is required");
            return;
        }
        if (!location.trim()) {
            toast.error("Location is required");
            return;
        }
        if (!isEditMode && images.length === 0) {
            toast.error("Please select at least one image");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("condition", condition);
        formData.append("price", price);
        formData.append("old_price", oldPrice);
        formData.append("category", category);
        formData.append("fits", fits);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("pinned", pinned ? "1" : "0");

        images.forEach((file) => {
            formData.append("images", file);
        });

        const url = isEditMode ? `/api/listings/${id}` : "/api/listings";
        const method = isEditMode ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.ok) {
                toast.success(isEditMode ? "Listing updated successfully" : "Listing created successfully");
                queryClient.invalidateQueries({ queryKey: ["listings"] });
                queryClient.invalidateQueries({ queryKey: ["listing", id] });

                if (!isEditMode) {
                    // Reset form only if not editing
                    setTitle("");
                    setPrice("");
                    setFits("");
                    setLocation("");
                    setDescription("");
                    setImages([]);
                    setPreviews([]);
                } else {
                    setPreviews([]);
                    navigate("/inventory");
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to process listing");
            }

        } catch (error) {
            toast.error("An error occurred. Make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            {isEditMode && (
                                <Link to="/admin/dashboard" className="p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors">
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                            )}
                            <h1 className="text-3xl font-heading font-bold">{isEditMode ? "Edit Listing" : "Add New Listing"}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-xs font-heading font-bold text-muted-foreground hover:text-primary transition-colors tracking-widest">BACK TO WEBSITE</Link>
                            <button
                                onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/admin"; }}
                                className="text-xs font-heading font-bold text-destructive hover:opacity-80 transition-opacity tracking-widest border-l border-border pl-4"
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 md:p-8 rounded-lg border border-border shadow-card">


                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Title</label>

                            <input
                                type="text"
                                className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Condition</label>
                                <select
                                    className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                >
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Used">Used</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Price</label>
                                <input
                                    type="text"
                                    className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="$2,500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Old Price (Optional - for Sale)</label>
                                <input
                                    type="text"
                                    className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                    value={oldPrice}
                                    onChange={(e) => setOldPrice(e.target.value)}
                                    placeholder="e.g. $2,800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Category (Truck Brand)</label>
                                <select
                                    className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.label} value={cat.label}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Fits (Truck Model)</label>
                            <input
                                type="text"
                                className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={fits}
                                onChange={(e) => setFits(e.target.value)}
                                placeholder="e.g. Ford F-250 2017+"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Location</label>
                            <input
                                type="text"
                                className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Description</label>
                            <textarea
                                className="w-full rounded border border-border bg-muted p-3 h-32 focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg border border-border">
                            <input
                                type="checkbox"
                                id="pinned"
                                checked={pinned}
                                onChange={(e) => setPinned(e.target.checked)}
                                className="w-5 h-5 rounded border-border bg-muted text-primary focus:ring-primary focus:ring-offset-background"
                            />
                            <label htmlFor="pinned" className="text-sm font-heading font-bold cursor-pointer">
                                PIN TO TOP <span className="text-xs font-normal text-muted-foreground ml-2">(Makes this listing show first in inventory)</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Images (Upload up to 10)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="space-y-1 text-center">
                                    <div className="flex text-sm text-foreground">
                                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                                            <span>Upload files</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="sr-only"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    if (files.length + images.length > 10) {
                                                        toast.error("Maximum 10 images allowed");
                                                        return;
                                                    }
                                                    setImages(prev => [...prev, ...files]);

                                                    const newPreviews = files.map(file => URL.createObjectURL(file));
                                                    setPreviews(prev => [...prev, ...newPreviews]);
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, GIF up to 10MB each
                                    </p>
                                </div>
                            </div>

                            {/* Previews */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
                                    {previews.map((preview, index) => (
                                        <div key={index} className="relative aspect-square rounded overflow-hidden border border-border bg-muted group">
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImages(prev => prev.filter((_, i) => i !== index));
                                                    setPreviews(prev => prev.filter((_, i) => i !== index));
                                                    URL.revokeObjectURL(preview);
                                                }}
                                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-4 rounded font-bold hover:opacity-90 transition-opacity shadow-amber uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (isEditMode ? "UPDATING..." : "CREATING...") : (isEditMode ? "UPDATE LISTING" : "CREATE LISTING")}
                        </button>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div >
    );
};


export default AdminDashboard;
