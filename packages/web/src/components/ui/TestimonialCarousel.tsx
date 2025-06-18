"use client";

import React, { useState, useEffect } from 'react';

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role?: string; // e.g., "Cliente Satisfecho", "Propietario de [Tipo de Auto]"
  imageUrl?: string;
  vehicleModel?: string;
  serviceReceived?: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number; // in milliseconds
}

// Default mock data if no props are passed, or for standalone testing
const defaultMockTestimonials: TestimonialItem[] = [
  { id: 't001', quote: "¡El servicio de polarizado fue excepcional! Mi auto se siente mucho más fresco y luce increíble. El personal fue muy profesional y me asesoró en todo momento.", name: "Laura G.", role: "Cliente Polarizado Nanocerámico", imageUrl: "https://via.placeholder.com/100x100/A5B4FC/FFFFFF?text=LG", vehicleModel: "Toyota Corolla", serviceReceived: "Polarizado Nanocerámico" },
  { id: 't002', quote: "Llevé mi camioneta para PPF y el resultado superó mis expectativas. La atención al detalle es impresionante. ¡Totalmente recomendado Tovar3!", name: "Carlos M.", role: "Cliente PPF", imageUrl: "https://via.placeholder.com/100x100/818CF8/FFFFFF?text=CM", vehicleModel: "Ford Ranger", serviceReceived: "PPF Frontal Completo" },
  { id: 't003', quote: "Decidí hacerle un wrap completo a mi auto y no podría estar más feliz. El equipo de Tovar3 es muy talentoso y el acabado es perfecto. ¡Gracias!", name: "Sofía R.", role: "Cliente Wrap Vehicular", imageUrl: "https://via.placeholder.com/100x100/6366F1/FFFFFF?text=SR", vehicleModel: "Mazda 3", serviceReceived: "Wrap Completo Mate" },
  { id: 't004', quote: "El recubrimiento cerámico dejó mi auto con un brillo espectacular y es mucho más fácil de limpiar. Excelente trabajo y atención.", name: "Javier P.", role: "Cliente Recubrimiento Cerámico", imageUrl: "https://via.placeholder.com/100x100/99F6E4/0F766E?text=JP", vehicleModel: "BMW Serie 3", serviceReceived: "Recubrimiento Cerámico" },
];

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials = defaultMockTestimonials,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;

    const intervalId = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex, autoPlay, autoPlayInterval, testimonials.length, goToNext]); // Added goToNext to dependencies as it's used in effect

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-slate-500">No hay testimonios disponibles en este momento.</p>;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl overflow-hidden">
      {/* Previous Button */}
      {testimonials.length > 1 && (
        <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-700/50 hover:bg-slate-700/80 text-white rounded-full ml-2 md:-ml-4 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Testimonio Anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Testimonial Content - using a key to force re-render for transition effect if CSS transitions are set up */}
      <div key={currentTestimonial.id} className="text-center transition-opacity duration-500 ease-in-out"> {/* Basic opacity transition can be added in global CSS or via more complex state */}
        <img
          src={currentTestimonial.imageUrl || `https://via.placeholder.com/100x100/CBD5E1/475569?text=${currentTestimonial.name.substring(0,2).toUpperCase()}`}
          alt={`Foto de ${currentTestimonial.name}`}
          className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-teal-500 shadow-lg object-cover"
        />
        <blockquote className="text-lg md:text-xl italic text-slate-700 mb-6 leading-relaxed min-h-[100px] md:min-h-[120px]">
          "{currentTestimonial.quote}"
        </blockquote>
        <p className="font-bold text-teal-600 text-lg">{currentTestimonial.name}</p>
        {currentTestimonial.role && <p className="text-sm text-slate-500">{currentTestimonial.role}</p>}
        {(currentTestimonial.vehicleModel || currentTestimonial.serviceReceived) && (
            <p className="text-xs text-slate-400 mt-1">
                {currentTestimonial.serviceReceived && <span>Servicio: {currentTestimonial.serviceReceived}</span>}
                {currentTestimonial.vehicleModel && currentTestimonial.serviceReceived && <span> | </span>}
                {currentTestimonial.vehicleModel && <span>Vehículo: {currentTestimonial.vehicleModel}</span>}
            </p>
        )}
      </div>

      {/* Next Button */}
      {testimonials.length > 1 && (
        <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-700/50 hover:bg-slate-700/80 text-white rounded-full mr-2 md:-mr-4 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Siguiente Testimonio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

      {/* Dots Indicator (Optional) */}
      {testimonials.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 focus:outline-none
                ${currentIndex === index ? 'bg-teal-500 scale-125' : 'bg-slate-300 hover:bg-slate-400'}
              `}
              aria-label={`Ir al testimonio ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
