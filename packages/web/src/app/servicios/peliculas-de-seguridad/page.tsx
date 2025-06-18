"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Reusable FeatureItem Component
interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}
const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4 bg-slate-100 rounded-lg hover:shadow-md transition-shadow">
    <div className="text-3xl text-teal-500 mt-1">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
);

// Reusable InfoCard Component
interface InfoCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  details?: { label: string; value: string }[];
}
const InfoCard: React.FC<InfoCardProps> = ({ title, description, imageUrl, details }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
    {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />}
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-2xl font-semibold text-teal-600 mb-3">{title}</h3>
      <p className="text-slate-600 mb-4 text-sm flex-grow">{description}</p>
      {details && details.length > 0 && (
        <div className="space-y-2 mt-auto">
          {details.map(detail => (
            <div key={detail.label} className="text-sm">
              <strong className="text-slate-700">{detail.label}:</strong> <span className="text-slate-500">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// AccordionItem Component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen: initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <div className="border-b border-slate-200">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left text-slate-700 hover:text-teal-600 focus:outline-none">
        <span className="text-md font-medium">{title}</span>
        <svg className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && <div className="py-3 px-1 prose prose-sm max-w-none text-slate-600">{children}</div>}
    </div>
  );
};


const SecurityFilmPage: React.FC = () => {
  const securityBenefits: FeatureItemProps[] = [
    { icon: "🛡️", title: "Anti Cristalazo", description: "Dificulta significativamente la ruptura rápida de vidrios para robo, dándote tiempo para reaccionar o disuadiendo al ladrón." },
    { icon: "💥", title: "Retención de Fragmentos", description: "En caso de impacto o accidente, mantiene unidos los pedazos de vidrio roto, protegiendo a los ocupantes de heridas por esquirlas." },
    { icon: "🔒", title: "Mayor Privacidad (Opcional)", description: "Algunas películas de seguridad vienen con tintes que aumentan la privacidad de tus pertenencias." },
    { icon: "🚫", title: "Disuasión de Robo", description: "Un vidrio que no cede fácilmente puede hacer que los delincuentes desistan de su intento." },
    { icon: "☀️", title: "Protección UV (Adicional)", description: "Muchas películas de seguridad también bloquean hasta el 99% de los rayos UV, protegiendo el interior de tu auto." },
  ];

  const filmTypes: InfoCardProps[] = [
    {
      title: "Película de Seguridad Estándar (4 mil)",
      description: "[Placeholder: Descripción de la película de 4 milésimas de pulgada. Ideal para disuasión básica de 'cristalazos' y retención de fragmentos en accidentes menores. Buen balance costo-beneficio.]",
      imageUrl: "https://via.placeholder.com/400x250/475569/FFFFFF?text=Seguridad+4+mil",
      details: [
        { label: "Espesor", value: "4 mil (aprox. 100 micrones)" },
        { label: "Nivel de Protección", value: "Bueno contra robos rápidos y esquirlas" },
        { label: "Marcas Comunes", value: "[Placeholder: 3M, SunTek, Llumar, etc.]" },
      ]
    },
    {
      title: "Película de Seguridad Reforzada (7-12 mil)",
      description: "[Placeholder: Descripción de películas más gruesas (7 a 12 mil). Ofrecen una resistencia significativamente mayor a impactos fuertes y intentos de intrusión más persistentes. Para máxima protección.]",
      imageUrl: "https://via.placeholder.com/400x250/1E293B/FFFFFF?text=Seguridad+7-12+mil",
      details: [
        { label: "Espesor", value: "7-12 mil (aprox. 175-300 micrones)" },
        { label: "Nivel de Protección", value: "Alto, para mayor seguridad y resistencia" },
        { label: "Marcas Comunes", value: "[Placeholder: Xpel, Madico, Hanita Coatings, etc.]" },
      ]
    },
    {
      title: "Película Anti-Graffiti",
      description: "[Placeholder: Descripción de películas diseñadas para proteger superficies de vidrio contra vandalismo como pintura en spray, rayones con objetos punzantes y ácidos. Se sacrifica para proteger el vidrio original.]",
      imageUrl: "https://via.placeholder.com/400x250/0F172A/FFFFFF?text=Anti-Graffiti+Film",
      details: [
        { label: "Espesor", value: "Varía (ej. 4-6 mil)" },
        { label: "Función Principal", value: "Protección sacrificial contra vandalismo" },
        { label: "Aplicaciones", value: "Transporte público, escaparates, vehículos comerciales" },
      ]
    }
  ];

  const faqs = [
    { title: "¿La película de seguridad afecta la visibilidad o el funcionamiento de los vidrios?", content: "<p>[Respuesta: Las películas de seguridad de calidad son ópticamente claras y no deberían distorsionar la visibilidad. No afectan el funcionamiento normal de los vidrios eléctricos o manuales una vez instaladas y curadas correctamente.]</p>" },
    { title: "¿Es muy notoria la película de seguridad una vez instalada?", content: "<p>[Respuesta: Las películas transparentes son virtualmente invisibles. Si se elige una película de seguridad con tinte, será visible el tinte pero no necesariamente la película en sí. La instalación profesional de Tovar3 asegura bordes limpios y un acabado discreto.]</p>" },
    { title: "¿Cuánto tiempo dura la película de seguridad?", content: "<p>[Respuesta: Depende de la calidad de la película, la instalación y las condiciones de exposición. Las películas de marcas reconocidas suelen tener garantías de 5 a 10 años, o incluso de por vida contra defectos como burbujas, despegamiento o decoloración (si aplica).]</p>" },
    { title: "¿Se puede combinar la película de seguridad con un polarizado normal?", content: "<p>[Respuesta: Sí, es una práctica común. Se puede instalar una película de seguridad transparente y luego aplicar un polarizado de control solar/estético encima, o bien, existen películas de seguridad que ya vienen con diferentes niveles de VLT (tinte). En Tovar3 te asesoramos sobre la mejor combinación.]</p>" },
  ];

  return (
    <div className="bg-white text-slate-800">
      <section className="relative bg-slate-800 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img src="https://via.placeholder.com/1600x600/1E293B/94A3B8?text=Ventana+Segura+Tovar3" alt="Banner Películas de Seguridad" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Películas de Seguridad: Protección Reforzada para tu Tranquilidad</h1>
          <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto">Defensa Activa Contra Cristalazos, Impactos y Vandalismo. Invierte en tu seguridad y la de tus pertenencias.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <section className="mb-12 md:mb-16 scroll-mt-20" id="que-son">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6 text-center">¿Qué son las Películas de Seguridad y Por Qué las Necesitas?</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>[Placeholder: Explicar que las películas de seguridad son láminas de poliéster (generalmente más gruesas que los polarizados convencionales) diseñadas con adhesivos especiales de alta resistencia. Su función principal es aumentar la resistencia del vidrio a la rotura y, en caso de fractura, mantener los fragmentos unidos, evitando que se dispersen peligrosamente o que se facilite el acceso no deseado al interior del vehículo.]</p>
            <p>[Placeholder: Destacar por qué son necesarias en el contexto actual: incremento de robos tipo 'cristalazo', protección en accidentes, e incluso contra vandalismo. Enfatizar que es una medida de seguridad proactiva.]</p>
          </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="beneficios">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">Beneficios Clave de las Películas de Seguridad</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {securityBenefits.map(benefit => <FeatureItem key={benefit.title} {...benefit} />)}
          </div>
        </section>

        <section className="mb-12 md:mb-16 bg-slate-50 p-8 md:p-12 rounded-xl shadow-lg scroll-mt-20" id="tipos-peliculas">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">Tipos y Espesores de Películas de Seguridad Ofrecidas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filmTypes.map(type => <InfoCard key={type.title} {...type} />)}
          </div>
          <p className="text-center mt-10 text-slate-600 max-w-2xl mx-auto">[Placeholder: Breve nota sobre cómo Tovar3 asesora al cliente para elegir el tipo y espesor adecuado según su nivel de riesgo percibido, tipo de vehículo y presupuesto.]</p>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="proceso-instalacion">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">Proceso de Instalación Profesional</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>[Placeholder: Explicar que la instalación de películas de seguridad es un proceso de precisión que requiere experiencia. Detallar brevemente los pasos: 1. Limpieza exhaustiva del vidrio. 2. Aplicación de la película con solución de montaje. 3. Ajuste y eliminación de burbujas/agua. 4. Tiempo de curado del adhesivo. Enfatizar la importancia de una instalación profesional para garantizar la efectividad y durabilidad de la película.]</p>
          </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="especificaciones">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">Especificaciones Técnicas Relevantes (Opcional)</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 bg-slate-100 p-6 rounded-md shadow">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-slate-700">Espesor de la Película:</strong> [Placeholder: Medido en 'mil' (milésimas de pulgada). Comúnmente 4 mil, 7 mil, hasta 12+ mil. Mayor espesor generalmente implica mayor resistencia.]</li>
              <li><strong className="text-slate-700">Resistencia a la Tracción (Tensile Strength):</strong> [Placeholder: Mide la fuerza necesaria para romper la película. Ej: >25,000 psi.]</li>
              <li><strong className="text-slate-700">Resistencia al Rasgado (Tear Strength):</strong> [Placeholder: Mide la capacidad de la película para resistir la propagación de un corte. Ej: >100 lbs/pulgada.]</li>
              <li><strong className="text-slate-700">Elongación a la Ruptura (Break Strength/Elongation):</strong> [Placeholder: Cuánto puede estirarse la película antes de romperse. Ej: >100%.]</li>
            </ul>
            <p className="text-sm mt-4">[Placeholder: Nota aclaratoria de que estas especificaciones varían según marca y producto, y Tovar3 proveerá fichas técnicas si se requieren.]</p>
          </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="testimonios">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">Testimonios de Clientes Satisfechos</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {[1,2].map(i => (
                    <blockquote key={i} className="p-6 bg-slate-50 rounded-lg shadow-md border-l-4 border-teal-500">
                        <p className="italic text-slate-600 mb-4">"[Placeholder: Testimonio de cliente {i} destacando cómo la película de seguridad le dio tranquilidad o ayudó en una situación real. Mencionar tipo de auto o situación si es relevante.]"</p>
                        <footer className="text-sm text-slate-700 font-semibold">- [Placeholder: Nombre Cliente {i}], [Vehículo Cliente {i}]</footer>
                    </blockquote>
                ))}
            </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="faq-seguridad">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">Preguntas Frecuentes sobre Películas de Seguridad</h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.title}>{faq.content}</AccordionItem>
            ))}
          </div>
        </section>

        <section className="text-center py-10 scroll-mt-20" id="cta-seguridad">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">Refuerza la Seguridad de tu Vehículo Hoy Mismo</h2>
          <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-4">
            <Link href="/cotizar?service=seguridad" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg min-w-[200px]">
                Cotizar Película de Seguridad
              </a>
            </Link>
            <a href="#tipos-peliculas" className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 min-w-[200px]">
                Ver Niveles de Protección
            </a>
            <Link href="/contacto" legacyBehavior>
              <a className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 min-w-[200px]">
                Contacta para Asesoría
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SecurityFilmPage;
