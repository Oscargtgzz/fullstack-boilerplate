import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="bg-slate-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Polarizado Legal y Garantizado en León
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-slate-300">
            Tu Socio de Confianza... Precios Transparentes, Asesoría Experta.
          </p>
          <div className="space-x-4">
            <a
              href="#" // Placeholder
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Cotizar Ahora
            </a>
            <a
              href="#" // Placeholder
              className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Explorar Servicios
            </a>
          </div>
        </div>
      </section>

      {/* Promise/Why Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-700">
            Por Qué Elegirnos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Legalidad Garantizada', description: 'Cumplimos con todas las normativas vigentes para tu tranquilidad.' , icon: '🔒'},
              { title: 'Transparencia Total', description: 'Precios claros y sin sorpresas. Asesoría honesta y personalizada.' , icon: '透明'},
              { title: 'Calidad Superior', description: 'Materiales de primera y mano de obra experta para resultados duraderos.', icon: '⭐' },
              { title: 'Expertos Apasionados', description: 'Nos encanta lo que hacemos y estamos aquí para ayudarte a tomar la mejor decisión.', icon: '👨‍🔧' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4 text-teal-500">{item.icon}</div> {/* Placeholder Icon */}
                <h3 className="text-xl font-semibold mb-2 text-slate-700">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-700">
            Nuestros Servicios Destacados
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Polarizado Legal y Seguro', description: 'Variedad de tonos permitidos que cumplen con la ley, mejorando estética y confort.', image: 'https://via.placeholder.com/300x200/CBD5E1/475569?text=Polarizado+Legal' },
              { title: 'Personalización de Vehículos', description: 'Dale un toque único a tu auto con nuestros servicios de personalización.', image: 'https://via.placeholder.com/300x200/A5B4FC/3730A3?text=Personalización' },
              { title: 'Protección de Pintura (PPF)', description: 'Conserva la pintura original de tu auto como nueva con PPF de alta calidad.', image: 'https://via.placeholder.com/300x200/99F6E4/0F766E?text=PPF' },
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-slate-700">{service.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                  <a href="#" className="text-teal-500 hover:text-teal-600 font-semibold text-sm">Más Información &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Section Preview */}
      <section className="py-16 md:py-24 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Conoce el Artículo 99 y Cómo Tovar3 te Respalda
              </h2>
              <p className="text-lg text-teal-100 mb-6">
                Entender la legislación sobre polarizados es crucial. En Tovar3, no solo te ofrecemos productos que cumplen la normativa, sino que te brindamos la asesoría experta para que transites con total confianza y legalidad.
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <a
                href="#" // Placeholder
                className="bg-white hover:bg-slate-100 text-teal-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Más sobre Polarizado Legal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-700">
            Nuestros Trabajos Hablan por Sí Solos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              'https://via.placeholder.com/300x300/64748B/FFFFFF?text=Proyecto+1',
              'https://via.placeholder.com/300x300/475569/FFFFFF?text=Proyecto+2',
              'https://via.placeholder.com/300x300/334155/FFFFFF?text=Proyecto+3',
              'https://via.placeholder.com/300x300/1E293B/FFFFFF?text=Proyecto+4',
            ].map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img src={img} alt={`Trabajo realizado ${index + 1}`} className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#" // Placeholder
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Ver Galería Completa
            </a>
          </div>
        </div>
      </section>

import TestimonialCarousel from '@/components/ui/TestimonialCarousel'; // Adjusted import path

// Mock data for HomePage testimonials (can be same as default in carousel or specific)
// For this integration, we'll let the carousel use its default or accept props if we define them here.
// const homePageTestimonials: TestimonialItem[] = [ ... ];

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-700">
            Lo Que Dicen Nuestros Clientes
          </h2>
          {/* Integrate TestimonialCarousel */}
          {/* If we want to use specific testimonials for the homepage, pass them: */}
          {/* <TestimonialCarousel testimonials={homePageTestimonials} /> */}
          {/* Otherwise, the carousel will use its own defaultMockTestimonials */}
          <TestimonialCarousel />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Listo para Transformar tu Auto?
          </h2>
          <div className="space-x-0 md:space-x-4 space-y-4 md:space-y-0">
            <a
              href="#" // Placeholder
              className="block md:inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300"
            >
              Cotizar Ahora
            </a>
            <a
              href="#" // Placeholder
              className="block md:inline-block bg-slate-600 hover:bg-slate-500 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300"
            >
              Contactar
            </a>
          </div>
          <div className="mt-10 text-slate-300">
            <p className="text-lg">Llámanos: <a href="tel:+521234567890" className="hover:text-teal-400">(123) 456-7890</a></p>
            <p className="text-lg">Email: <a href="mailto:info@tovar3.com" className="hover:text-teal-400">info@tovar3.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
