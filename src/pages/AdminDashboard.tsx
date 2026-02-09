import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [condition, setCondition] = useState("New");
    const [price, setPrice] = useState("");
    const [fits, setFits] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin");
        }
    }, [navigate]);

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
        if (!image) {
            toast.error("Please select an image");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("condition", condition);
        formData.append("price", price);
        formData.append("fits", fits);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const response = await fetch("/api/listings", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Listing created successfully");
                // Reset form
                setTitle("");
                setPrice("");
                setFits("");
                setLocation("");
                setDescription("");
                setImage(null);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to create listing");
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
                    className="container max-w-2xl"
                >
                    <h1 className="text-3xl font-heading font-bold mb-8">Add New Listing</h1>
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

                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="space-y-1 text-center">
                                    <div className="flex text-sm text-foreground">
                                        <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                                required
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                    {image && (
                                        <p className="text-sm font-semibold text-primary mt-2">
                                            Selected: {image.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground py-4 rounded font-bold hover:opacity-90 transition-opacity shadow-amber uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "CREATING..." : "CREATE LISTING"}
                        </button>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
