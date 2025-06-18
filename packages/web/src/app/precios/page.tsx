"use client"; // Can be removed if no client-side interactivity is needed

import React from 'react';
import Link from 'next/link';

interface PriceListItem {
  service: string;
  vehicleType?: string; // e.g., Sedán, SUV, Compacto
  priceRange: string; // e.g., "Desde $XXX", "$XXX - $YYY"
  details?: string; // Optional details like "Básico", "Completo"
}

interface ServiceCategoryPrices {
  categoryName: string;
  description?: string;
  prices: PriceListItem[];
  ctaLink?: string; // Optional link to the specific service page
  ctaText?: string;
}

interface PackageItem {
  packageName: string;
  includedServices: string[];
  priceRange: string;
  description?: string;
}

const servicePriceData: ServiceCategoryPrices[] = [
  {
    categoryName: "Polarizado",
    description: "Protección solar, confort y privacidad. Precios varían según tipo de película y tamaño del vehículo.",
    ctaLink: "/servicios/polarizado-legal", // Example link
    ctaText: "Más sobre Polarizado",
    prices: [
      { service: "Polarizado Estándar", vehicleType: "Sedán", priceRange: "Desde $1,200 MXN", details: "Película básica, tonos permitidos" },
      { service: "Polarizado Estándar", vehicleType: "SUV / Pick-Up", priceRange: "Desde $1,500 MXN", details: "Película básica, tonos permitidos" },
      { service: "Polarizado Nanocerámico", vehicleType: "Sedán", priceRange: "$3,500 - $5,500 MXN", details: "Máximo rechazo de calor" },
      { service: "Polarizado Nanocerámico", vehicleType: "SUV / Pick-Up", priceRange: "$4,500 - $7,000 MXN", details: "Máximo rechazo de calor" },
    ],
  },
  {
    categoryName: "Películas de Seguridad",
    description: "Protección contra cristalazos e impactos, manteniendo los fragmentos de vidrio unidos.",
    ctaLink: "/servicios/peliculas-de-seguridad",
    ctaText: "Más sobre Películas de Seguridad",
    prices: [
      { service: "Película de Seguridad (4 mil)", vehicleType: "Sedán", priceRange: "Desde $2,500 MXN" },
      { service: "Película de Seguridad (4 mil)", vehicleType: "SUV / Pick-Up", priceRange: "Desde $3,200 MXN" },
      { service: "Película de Seguridad Reforzada (7+ mil)", vehicleType: "Sedán", priceRange: "Consultar", details: "Para máxima protección" },
    ],
  },
  {
    categoryName: "Wrap Vehicular (Rotulación)",
    description: "Cambio de color completo o parcial, diseños personalizados y protección de pintura.",
    ctaLink: "/servicios/wrap-vehicular",
    ctaText: "Más sobre Wrap Vehicular",
    prices: [
      { service: "Wrap Completo", vehicleType: "Compacto / Sedán", priceRange: "$25,000 - $45,000 MXN", details: "Colores estándar brillo/mate/satinado" },
      { service: "Wrap Completo", vehicleType: "SUV / Pick-Up", priceRange: "$35,000 - $60,000 MXN", details: "Colores estándar brillo/mate/satinado" },
      { service: "Wrap Parcial (Techo o Capó)", vehicleType: "Todos", priceRange: "Desde $4,000 MXN" },
      { service: "Wrap con Acabados Especiales", vehicleType: "Todos", priceRange: "Consultar", details: "Cromo, texturizados, etc." },
    ],
  },
  {
    categoryName: "PPF (Paint Protection Film)",
    description: "La mejor defensa invisible contra piedras, rayones y contaminantes para la pintura de tu auto.",
    ctaLink: "/servicios/ppf",
    ctaText: "Más sobre PPF",
    prices: [
      { service: "Kit Frontal Básico PPF", vehicleType: "Sedán", priceRange: "Desde $8,000 MXN", details: "Fascia, parte de capó y salpicaderas" },
      { service: "Kit Frontal Completo PPF", vehicleType: "Sedán", priceRange: "Desde $15,000 MXN" },
      { service: "Full Car PPF (Cobertura Total)", vehicleType: "Sedán", priceRange: "Consultar", details: "Máxima protección integral" },
    ],
  },
  {
    categoryName: "Recubrimiento Cerámico",
    description: "Brillo espectacular, facilidad de limpieza y protección duradera para tu pintura.",
    ctaLink: "/servicios/recubrimiento-ceramico",
    ctaText: "Más sobre Recubrimiento Cerámico",
    prices: [
      { service: "Recubrimiento Cerámico (1 año)", vehicleType: "Sedán", priceRange: "Desde $3,000 MXN" },
      { service: "Recubrimiento Cerámico Profesional (3-5 años)", vehicleType: "Sedán", priceRange: "$6,000 - $10,000 MXN" },
      { service: "Recubrimiento Cerámico para Rines", vehicleType: "Juego de 4", priceRange: "Desde $1,500 MXN" },
    ],
  },
  {
    categoryName: "Accesorios e Instalaciones Diversas",
    description: "Mejoras y personalizaciones adicionales para tu vehículo.",
    prices: [
      { service: "Instalación de Sensores de Reversa", priceRange: "Desde $1,000 MXN" },
      { service: "Cambio de Iluminación a LED", priceRange: "Consultar según vehículo y tipo de foco" },
      { service: "Otros Accesorios", priceRange: "Consultar", details: "Pregunta por lo que necesites" },
    ],
  },
];

const predefinedPackages: PackageItem[] = [
  {
    packageName: "Paquete Protección Esencial",
    includedServices: ["Polarizado Nanocerámico (Legal)", "Película de Seguridad (4 mil) en vidrios laterales"],
    priceRange: "$5,500 - $8,000 MXN (Sedán)",
    description: "Una combinación ideal para confort, privacidad y seguridad básica contra cristalazos."
  },
  {
    packageName: "Paquete Máxima Defensa y Estilo",
    includedServices: ["PPF Frontal Completo", "Recubrimiento Cerámico Profesional (3-5 años)", "Polarizado Nanocerámico Premium"],
    priceRange: "Consultar (Varía mucho por vehículo)",
    description: "La solución definitiva para mantener tu auto como nuevo, protegido de todo y con un brillo inigualable."
  },
  // Add more packages if defined
];


const PricesPackagesPage: React.FC = () => {
  return (
    <div className="bg-slate-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Precios y Paquetes Transparentes en Tovar3
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Conoce nuestros precios base estimados y opciones de paquetes. Para una cotización exacta y personalizada a tu vehículo y necesidades, por favor utiliza nuestro cotizador online o contáctanos.
          </p>
        </header>

        {/* Optional Introductory Text */}
        <section className="mb-12 md:mb-16 text-center prose prose-lg max-w-3xl mx-auto text-slate-600">
            <p>En Tovar3, creemos en la transparencia y en ofrecerte la mejor relación valor-precio. A continuación, encontrarás una guía de nuestros precios iniciales. Recuerda que cada vehículo es único y los precios finales pueden variar.</p>
        </section>

        {/* Service Category Price Sections */}
        <div className="space-y-12 md:space-y-16">
          {servicePriceData.map((category) => (
            <section key={category.categoryName} className="bg-white p-6 md:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">{category.categoryName}</h2>
              {category.description && <p className="text-sm text-slate-500 mb-6">{category.description}</p>}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                {category.prices.map((item) => (
                  <div key={item.service + (item.vehicleType || '')} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-teal-700 text-md">
                      {item.service} {item.vehicleType && <span className="text-xs text-slate-500">({item.vehicleType})</span>}
                    </h3>
                    <p className="text-lg font-bold text-slate-700 my-1">{item.priceRange}</p>
                    {item.details && <p className="text-xs text-slate-500">{item.details}</p>}
                  </div>
                ))}
              </div>
              {category.ctaLink && category.ctaText && (
                <div className="mt-6 text-right">
                    <Link href={category.ctaLink} legacyBehavior>
                        <a className="text-sm text-teal-600 hover:text-teal-700 font-semibold hover:underline">
                            {category.ctaText} &rarr;
                        </a>
                    </Link>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Predefined Service Packages Section */}
        {predefinedPackages.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 text-center">Paquetes de Servicios Destacados</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {predefinedPackages.map((pkg) => (
                <div key={pkg.packageName} className="bg-gradient-to-br from-teal-500 to-green-500 text-white p-6 md:p-8 rounded-xl shadow-2xl flex flex-col">
                  <h3 className="text-2xl font-bold mb-3">{pkg.packageName}</h3>
                  {pkg.description && <p className="text-sm opacity-90 mb-4 flex-grow">{pkg.description}</p>}
                  <ul className="text-sm list-disc list-inside space-y-1 mb-4 opacity-90">
                    {pkg.includedServices.map(service => <li key={service}>{service}</li>)}
                  </ul>
                  <p className="text-xl font-bold mt-auto bg-white/20 px-4 py-2 rounded-md text-center">{pkg.priceRange}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prominent CTAs */}
        <section className="mt-16 md:mt-24 text-center py-10 bg-slate-200 rounded-lg shadow-inner">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6">¿Listo para Dar el Siguiente Paso?</h2>
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/cotizar" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg">
                Ir al Cotizador Online
              </a>
            </Link>
            <Link href="/contacto" legacyBehavior>
              <a className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300">
                Solicitar Cotización Personalizada
              </a>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-12 text-center">
          <p className="text-sm text-slate-500 max-w-2xl mx-auto p-4 bg-yellow-50 border border-yellow-300 rounded-md">
            <strong>Importante:</strong> Todos los precios mostrados en esta página son <strong className="font-semibold">estimados base y están sujetos a cambios</strong> sin previo aviso. El costo final puede variar según el tipo y tamaño exacto del vehículo, la condición de la pintura o superficies, la selección específica de materiales o marcas, y la complejidad del trabajo. Para una cotización final y precisa, es indispensable una inspección del vehículo por parte de nuestro equipo o el uso detallado de nuestro Cotizador Online.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PricesPackagesPage;
