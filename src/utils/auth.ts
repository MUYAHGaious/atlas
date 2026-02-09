export const isAdmin = (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("adminToken");
};

export const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
};
