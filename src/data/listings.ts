import { useQuery } from "@tanstack/react-query";

export interface Listing {
  id: number;
  title: string;
  condition: "New" | "Used";
  price: string;
  fits: string;
  location: string;
  image: string;
  description?: string;
}

export const useListings = () => {
  return useQuery({
    queryKey: ["listings"],
    queryFn: async (): Promise<Listing[]> => {
      const response = await fetch("/api/listings");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  });
};

export const useListing = (id: string) => {
  return useQuery({
    queryKey: ["listing", id],
    queryFn: async (): Promise<Listing> => {
      const response = await fetch(`/api/listings/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!id
  });
};
