"use client"; // Can be removed if no client-side interactivity is needed later

import React from 'react';
import Link from 'next/link';

// Reusable FeatureItem Component (from CarWrapPage or PpfPage)
interface FeatureItemProps {
  icon: string; // Emoji or SVG class
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

// Reusable InfoCard (adaptable from FilmInfoCard or similar)
interface InfoCardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional image
  details?: { label: string; value: string }[]; // Optional details
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


const CeramicCoatingPage: React.FC = () => {
  const ceramicBenefits: FeatureItemProps[] = [
    { icon: "💧", title: "Propiedades Hidrofóbicas", description: "Repele el agua y la suciedad, facilitando la limpieza y manteniendo el auto limpio por más tiempo." },
    { icon: "☀️", title: "Protección UV", description: "Protege la pintura contra la decoloración y oxidación causadas por los rayos solares." },
    { icon: "🛡️", title: "Resistencia a Micro-Rayones", description: "Ofrece una capa dura que ayuda a prevenir rayones finos y marcas de remolino (swirl marks)." },
    { icon: "🧪", title: "Resistencia Química", description: "Protege contra contaminantes como excrementos de aves, lluvia ácida, y savia de árboles." },
    { icon: "✨", title: "Brillo Profundo y Duradero", description: "Realza la profundidad del color y proporciona un brillo tipo espejo espectacular." },
    { icon: "🧼", title: "Facilidad de Mantenimiento", description: "La superficie lisa y repelente hace que lavar el auto sea mucho más rápido y sencillo." },
  ];

  const coatingTypes: InfoCardProps[] = [
    {
      title: "Recubrimiento Cerámico Profesional (9H+)",
      description: "Nuestra opción más robusta y duradera. Ofrece la máxima protección, dureza (9H o superior en la escala de Mohs) y longevidad. Ideal para quienes buscan lo mejor.",
      imageUrl: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=Cerámico+Pro",
      details: [
        { label: "Duración Estimada", value: "3-5 años (o más con mantenimiento)" },
        { label: "Dureza", value: "9H+" },
        { label: "Capas Comunes", value: "1-3 capas" },
      ]
    },
    {
      title: "Recubrimiento Cerámico 'Light' o de Consumo",
      description: "Una excelente opción para quienes buscan los beneficios del cerámico con una aplicación más sencilla y un costo menor. Buena protección y brillo.",
      imageUrl: "https://via.placeholder.com/400x250/6366F1/FFFFFF?text=Cerámico+Light",
      details: [
        { label: "Duración Estimada", value: "1-2 años" },
        { label: "Dureza", value: "Varía (generalmente menor a 9H)" },
        { label: "Capas Comunes", value: "1 capa" },
      ]
    },
    {
      title: "Recubrimientos Específicos",
      description: "Ofrecemos también recubrimientos cerámicos formulados para superficies específicas como rines, vidrios y plásticos, maximizando su protección y durabilidad.",
      imageUrl: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Cerámico+Específico",
      details: [
        { label: "Aplicaciones", value: "Rines, Vidrios, Plásticos Interiores/Exteriores" },
        { label: "Beneficios", value: "Adaptados a cada material" },
      ]
    }
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-slate-800 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src="https://via.placeholder.com/1600x600/0F172A/64748B?text=Brillo+Cerámico+Espectacular"
            alt="Banner Recubrimiento Cerámico"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Recubrimiento Cerámico: Protección Avanzada y Brillo Espectacular
          </h1>
          <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto">
            Descubre la nanotecnología que blinda tu pintura, repele la suciedad y realza la belleza de tu vehículo como nunca antes.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Introductory Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6 text-center">
            ¿Qué es el Recubrimiento Cerámico?
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>
              Un recubrimiento cerámico es un <strong className="text-teal-600">polímero líquido</strong> que se aplica a mano sobre la pintura de un vehículo. Al curarse, forma una capa protectora transparente y extremadamente dura que se adhiere químicamente a la laca original. Esta capa, basada en nanotecnología (generalmente dióxido de silicio - SiO2), es mucho más resistente y duradera que las ceras o selladores tradicionales.
            </p>
            <p>
              El resultado es una superficie increíblemente <strong className="text-teal-600">lisa, brillante e hidrofóbica</strong> (repele el agua). No solo protege tu inversión contra los elementos, sino que también facilita enormemente el mantenimiento y mantiene tu auto luciendo como nuevo por años.
            </p>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Principales Beneficios del Recubrimiento Cerámico
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ceramicBenefits.map(benefit => (
              <FeatureItem key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        {/* Types of Ceramic Coatings Section */}
        <section className="mb-12 md:mb-16 bg-slate-50 p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Tipos de Recubrimientos Cerámicos que Ofrecemos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coatingTypes.map(type => (
              <InfoCard key={type.title} {...type} />
            ))}
          </div>
           <p className="text-center mt-10 text-slate-600 max-w-2xl mx-auto">
            La elección del recubrimiento ideal dependerá de tu presupuesto, el nivel de protección deseado y el tiempo que planeas conservar tu vehículo. <strong className="text-teal-600">En Tovar3 te asesoramos para tomar la mejor decisión.</strong>
          </p>
        </section>

        {/* Application Process Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">
            Nuestro Proceso de Aplicación Profesional
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>
              Una aplicación correcta es crucial para maximizar los beneficios y la durabilidad de un recubrimiento cerámico. Nuestro proceso es exhaustivo:
            </p>
            <ol className="list-decimal pl-5 space-y-2 marker:text-teal-600 marker:font-semibold">
              <li><strong className="text-slate-700">Lavado Detallado:</strong> Eliminación completa de suciedad y contaminantes sueltos.</li>
              <li><strong className="text-slate-700">Descontaminación Química y Mecánica:</strong> Uso de clay bar y removedores de hierro/alquitrán para una superficie perfectamente lisa.</li>
              <li><strong className="text-slate-700">Corrección de Pintura (Pulido):</strong> Esencial para eliminar imperfecciones (rayones, swirls) y asegurar la máxima adhesión y brillo. Este paso varía en intensidad según el estado de la pintura.</li>
              <li><strong className="text-slate-700">Limpieza Final y Preparación de Superficie:</strong> Eliminación de aceites de pulido con un preparador de superficies (panel wipe).</li>
              <li><strong className="text-slate-700">Aplicación del Recubrimiento:</strong> Aplicación cuidadosa y uniforme del producto, panel por panel, siguiendo las especificaciones del fabricante.</li>
              <li><strong className="text-slate-700">Nivelado y Retiro de Exceso:</strong> En el momento preciso, se retira el exceso de producto para un acabado perfecto.</li>
              <li><strong className="text-slate-700">Curado:</strong> El vehículo debe permanecer en un ambiente controlado y seco durante el tiempo de curado inicial (generalmente 12-24 horas). El curado completo puede tardar varios días o semanas.</li>
            </ol>
            <p className="mt-4">Este meticuloso proceso asegura que el recubrimiento se adhiera correctamente y ofrezca su máximo potencial de protección y brillo.</p>
          </div>
        </section>

        {/* Care and Maintenance Section */}
        <section className="mb-12 md:mb-16 bg-teal-50 p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-semibold text-teal-700 mb-8 text-center">
            Cuidado y Mantenimiento de tu Vehículo con Cerámico
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600">
            <p>Aunque los recubrimientos cerámicos facilitan mucho el mantenimiento, algunos cuidados ayudarán a prolongar su vida y efectividad:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-slate-700">Lavado Regular:</strong> Utiliza un shampoo de pH neutro y la técnica de los dos baldes para evitar rayones.</li>
              <li><strong className="text-slate-700">Evita Lavados Automáticos con Cepillos:</strong> Pueden ser abrasivos. Prefiere lavados a mano o sin contacto.</li>
              <li><strong className="text-slate-700">Secado Cuidadoso:</strong> Usa toallas de microfibra de alta calidad o sopladores de aire.</li>
              <li><strong className="text-slate-700">Aplicación de "Boosters" o "Toppers":</strong> Algunos productos específicos (SiO2 sprays) pueden usarse periódicamente para revitalizar las propiedades hidrofóbicas y el brillo. Te recomendaremos los adecuados.</li>
              <li><strong className="text-slate-700">No Usar Ceras Tradicionales:</strong> No son necesarias y pueden interferir con las propiedades del cerámico.</li>
            </ul>
          </div>
        </section>

        {/* CTAs */}
        <section className="text-center py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">
            Experimenta la Diferencia Cerámica en Tu Vehículo
          </h2>
          <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-4">
            <Link href="/cotizar?service=ceramico" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg min-w-[200px]">
                Cotizar Recubrimiento Cerámico
              </a>
            </Link>
            <Link href="/proyectos?filter=ceramico" legacyBehavior>
              <a className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 min-w-[200px]">
                Ver Proyectos con Cerámico
              </a>
            </Link>
            <Link href="/contacto" legacyBehavior>
              <a className="inline-block bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 min-w-[200px]">
                Contactar Expertos
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CeramicCoatingPage;
