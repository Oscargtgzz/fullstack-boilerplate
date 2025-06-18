"use client";

import React from 'react';
import Link from 'next/link';

interface KeyService {
  name: string;
  href: string;
  description?: string; // Optional, short description for the key service
}

interface MainCategory {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Placeholder image for the category
  icon?: string; // Placeholder icon
  ctaText: string;
  ctaHref: string;
  keyServices: KeyService[];
}

const mainCategoriesData: MainCategory[] = [
  {
    id: 'proteccion-confort',
    title: 'Protección y Confort',
    description: 'Servicios diseñados para mejorar tu experiencia de manejo, proteger tu inversión y asegurar tu tranquilidad en el camino.',
    imageUrl: 'https://via.placeholder.com/600x400/16A34A/FFFFFF?text=Protección+y+Confort+Auto', // Greenish tones
    ctaText: 'Explora Protección y Confort',
    ctaHref: '#proteccion-confort-details', // Placeholder, could link to first service or a dedicated section
    keyServices: [
      { name: 'Polarizado Legal y Garantizado', href: '/servicios/polarizado-legal', description: 'Cumple la normativa y mejora el confort.' },
      { name: 'Películas de Seguridad', href: '/servicios/peliculas-de-seguridad', description: 'Mayor resistencia y protección ante impactos.' }, // Placeholder link from Prompt 16
      { name: 'PPF (Paint Protection Film)', href: '/servicios/ppf', description: 'Defensa invisible para tu pintura.' },
    ],
  },
  {
    id: 'estilo-personalizacion',
    title: 'Estilo y Personalización',
    description: 'Transforma la apariencia de tu vehículo y hazlo destacar. Expresa tu individualidad con acabados y detalles únicos.',
    imageUrl: 'https://via.placeholder.com/600x400/6366F1/FFFFFF?text=Estilo+y+Diseño+Vehicular', // Indigo tones
    ctaText: 'Descubre Opciones de Estilo',
    ctaHref: '#estilo-personalizacion-details',
    keyServices: [
      { name: 'Wrap Vehicular', href: '/servicios/wrap-vehicular', description: 'Cambios de color y diseños impactantes.' },
      { name: 'Polarizado Estético y de Diseño', href: '/servicios/polarizado-estetico', description: 'Tonos y acabados para un look premium.' }, // Placeholder link
      { name: 'Recubrimiento Cerámico', href: '/servicios/recubrimiento-ceramico', description: 'Brillo profundo y protección duradera.' },
    ],
  },
  {
    id: 'performance-tuning',
    title: 'Performance y Tuning',
    description: 'Mejora el rendimiento y las capacidades de tu vehículo. (Servicios especializados próximamente disponibles).',
    imageUrl: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Performance+y+Tuning+Motor', // Amber/Orange tones
    ctaText: 'Consultar Servicios Performance',
    ctaHref: '#performance-tuning-details',
    keyServices: [
      { name: 'Optimización de ECU (Próximamente)', href: '#', description: 'Ajustes para mejorar respuesta y eficiencia.' },
      { name: 'Sistemas de Escape (Próximamente)', href: '#', description: 'Mejora de sonido y flujo de gases.' },
      { name: 'Suspensión Deportiva (Próximamente)', href: '#', description: 'Manejo más ágil y look deportivo.' },
    ],
  },
];


const ServicesIndexPage: React.FC = () => {
  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Page Title & Introductory Text (Retained) */}
        <header className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-6">
            Nuestros Servicios de Personalización Automotriz en León
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            En Tovar3, ofrecemos una gama completa de servicios para transformar y proteger tu vehículo. Nos dedicamos a la calidad, la innovación y la satisfacción del cliente, utilizando los mejores materiales y técnicas para garantizar resultados excepcionales.
          </p>
        </header>

        {/* Main Service Category Sections */}
        <div className="space-y-16 md:space-y-24">
          {mainCategoriesData.map((category) => (
            <section key={category.id} id={`${category.id}-details`} className="bg-white p-6 md:p-10 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
              <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
                {/* Image/Visual Element (Order can be alternated for visual rhythm) */}
                <div className={`md:col-span-5 ${category.id === 'estilo-personalizacion' ? 'md:order-last' : ''}`}>
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={`Categoría: ${category.title}`}
                      className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-80 bg-slate-200 rounded-lg flex items-center justify-center">
                      {category.icon ? <span className="text-6xl text-teal-500">{category.icon}</span> : <span className="text-slate-400 text-lg">Imagen Categoría</span>}
                    </div>
                  )}
                </div>

                {/* Category Details & Key Services */}
                <div className="md:col-span-7">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{category.title}</h2>
                  <p className="text-slate-600 mb-6 text-md leading-relaxed">{category.description}</p>

                  <Link href={category.ctaHref} legacyBehavior>
                    <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300 mb-8 shadow-md hover:shadow-lg">
                      {category.ctaText}
                    </a>
                  </Link>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-4 pt-4 border-t border-slate-200">Servicios Clave:</h3>
                    <ul className="space-y-3">
                      {category.keyServices.map(service => (
                        <li key={service.name}>
                          <Link href={service.href} legacyBehavior>
                            <a className="group flex items-center p-3 bg-slate-50 hover:bg-teal-50 rounded-md transition-colors duration-200">
                              <span className="text-teal-600 group-hover:text-teal-700 font-medium text-md mr-2">&#10148;</span>
                              <div>
                                <span className="text-slate-700 group-hover:text-teal-700 font-semibold">{service.name}</span>
                                {service.description && <p className="text-xs text-slate-500 group-hover:text-teal-600">{service.description}</p>}
                              </div>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Concluding CTA (Retained or Modified) */}
        <section className="text-center mt-16 md:mt-24 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6">
            ¿Tienes un Proyecto en Mente o Necesitas Asesoría?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a materializar tu visión y encontrar las mejores soluciones para tu vehículo.
          </p>
          <Link href="/contacto" legacyBehavior>
            <a className="bg-slate-800 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl">
              Contáctanos Hoy Mismo
            </a>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ServicesIndexPage;
