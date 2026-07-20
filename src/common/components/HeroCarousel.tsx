import { useEffect, useState, type ReactNode } from "react";

const carouselOptions = { loop: true } as const;

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";

const HeroCarouselDots = () => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = (emblaApi: NonNullable<CarouselApi>) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (count <= 1) return null;

  return (
    <div className="mt-3 flex justify-center gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-1.5 rounded-full transition-all",
            index === selectedIndex ? "w-6 bg-slate-900" : "w-1.5 bg-slate-300"
          )}
        />
      ))}
    </div>
  );
};

type HeroCarouselProps = {
  slides: ReactNode[];
  className?: string;
};

const HeroCarousel = ({ slides, className }: HeroCarouselProps) => {
  return (
    <Carousel opts={carouselOptions} className={cn("group", className)}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 border-none bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white active:-translate-y-1/2!" />
      <CarouselNext className="right-3 border-none bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white active:-translate-y-1/2!" />
      <HeroCarouselDots />
    </Carousel>
  );
};

export default HeroCarousel;
