"use client"; // Required for useState and event handlers in accordion

import React, { useState } from 'react';
import Link from 'next/link';

// AccordionItem Component (Reused from LegalPage)
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean; // Optional: to control initial open state
  onClick?: () => void; // Optional: if parent needs to know about clicks
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen: initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left text-slate-700 hover:text-teal-600 focus:outline-none"
      >
        <span className="text-lg font-medium">{title}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="py-5 px-1 prose prose-slate max-w-none text-slate-600">
          {children}
        </div>
      )}
    </div>
  );
};

// Benefit Card Component
interface BenefitCardProps {
  icon: string; // Emoji or SVG class
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="text-4xl text-teal-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

// Film Type Card Component
interface FilmTypeCardProps {
  title: string;
  description: string;
  vltRange: string;
  tserPlaceholder: string;
  irRejectionPlaceholder: string;
}

const FilmTypeCard: React.FC<FilmTypeCardProps> = ({ title, description, vltRange, tserPlaceholder, irRejectionPlaceholder }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-2xl font-semibold text-teal-600 mb-3">{title}</h3>
    <p className="text-slate-600 mb-4">{description}</p>
    <div className="space-y-2 text-sm">
      <p><strong className="text-slate-700">Rango VLT Legal Común:</strong> {vltRange}</p>
      <p><strong className="text-slate-700">TSER (Total Solar Energy Rejection):</strong> {tserPlaceholder}</p>
      <p><strong className="text-slate-700">Rechazo IR (Infrarrojo):</strong> {irRejectionPlaceholder}</p>
    </div>
    <p className="mt-3 text-xs text-slate-500">Las especificaciones exactas pueden variar según la línea de producto específica. Te asesoraremos.</p>
  </div>
);


const LegalWindowTintPage: React.FC = () => {
  const faqs = [
    {
      question: "¿Cuál es el nivel de polarizado permitido en León, Guanajuato?",
      answer: "<p>El Artículo 99 del Reglamento de Policía y Vialidad es la referencia. Aunque no especifica un porcentaje exacto de VLT (Visible Light Transmission), se interpreta comúnmente que los vidrios delanteros laterales deben permitir una clara visibilidad hacia el interior. En Tovar3, recomendamos películas con VLT entre 35% y 50% para estas áreas, mientras que los vidrios traseros (medallón y laterales traseros) pueden tener un VLT más bajo (más oscuros), siempre que el vehículo cuente con espejos retrovisores laterales.</p>"
    },
    {
      question: "¿Qué pasa si me detienen y mi polarizado es demasiado oscuro?",
      answer: "<p>Si tu polarizado no cumple con la interpretación de la autoridad, podrías ser acreedor a una multa. Nuestra garantía de cumplimiento legal en Tovar3 te respalda si has seguido nuestras recomendaciones para polarizado legal, apoyándote en el proceso de aclaración.</p>"
    },
    {
      question: "¿El polarizado legal realmente ayuda con el calor?",
      answer: "<p>¡Absolutamente! Las películas de control solar, incluso las de tonos claros permitidos, están diseñadas con tecnología (como cerámica o nanocarbono) para rechazar una cantidad significativa de energía solar infrarroja (calor) y rayos UV, manteniendo tu auto más fresco y confortable.</p>"
    },
    {
      question: "Tengo un permiso especial para polarizado oscuro, ¿ustedes lo instalan?",
      answer: "<p>Si cuentas con un permiso emitido por la autoridad competente que justifique la necesidad de un polarizado con VLT menor al usualmente permitido (por razones médicas, por ejemplo), podemos realizar la instalación según tus especificaciones. Es importante que siempre portes dicho permiso.</p>"
    }
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-slate-700 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src="https://via.placeholder.com/1600x600/1E293B/475569?text=Polarizado+Legal+Tovar3" // Placeholder image
            alt="Banner Polarizado Legal"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Polarizado Legal y Garantizado en León
          </h1>
          <p className="text-xl md:text-3xl text-slate-300">
            Tranquilidad y Cumplimiento del Artículo 99 para tu Vehículo.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Section: Entendiendo el Artículo 99 */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6 text-center">
            Entendiendo el Artículo 99 y la Normativa Local
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>
              El Artículo 99 del Reglamento de Policía y Vialidad para el Municipio de León, Guanajuato, es la clave para un polarizado sin problemas. Si bien no establece un porcentaje exacto de transmisión de luz visible (VLT) de forma explícita para todos los casos, su espíritu es garantizar la <strong className="text-teal-600">seguridad y la correcta identificación</strong> de los ocupantes del vehículo.
            </p>
            <p>
              En Tovar3, nuestra interpretación se basa en años de experiencia y un profundo conocimiento de la aplicación local de la norma:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-teal-600">Visibilidad Clara:</strong> Se prioriza que los vidrios delanteros laterales (conductor y copiloto) permitan una visibilidad clara hacia el interior. Generalmente, esto se traduce en un VLT no inferior al 35-50%.</li>
              <li><strong className="text-teal-600">Vidrios Traseros:</strong> Hay mayor flexibilidad para los vidrios laterales traseros y el medallón, pudiendo ser más oscuros, siempre y cuando el vehículo cuente con espejos retrovisores exteriores funcionales en ambos lados.</li>
              <li><strong className="text-teal-600">Parabrisas:</strong> Usualmente, solo se permite una franja de protección solar en la parte superior del parabrisas, sin obstruir la visión del conductor.</li>
            </ul>
            <p>
              El <strong className="text-teal-600">VLT (Visible Light Transmission)</strong> indica el porcentaje de luz visible que atraviesa el vidrio y la película. Un VLT más bajo significa un polarizado más oscuro. Te asesoraremos para elegir el VLT adecuado que combine estética, confort y cumplimiento legal.
            </p>
          </div>
        </section>

        {/* Section: Nuestra Garantía de Cumplimiento Legal */}
        <section className="mb-12 md:mb-16 bg-teal-50 p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-semibold text-teal-700 mb-8 text-center">
            Nuestra Garantía de Cumplimiento Legal
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg text-slate-600">
              <p>
                En Tovar3, tu tranquilidad es primordial. Por ello, te ofrecemos una <strong className="text-teal-600">Garantía de Cumplimiento Legal</strong> con nuestros servicios de polarizado recomendados como 'legales':
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-teal-500">✅</span>
                  <span>Selección de películas que se ajustan a la interpretación local del Artículo 99.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-teal-500">🛡️</span>
                  <span>Asesoría experta para que elijas el tono y tipo de polarizado correcto y evites sanciones.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 text-teal-500">🤝</span>
                  <span>En caso de una multa atribuible directamente a un polarizado que te garantizamos como legal (y no por otras causas), te ofrecemos respaldo y apoyo en el proceso de aclaración.</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/300x300/99F6E4/0F766E?text=Garantía+Tovar3" alt="Garantía Tovar3" className="rounded-lg shadow-md"/>
            </div>
          </div>
        </section>

        {/* Section: Beneficios del Polarizado Legal */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Beneficios del Polarizado Legal
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard icon="☀️" title="Protección UV Extrema" description="Bloquea más del 99% de los rayos UV, cuidando tu piel y evitando la decoloración de los interiores de tu auto."/>
            <BenefitCard icon="🌡️" title="Reducción de Calor" description="Disfruta de un ambiente interior más fresco y confortable, reduciendo la carga del aire acondicionado."/>
            <BenefitCard icon="🛡️" title="Seguridad y Privacidad" description="Aumenta la resistencia del vidrio ante impactos y disuade a los curiosos, protegiendo tus pertenencias."/>
            <BenefitCard icon="👁️" title="Menos Deslumbramiento" description="Conduce con mayor seguridad al reducir el molesto resplandor del sol y las luces de otros vehículos."/>
            <BenefitCard icon="🌿" title="Conservación Interior" description="Alarga la vida útil de tapicerías y plásticos al protegerlos de la degradación solar."/>
            <BenefitCard icon="📜" title="Cumplimiento Normativo" description="Todos los beneficios anteriores, con la tranquilidad de estar cumpliendo las regulaciones locales."/>
          </div>
        </section>

        {/* Section: Tipos de Películas Legales */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Tipos de Películas Legales que Ofrecemos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <FilmTypeCard
              title="Películas Cerámicas"
              description="La opción premium para máximo rechazo de calor (IR) y protección UV, sin interferir con señales electrónicas. Claridad óptica superior."
              vltRange="35%, 50%, 70% (Comunes para legalidad frontal)"
              tserPlaceholder="Hasta 60-70% (Placeholder)"
              irRejectionPlaceholder="Hasta 90-97% (Placeholder)"
            />
            <FilmTypeCard
              title="Películas de Nanocarbono"
              description="Excelente durabilidad y rechazo de calor. Color estable que no se decolora con el tiempo. Gran balance costo-beneficio."
              vltRange="35%, 50% (Comunes para legalidad frontal)"
              tserPlaceholder="Hasta 50-60% (Placeholder)"
              irRejectionPlaceholder="Hasta 80-85% (Placeholder)"
            />
             <FilmTypeCard
              title="Películas Tintadas Estándar (Dyed)"
              description="Opción económica que provee privacidad y reducción de deslumbramiento. Principalmente estéticas con menor rechazo de calor que cerámica o carbono."
              vltRange="35%, 50% (Comunes para legalidad frontal)"
              tserPlaceholder="Hasta 30-45% (Placeholder)"
              irRejectionPlaceholder="Hasta 10-20% (Placeholder)"
            />
             <FilmTypeCard
              title="Películas de Seguridad Claras"
              description="Aunque no son oscuras (alto VLT), estas películas aumentan significativamente la resistencia del vidrio a impactos y vandalismo. Pueden combinarse con películas de control solar."
              vltRange="70% o más (Prácticamente transparentes)"
              tserPlaceholder="Varía, algunas ofrecen control solar básico"
              irRejectionPlaceholder="Varía"
            />
          </div>
          <p className="text-center mt-8 text-slate-600">
            La elección dependerá de tus prioridades: máximo confort térmico, estética, presupuesto o seguridad. <strong className="text-teal-600">Te asesoraremos personalmente.</strong>
          </p>
        </section>

        {/* Section: Nuestro Proceso de Instalación */}
        <section className="mb-12 md:mb-16 text-center bg-slate-100 py-12 px-6 rounded-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6">
            Nuestro Proceso de Instalación Profesional
          </h2>
          <div className="prose prose-lg max-w-2xl mx-auto text-slate-600">
            <p>
              En Tovar3, cada instalación es un arte. Utilizamos <strong className="text-teal-600">materiales de la más alta calidad</strong> y técnicas precisas para asegurar un acabado perfecto, sin burbujas ni imperfecciones. Nuestro equipo cuida cada detalle, desde la preparación meticulosa del vidrio hasta el curado final, garantizando la durabilidad y el rendimiento óptimo de tu polarizado.
            </p>
            {/* Could add a few steps here visually if desired later */}
          </div>
        </section>

        {/* Section: FAQs */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Preguntas Frecuentes sobre Polarizado Legal
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.question}>
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionItem>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="text-center py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">
            Obtén los Beneficios del Polarizado Legal Hoy Mismo
          </h2>
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/cotizador" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg">
                Cotizar Ahora tu Polarizado Legal
              </a>
            </Link>
            <Link href="/galeria" legacyBehavior>
              <a className="inline-block bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg text-md transition duration-300">
                Explora Nuestros Trabajos
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalWindowTintPage;
