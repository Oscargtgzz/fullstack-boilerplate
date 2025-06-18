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

// Reusable InfoCard Component for VLT levels
interface VltInfoCardProps {
  vlt: string; // e.g., "70%", "50%", "5%"
  title: string; // e.g., "Máxima Claridad y Protección Sutil"
  description: string;
  imageUrl?: string;
  legalityNote?: string; // Specific note on legality for this VLT
}
const VltInfoCard: React.FC<VltInfoCardProps> = ({ vlt, title, description, imageUrl, legalityNote }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
    {imageUrl && <img src={imageUrl} alt={`Polarizado Nanocerámico ${vlt}`} className="w-full h-40 object-cover" />}
    <div className="p-5 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-teal-600 mb-1">VLT {vlt}</h3>
      <p className="text-lg font-semibold text-slate-700 mb-2">{title}</p>
      <p className="text-slate-600 text-sm mb-3 flex-grow">{description}</p>
      {legalityNote && <p className="text-xs text-orange-600 font-medium mt-auto">{legalityNote}</p>}
    </div>
  </div>
);

// AccordionItem Component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
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


const NanoceramicTintPage: React.FC = () => {
  const nanoceramicBenefits: FeatureItemProps[] = [
    { icon: "🔥", title: "Rechazo de Calor Superior (TSER)", description: "[Placeholder: Explica qué es TSER (Total Solar Energy Rejected) y cómo las películas nanocerámicas ofrecen un alto porcentaje, resultando en un interior significativamente más fresco y confortable, reduciendo la carga del A/C.]" },
    { icon: "☀️", title: "Alto Rechazo de Infrarrojos (IR)", description: "[Placeholder: Detalla que los rayos IR son los principales responsables de la sensación de calor. Las nanocerámicas bloquean un alto porcentaje de IR (>90% en películas premium) sin necesidad de ser muy oscuras.]" },
    { icon: "🛡️", title: "Bloqueo UV Casi Total (>99%)", description: "[Placeholder: Protección máxima contra rayos UVA y UVB, cuidando la piel de los ocupantes y previniendo la decoloración y envejecimiento prematuro de los interiores del vehículo (tablero, asientos).]" },
    { icon: "💎", title: "Claridad Óptica Excepcional", description: "[Placeholder: A diferencia de algunas películas metálicas, las nanocerámicas no causan distorsión visual y ofrecen una visión nítida hacia el exterior, tanto de día como de noche.]" },
    { icon: "📡", title: "Sin Interferencia de Señales", description: "[Placeholder: Al no contener metales, no interfieren con señales de celular, GPS, radio, TAGs de telepeaje u otros dispositivos electrónicos.]" },
    { icon: "⏳", title: "Durabilidad y Estabilidad de Color", description: "[Placeholder: Las películas nanocerámicas de calidad no se decoloran (no se ponen moradas o burbujean) con el tiempo, manteniendo su apariencia y rendimiento por muchos años.]" },
  ];

  const vltOptions: VltInfoCardProps[] = [
    { vlt: "70%", title: "Claridad Máxima, Protección Discreta", description: "[Placeholder: Ideal para quienes desean alta protección IR y UV sin alterar significativamente la apariencia original del vehículo. Excelente para parabrisas (donde la ley lo permite) o para máxima visibilidad.]", imageUrl: "https://via.placeholder.com/300x200/E0F2F7/00796B?text=Nano+70%25", legalityNote: "Generalmente permitido en parabrisas y vidrios delanteros en muchas regiones." },
    { vlt: "50%", title: "Balance entre Estética y Confort", description: "[Placeholder: Tono claro que ofrece privacidad moderada y excelente rechazo de calor. Popular para vidrios delanteros laterales donde se busca cumplimiento y confort.]", imageUrl: "https://via.placeholder.com/300x200/B2DFDB/00796B?text=Nano+50%25", legalityNote: "A menudo recomendado para vidrios delanteros laterales en León." },
    { vlt: "35%", title: "Privacidad y Protección Mejoradas", description: "[Placeholder: Tono medio popular que ofrece buena privacidad y un significativo rechazo de calor. Cumple con regulaciones en muchas áreas para vidrios delanteros laterales o traseros.]", imageUrl: "https://via.placeholder.com/300x200/80CBC4/00796B?text=Nano+35%25", legalityNote: "Cumple la normativa en León para vidrios laterales delanteros." },
    { vlt: "20%", title: "Estilo Deportivo y Mayor Privacidad", description: "[Placeholder: Tono más oscuro, ideal para vidrios traseros (laterales y medallón), ofreciendo excelente privacidad y máximo rechazo de calor para los pasajeros de atrás.]", imageUrl: "https://via.placeholder.com/300x200/4DB6AC/004D40?text=Nano+20%25", legalityNote: "Recomendado para vidrios traseros en León." },
    { vlt: "5%", title: "Máxima Privacidad (Tipo Limusina)", description: "[Placeholder: El tono más oscuro disponible, generalmente usado en vidrios traseros para máxima privacidad o en vehículos especiales. Ofrece el mayor rechazo de calor posible.]", imageUrl: "https://via.placeholder.com/300x200/26A69A/004D40?text=Nano+5%25", legalityNote: "Solo para vidrios traseros. No permitido en delanteros." },
  ];

  const faqs = [
    { title: "¿Es el polarizado nanocerámico mucho más caro que otros tipos?", content: "<p>[Respuesta: Sí, generalmente tiene un costo inicial más alto debido a la tecnología avanzada y los materiales utilizados. Sin embargo, sus beneficios superiores en rechazo de calor, durabilidad y claridad a menudo justifican la inversión a largo plazo, pudiendo incluso ahorrar en A/C.]</p>" },
    { title: "¿Cuánto tiempo dura el polarizado nanocerámico?", content: "<p>[Respuesta: Las películas nanocerámicas de alta calidad de marcas reconocidas suelen tener garantías de por vida contra defectos como decoloración, burbujas o despegamiento. Su efectividad en rechazo de calor puede disminuir ligeramente con los años, pero sigue siendo superior por mucho tiempo.]</p>" },
    { title: "¿Cómo se compara el nanocerámico con el polarizado cerámico 'normal'?", content: "<p>[Respuesta: 'Nanocerámico' usualmente se refiere a la tecnología más avanzada dentro de las películas cerámicas, utilizando partículas cerámicas aún más pequeñas (nanoescala) para un mejor rendimiento en selectividad espectral (alto rechazo IR/UV con alta claridad). Puede haber películas 'cerámicas' básicas y 'nanocerámicas' premium. En Tovar3 te explicamos las diferencias específicas de los productos que manejamos.]</p>" },
    { title: "¿El polarizado nanocerámico se ve diferente o tiene algún color particular?", content: "<p>[Respuesta: La mayoría de las películas nanocerámicas de calidad tienen un color carbón o neutro muy sutil que no altera significativamente los colores vistos a través del vidrio. No suelen tener tonos azulados o verdosos como algunas películas de menor calidad. Su principal característica es la claridad óptica.]</p>" },
  ];

  return (
    <div className="bg-white text-slate-800">
      <section className="relative bg-slate-900 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img src="https://via.placeholder.com/1600x600/0F172A/4FD1C5?text=Tecnología+Nanocerámica+Avanzada" alt="Banner Polarizado Nanocerámico" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Polarizado Nanocerámico: Máximo Confort y Protección Solar Avanzada</h1>
          <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto">La cúspide de la tecnología en polarizado para un rechazo de calor sin precedentes, claridad superior y protección UV total.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <section className="mb-12 md:mb-16 scroll-mt-20" id="tecnologia-nanoceramica">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6 text-center">Tecnología Nanocerámica: La Nueva Generación en Polarizado</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>[Placeholder: Explicar que las películas nanocerámicas utilizan partículas cerámicas de tamaño nanométrico (mucho más pequeñas que las cerámicas convencionales). Estas nanopartículas son altamente efectivas para absorber y reflejar selectivamente la radiación infrarroja (calor) y ultravioleta (UV), sin necesidad de oscurecer mucho el vidrio ni utilizar metales que puedan interferir con señales electrónicas.]</p>
            <p>[Placeholder: Comparar brevemente con polarizados tradicionales (teñidos y metálicos). Los teñidos absorben algo de calor pero no tanto IR, y pueden decolorarse. Los metálicos reflejan bien el calor pero pueden interferir con señales y tener un aspecto reflectante. Las nanocerámicas superan estas limitaciones.]</p>
          </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="beneficios-superiores">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">Beneficios Superiores del Polarizado Nanocerámico</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {nanoceramicBenefits.map(benefit => <FeatureItem key={benefit.title} {...benefit} />)}
          </div>
        </section>

        <section className="mb-12 md:mb-16 bg-slate-50 p-8 md:p-12 rounded-xl shadow-lg scroll-mt-20" id="niveles-vlt">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">Niveles de VLT Disponibles en Nanocerámica</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vltOptions.map(vltInfo => <VltInfoCard key={vltInfo.vlt} {...vltInfo} />)}
          </div>
          <p className="text-center mt-10 text-slate-600 max-w-2xl mx-auto">[Placeholder: Nota sobre cómo la tecnología nanocerámica permite tener VLTs más claros con un alto rendimiento en rechazo de calor, lo que antes solo se lograba con películas muy oscuras.]</p>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="cumplimiento-legal">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">Cumplimiento Legal con Nanocerámica en León (Artículo 99)</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 bg-green-50 p-6 rounded-md shadow border-l-4 border-green-500">
            <p>[Placeholder: Explicar que gracias a la alta eficiencia de las películas nanocerámicas, se pueden elegir VLTs que cumplen con la normativa de León sin sacrificar un excelente rechazo de calor. Por ejemplo, un nanocerámico VLT 35% o 50% puede rechazar tanto o más calor que un polarizado convencional mucho más oscuro.]</p>
            <p>[Placeholder: Reiterar las recomendaciones de Tovar3 para León: "Para cumplir con la interpretación común del Artículo 99 en León para vidrios laterales delanteros, recomendamos películas nanocerámicas con VLT del 35% o 50%. Para vidrios traseros, se pueden usar VLTs más bajos como 20% o 5%."]</p>
            <p>Para una comprensión detallada de la normativa y nuestra garantía, visita nuestra <Link href="/legal" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">Página de Información Legal sobre Polarizado</Link> o la sección específica de <Link href="/servicios/polarizado-legal#garantia-legal" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline">nuestra garantía en polarizado legal</Link>.</p>
            <p className="font-semibold text-green-700">[Placeholder: Enfatizar la tranquilidad de elegir nanocerámica con Tovar3: obtienes el máximo confort y protección, además de nuestra asesoría para el cumplimiento legal.]</p>
          </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="proceso-instalacion-nano">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">Proceso de Instalación Profesional para Nanocerámica</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>[Placeholder: Describir que la instalación de películas premium como las nanocerámicas requiere aún mayor precisión y limpieza. Mencionar si se usan técnicas especiales, ambiente controlado, o herramientas específicas para asegurar un acabado impecable y la máxima adherencia y rendimiento de la película.]</p>
          </div>
        </section>

        <section className="mb-12 md:mb-16 bg-slate-100 p-8 rounded-lg shadow scroll-mt-20" id="garantia-producto">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6 text-center">Garantía de Producto y Servicio</h2>
            <div className="prose prose-lg max-w-3xl mx-auto text-slate-600">
                <p>[Placeholder: Información sobre las garantías que ofrecen los fabricantes de películas nanocerámicas de calidad (ej. contra decoloración, burbujas, deslaminación, etc., a menudo de por vida o por muchos años). Explicar también la garantía de instalación de Tovar3.]</p>
            </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="testimonios-nano">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">Testimonios de Clientes con Nanocerámica</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {[1,2].map(i => (
                    <blockquote key={i} className="p-6 bg-teal-50 rounded-lg shadow-md border-l-4 border-teal-500">
                        <p className="italic text-slate-700 mb-4">"[Placeholder: Testimonio de cliente {i} elogiando específicamente la reducción de calor y el confort del polarizado nanocerámico. 'Desde que puse nanocerámico, mi auto es otro en el sol de León...']"</p>
                        <footer className="text-sm text-teal-700 font-semibold">- [Placeholder: Nombre Cliente {i}], [Vehículo Cliente {i} con Nanocerámico]</footer>
                    </blockquote>
                ))}
            </div>
        </section>

        <section className="mb-12 md:mb-16 scroll-mt-20" id="faq-nanoceramico">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">Preguntas Frecuentes sobre Polarizado Nanocerámico</h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.title}>{faq.content}</AccordionItem>
            ))}
          </div>
        </section>

        <section className="text-center py-10 scroll-mt-20" id="cta-nanoceramico">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">Experimenta el Futuro del Confort y la Protección Solar</h2>
          <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-4">
            <Link href="/cotizar?service=polarizado&type=nanoceramico" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg min-w-[200px]">
                Cotizar Polarizado Nanocerámico
              </a>
            </Link>
            <Link href="/servicios/polarizado-legal#tipos-peliculas" legacyBehavior> {/* Or a dedicated comparison page */}
              <a className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 min-w-[200px]">
                Comparar Tipos de Polarizado
              </a>
            </Link>
            <Link href="/contacto?subject=Consulta+Polarizado+Nanoceramico" legacyBehavior>
              <a className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg text-md transition duration-300 min-w-[200px]">
                Consultar sobre Legalidad y VLTs
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NanoceramicTintPage;
