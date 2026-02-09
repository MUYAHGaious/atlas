import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isAdmin } from "@/utils/auth";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin()) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                toast.success("Login successful");
                navigate("/admin/dashboard");
            } else {
                toast.error(data.error || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 rounded-lg border border-border bg-card shadow-card"
                >
                    <h1 className="text-2xl font-heading font-bold mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-muted-foreground uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                className="w-full rounded border border-border bg-muted p-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-3 rounded font-bold hover:opacity-90 transition-opacity shadow-amber mt-2"
                        >
                            LOGIN
                        </button>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminLogin;
