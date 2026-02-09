import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ListingsSection from "@/components/ListingsSection";
import ReviewsSection from "@/components/ReviewsSection";
import TrustSection from "@/components/TrustSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <ListingsSection />
        <ReviewsSection />
        <TrustSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
