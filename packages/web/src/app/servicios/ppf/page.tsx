"use client"; // Can be removed if no client-side interactivity is needed later

import React from 'react';
import Link from 'next/link';

// Reusable FeatureItem Component (from CarWrapPage or similar)
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

// Reusable FilmInfoCard (adaptable from FilmTypeCard or WrapTypeCard)
interface FilmInfoCardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional image
  details: { label: string; value: string }[];
}

const FilmInfoCard: React.FC<FilmInfoCardProps> = ({ title, description, imageUrl, details }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-shadow duration-300">
    {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />}
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-teal-600 mb-3">{title}</h3>
      <p className="text-slate-600 mb-4 text-sm">{description}</p>
      <div className="space-y-2">
        {details.map(detail => (
          <div key={detail.label} className="text-sm">
            <strong className="text-slate-700">{detail.label}:</strong> <span className="text-slate-500">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const PpfPage: React.FC = () => {
  const ppfBenefits: FeatureItemProps[] = [
    { icon: "🛡️", title: "Resistencia a Rayones", description: "Protege contra rayones de llaves, ramas, lavados incorrectos y otros daños superficiales." },
    { icon: "💎", title: "Defensa Contra Impactos", description: "Absorbe el impacto de piedras pequeñas, gravilla y otros escombros del camino, evitando picaduras." },
    { icon: "🧪", title: "Barrera Ambiental", description: "Resiste contaminantes como excrementos de aves, insectos, savia de árboles y lluvia ácida." },
    { icon: "✨", title: "Propiedades Auto-Curativas", description: "Muchas películas PPF de alta calidad pueden 'auto-curar' rayones leves con calor (sol o agua tibia)." },
    { icon: "☀️", title: "Claridad y Brillo", description: "Prácticamente invisible, mantiene la claridad y el brillo original de tu pintura, realzando su profundidad." },
    { icon: "📈", title: "Conserva Valor de Reventa", description: "Mantiene la pintura de tu auto en condiciones impecables, maximizando su valor al momento de venderlo." },
  ];

  const filmTypes: FilmInfoCardProps[] = [
    {
      title: "PPF Transparente Estándar",
      description: "La opción más popular, ofreciendo una capa invisible de protección robusta. Ideal para mantener el look original de la pintura.",
      details: [
        { label: "Acabado", value: "Alto brillo, prácticamente invisible" },
        { label: "Espesor Común", value: "6-8 mils (Placeholder)" },
        { label: "Garantía Típica", value: "5-10 años (Placeholder)" },
        { label: "Propiedades", value: "Auto-curativo (mayoría de marcas premium), hidrofóbico" },
      ]
    },
    {
      title: "PPF Mate (Stealth)",
      description: "Proporciona la misma protección que el PPF transparente, pero con un elegante acabado mate o satinado. Perfecto para pinturas mate de fábrica o para transformar un acabado brillante.",
      details: [
        { label: "Acabado", value: "Mate / Satinado" },
        { label: "Espesor Común", value: "6-8 mils (Placeholder)" },
        { label: "Garantía Típica", value: "5-10 años (Placeholder)" },
        { label: "Propiedades", value: "Auto-curativo, hidrofóbico, transforma el look" },
      ]
    },
    {
      title: "PPF de Color y Texturizado",
      description: "Opciones más nuevas que combinan la protección del PPF con la estética del wrap, ofreciendo colores sólidos o incluso texturas como fibra de carbono, pero con mayor grosor y protección.",
      details: [
        { label: "Acabado", value: "Colores sólidos, texturas (ej. carbono)" },
        { label: "Espesor Común", value: "Varía, puede ser mayor que el estándar" },
        { label: "Garantía Típica", value: "Consultar por producto (Placeholder)" },
        { label: "Propiedades", value: "Protección y estética combinadas" },
      ]
    }
  ];


  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-slate-700 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src="https://via.placeholder.com/1600x600/334155/E2E8F0?text=PPF+Protegiendo+Auto" // Placeholder image
            alt="Paint Protection Film Hero Banner"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Máxima Protección para la Pintura de tu Vehículo
          </h1>
          <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto">
            Conserva el valor y la belleza de tu auto con Paint Protection Film (PPF) de última generación. Defensa invisible contra los daños del día a día.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Section: Qué es el PPF y Por Qué lo Necesitas */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6 text-center">
            ¿Qué es el Paint Protection Film (PPF) y Por Qué lo Necesitas?
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>
              El Paint Protection Film (PPF), también conocido como película de protección de pintura o "escudo transparente", es una <strong className="text-teal-600">película de uretano termoplástico transparente y altamente resistente</strong> que se aplica a la superficie pintada de un vehículo. Su propósito principal es proteger la pintura de daños causados por una amplia variedad de factores externos.
            </p>
            <p>
              Imagina una segunda piel para tu auto, una barrera invisible pero increíblemente fuerte que absorbe los impactos y previene el desgaste. En Tovar3, consideramos el PPF como una <strong className="text-teal-600">inversión esencial para cualquier propietario</strong> que desee mantener su vehículo en condiciones impecables por más tiempo, preservando tanto su estética como su valor de reventa.
            </p>
          </div>
        </section>

        {/* Section: Beneficios del PPF */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Beneficios Clave del PPF
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ppfBenefits.map(benefit => (
              <FeatureItem key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        {/* Section: Áreas Comunes de Aplicación */}
        <section className="mb-12 md:mb-16 bg-slate-50 p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">
            Áreas Comunes de Aplicación de PPF
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg text-slate-600">
              <p>El PPF puede aplicarse a prácticamente cualquier superficie pintada. Los paquetes más comunes incluyen:</p>
              <ul className="list-disc pl-5 space-y-1 text-teal-700 font-medium">
                <li><strong>Kit Frontal Completo:</strong> Capó completo, defensas delanteras completas, espejos laterales, faros. Es la opción más popular por cubrir las zonas de mayor impacto.</li>
                <li><strong>Kit Frontal Parcial:</strong> Franja del capó (primeros 20-30cm), parte de las defensas, espejos laterales.</li>
                <li><strong>Full Car PPF:</strong> Cobertura total de todas las superficies pintadas del vehículo para máxima protección.</li>
                <li><strong>Zonas de Alto Impacto:</strong> Bordes de puertas, copas de manijas, estribos, zona de carga de la cajuela.</li>
              </ul>
              <p className="mt-4">Podemos personalizar la cobertura según tus necesidades y presupuesto.</p>
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://via.placeholder.com/500x400/E2E8F0/334155?text=Diagrama+Áreas+PPF+Vehículo"
                alt="Diagrama de áreas de aplicación de PPF"
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Section: Tipos de Películas PPF y Marcas */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Tipos de Películas PPF y Marcas Reconocidas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filmTypes.map(film => (
              <FilmInfoCard key={film.title} {...film} />
            ))}
          </div>
          <p className="text-center mt-10 text-slate-600 max-w-2xl mx-auto">
            En Tovar3 trabajamos con las <strong className="text-teal-600">mejores marcas de PPF del mercado</strong> (Placeholder: Xpel, SunTek, 3M Scotchgard Pro, Llumar, etc.), asegurando productos de la más alta calidad, durabilidad y con excelentes garantías. Te asesoraremos sobre la mejor opción para tu vehículo y necesidades.
          </p>
        </section>

        {/* Section: Nuestro Proceso de Instalación de Precisión */}
        <section className="mb-12 md:mb-16 text-center bg-teal-700 text-white py-12 md:py-16 px-6 rounded-xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nuestro Proceso de Instalación de Precisión
          </h2>
          <div className="prose prose-lg prose-invert max-w-3xl mx-auto">
            <p>
              La instalación de PPF requiere habilidad, experiencia y una atención meticulosa al detalle. Nuestro equipo de <strong className="text-yellow-300">instaladores certificados</strong> sigue un proceso riguroso:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-left inline-block">
                <li>Lavado y descontaminación exhaustiva de la pintura.</li>
                <li>Corrección de pintura si es necesario para asegurar una superficie perfecta.</li>
                <li>Uso de software de corte y plotters para patrones precisos (o instalación a granel por expertos).</li>
                <li>Aplicación cuidadosa de la película, utilizando soluciones de deslizamiento y fijación.</li>
                <li>Aseguramiento de bordes y eliminación de cualquier imperfección.</li>
                <li>Inspección final para garantizar un acabado invisible y duradero.</li>
            </ol>
            <p className="mt-6">Nos enorgullecemos de ofrecer instalaciones que son virtualmente indetectables.</p>
          </div>
        </section>

        {/* CTAs */}
        <section className="text-center py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">
            Protege tu Inversión y Disfruta de una Pintura Impecable
          </h2>
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/cotizador" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg">
                Cotiza la Protección con PPF
              </a>
            </Link>
            <Link href="/blog" legacyBehavior>
              {/* Placeholder for blog/resources */}
              <a className="inline-block bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg text-md transition duration-300">
                Aprende Más sobre Cuidado Automotriz
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PpfPage;
