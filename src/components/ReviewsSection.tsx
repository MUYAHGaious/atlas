import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    name: "Marcus T.",
    role: "Fleet Manager, Dallas TX",
    quote:
      "Bought two flatbeds in the same week. Straight answers, fair price, and fast freight.",
  },
  {
    name: "Elena R.",
    role: "Owner-Operator",
    quote:
      "Pictures matched the bed exactly. Zero surprises when it arrived.",
  },
  {
    name: "Hector V.",
    role: "Body Shop",
    quote:
      "Hard to find service bodies in good shape. Atlas came through in 48 hours.",
  },
  {
    name: "Kim L.",
    role: "Contractor",
    quote:
      "No spam, no checkout maze. Just called, paid, and got tracking the next day.",
  },
  {
    name: "Jordan S.",
    role: "Mechanic",
    quote:
      "Beds were clean, mounts were solid, and the fit was right on the first install.",
  },
  {
    name: "Priya D.",
    role: "Fleet Buyer",
    quote:
      "Inventory is real. If it's listed, they actually have it.",
  },
  {
    name: "Luis M.",
    role: "Tow Company",
    quote:
      "Needed a stake bed fast. They lined up freight and kept me updated.",
  },
  {
    name: "Amber K.",
    role: "Service Tech",
    quote:
      "Helpful on the phone and no pressure to upsell. Refreshing.",
  },
  {
    name: "Devon P.",
    role: "Fleet Ops",
    quote:
      "Quality matched the condition label. The 'used' bed looked almost new.",
  },
  {
    name: "Rosa G.",
    role: "Small Business Owner",
    quote:
      "They worked around my schedule and delivered to the shop door.",
  },
  {
    name: "Cole N.",
    role: "Ranch Manager",
    quote:
      "Durable build and solid welds. We put it to work immediately.",
  },
  {
    name: "Avery H.",
    role: "Installer",
    quote:
      "Hardware was complete and the rails lined up cleanly.",
  },
  {
    name: "Samir A.",
    role: "Logistics Lead",
    quote:
      "Clear ETA, good packaging, no damage in transit.",
  },
  {
    name: "Tanya W.",
    role: "Fleet Supervisor",
    quote:
      "We are sourcing all our replacements here now. Simple and reliable.",
  },
  {
    name: "Grant B.",
    role: "Independent Hauler",
    quote:
      "Fast answers, good options, and the price was right.",
  },
  {
    name: "Nina C.",
    role: "Workshop Owner",
    quote:
      "I liked that the listing photos were honest and current.",
  },
];

const ReviewsSection = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section id="reviews" className="py-12 md:py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-xs font-heading tracking-[0.35em] text-muted-foreground uppercase">
            Reviews
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Real buyers. Real results.
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
            Feedback from fleet managers, mechanics, and owner-operators who need beds that show
            up ready to work.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="relative"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem
                key={`${review.name}-${review.role}`}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-gradient-card border border-border rounded-lg p-5 shadow-card h-full">
                  <div className="flex items-center gap-1 text-primary mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">"{review.quote}"</p>
                  <div className="mt-4">
                    <p className="text-sm font-heading font-semibold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ReviewsSection;
