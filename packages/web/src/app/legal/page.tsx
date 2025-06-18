"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// AccordionItem Component (Reused - assuming it's defined as in Prompt 3 or similar)
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
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
        <div className="py-5 px-1 prose prose-slate max-w-none text-slate-600"> {/* Added prose for FAQ content styling */}
          {children}
        </div>
      )}
    </div>
  );
};

const LegalPage: React.FC = () => {
  const faqs = [
    {
      question: "¿Qué dice exactamente el Artículo 99 sobre polarizados en León?",
      answer: "<p>[Respuesta Detallada: Citar la parte relevante del Artículo 99 del Reglamento de Policía y Vialidad para el Municipio de León, GTO, que habla sobre vidrios polarizados, entintados o que impidan/obstruyan la visibilidad. Explicar el contexto de esta regulación (seguridad, identificación, etc.). Indicar si ha habido actualizaciones recientes o si se basa en una versión específica del reglamento.]</p>"
    },
    {
      question: "¿Cuál es el VLT (Visible Light Transmission) permitido para no ser multado?",
      answer: "<p>[Respuesta Detallada: Explicar que el Artículo 99 no suele especificar un porcentaje exacto de VLT, sino que se enfoca en la 'visibilidad'. Detallar la interpretación común de las autoridades de tránsito en León: por ejemplo, VLT mínimo del 35% para vidrios delanteros laterales, y mayor flexibilidad para traseros (ej. 20% o 5%) si se cuenta con espejos laterales. Mencionar que el parabrisas generalmente solo permite una franja superior. Incluir Tovar3 como fuente de esta interpretación basada en experiencia.]</p>"
    },
    {
      question: "¿Cómo mide la autoridad de tránsito el VLT de un polarizado?",
      answer: "<p>[Respuesta Detallada: Explicar los métodos que podría usar la autoridad, como dispositivos medidores de VLT (fotómetros) si los tienen, o la apreciación visual basada en su criterio y experiencia. Resaltar la posible subjetividad si no se usan medidores y cómo Tovar3 busca minimizar este riesgo para sus clientes.]</p>"
    },
    {
      question: "¿Qué cubre exactamente la 'Garantía de Cumplimiento Legal' de Tovar3?",
      answer: "<p>[Respuesta Detallada: Explicar que la garantía aplica a los polarizados instalados por Tovar3 que fueron explícitamente recomendados y vendidos como 'legales' para León. Cubre: asesoría en caso de multa, apoyo en proceso de aclaración, y en casos justificados (demostrando que el polarizado fue la única causa y se siguieron las recomendaciones), posible reemplazo o reembolso parcial/total de la multa, sujeto a términos y condiciones. No cubre: multas por otras infracciones, polarizados instalados bajo petición explícita del cliente fuera de recomendación legal, daños al polarizado por mal uso, etc.]</p>"
    },
    {
      question: "Si me multan, ¿Tovar3 paga la multa automáticamente?",
      answer: "<p>[Respuesta Detallada: Aclarar que no es un pago automático. La garantía implica respaldo y asesoría. Se evaluará cada caso. Explicar el proceso: el cliente debe contactar a Tovar3 inmediatamente, proveer copia de la multa y detalles. Tovar3 analizará si la multa es atribuible al VLT del polarizado recomendado como legal. Especificar los pasos de apoyo que Tovar3 ofrecería.]</p>"
    },
    {
        question: "¿Qué pasa si quiero un polarizado más oscuro del recomendado como 'legal'?",
        answer: "<p>[Respuesta Detallada: Explicar que Tovar3 puede instalar cualquier tipo de polarizado a petición del cliente, pero en esos casos, se informará claramente que dicho polarizado podría no cumplir con la interpretación local del Artículo 99 y, por lo tanto, no estaría cubierto por la Garantía de Cumplimiento Legal. Se podría requerir una responsiva del cliente.]</p>"
    }
  ];

  return (
    <div className="bg-white text-slate-800 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Entendiendo el Polarizado Legal en León: El Artículo 99 y la Garantía Tovar3
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Tu tranquilidad es nuestra prioridad. Conduce con confianza, estilo y cumpliendo la normativa vigente en León, Guanajuato.
          </p>
        </header>

        <section id="articulo-99" className="mb-16 md:mb-20 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center md:text-left">
            El Artículo 99 del Reglamento de Vialidad y el Polarizado en León
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <article className="prose prose-lg max-w-none text-slate-600 text-justify">
              <p>
                [Placeholder: Introducción al Artículo 99 del Reglamento de Policía y Vialidad para el Municipio de León, GTO. Explicar su propósito general en términos de seguridad vial y pública, y cómo regula las modificaciones a vehículos, incluyendo el polarizado.]
              </p>
              <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">Lo que Dice la Ley sobre "Obstruir la Visibilidad"</h3>
              <p>
                [Placeholder: Citar y analizar la frase clave del Artículo 99 referente a 'vidrios polarizados, entintados o adicionados con cualquier material que obstruya o disminuya la visibilidad al interior o exterior del vehículo'. Explicar que la ley busca un balance entre la privacidad/confort del conductor y la necesidad de las autoridades de poder identificar a los ocupantes o ver el interior en ciertas situaciones.]
              </p>
              <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">Interpretación del VLT (Visible Light Transmission)</h3>
              <p>
                [Placeholder: Explicar qué es el VLT. Detallar que, aunque el Artículo 99 no suele listar porcentajes VLT explícitos, la práctica y la experiencia con las autoridades de León sugieren ciertos umbrales. Por ejemplo:
                Comúnmente, un VLT del <strong class='text-teal-600'>35% al 50%</strong> es considerado aceptable para los vidrios delanteros laterales (conductor y copiloto).
                Para los vidrios traseros (laterales y medallón), se permite mayor oscuridad, a menudo <strong class='text-teal-600'>hasta un 5% o 20% de VLT</strong>, siempre que el vehículo cuente con dos espejos retrovisores exteriores.
                El parabrisas completo no debe polarizarse, permitiéndose únicamente una <strong class='text-teal-600'>franja superior</strong> de hasta X cm (ej. 10-15cm) para protección solar.]
              </p>
              <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">El Enfoque de Tovar3 para tu Cumplimiento</h3>
              <p>
                [Placeholder: Detallar el proceso de Tovar3:
                1. Asesoría Personalizada: Cómo se informa al cliente sobre estas interpretaciones.
                2. Medición (si aplica): Si Tovar3 cuenta con medidores de VLT para mostrar al cliente.
                3. Recomendación de Productos: Qué tipos de películas y VLTs se recomiendan para maximizar la probabilidad de cumplimiento.
                4. Experiencia Local: Mencionar la experiencia de Tovar3 tratando con estos casos en León.]
              </p>
            </article>
            <aside className="space-y-6 mt-8 md:mt-0">
              <div className="bg-slate-100 p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-slate-700 mb-3 text-center">Ilustración de Niveles VLT (Ejemplo)</h4>
                {/* <!-- Placeholder for VLT illustration graphic --> */}
                <div className="w-full h-40 bg-slate-300 rounded flex items-center justify-center mb-3">
                  <p className="text-slate-500 text-md">[Visual: Serie de 3-4 ventanas con opacidad creciente, etiquetadas: 70% VLT (claro), 50% VLT, 35% VLT, 20% VLT (oscuro)]</p>
                </div>
                <p className="text-sm text-slate-600">[Placeholder: Descripción de cómo estas imágenes ayudan a visualizar los niveles de VLT y su impacto en la visibilidad exterior e interior.]</p>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg shadow-md border border-teal-200">
                 <h4 className="text-lg font-semibold text-teal-700 mb-3 text-center">Puntos Clave del Artículo 99</h4>
                 <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                    <li>[Placeholder: Clave 1: No obstruir visibilidad esencial.]</li>
                    <li>[Placeholder: Clave 2: Diferencias entre vidrios delanteros, traseros y parabrisas.]</li>
                    <li>[Placeholder: Clave 3: Importancia de espejos retrovisores si hay polarizado oscuro atrás.]</li>
                    <li>[Placeholder: Clave 4: Sanciones pueden aplicar si no se cumple.]</li>
                 </ul>
              </div>
            </aside>
          </div>
        </section>

        <section id="garantia-legal" className="mb-16 md:mb-20 bg-teal-600 text-white p-8 md:p-12 rounded-xl shadow-2xl scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Nuestra Garantía de Cumplimiento Legal Tovar3
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg prose-invert"> {/* prose-invert for dark background */}
              <p>
                En Tovar3, entendemos que la normativa puede ser confusa. Por eso, hemos creado nuestra <strong className="text-yellow-300">Garantía de Cumplimiento Legal</strong> para darte la máxima tranquilidad al polarizar tu vehículo con nosotros.
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-300">¿Qué Cubre Nuestra Garantía?</h3>
              <p>
                [Placeholder: Detallar cobertura. Ejemplo:
                Si instalas un polarizado en Tovar3, y nuestro experto te ha asesorado y confirmado que el VLT y la instalación cumplen con las interpretaciones comunes del Artículo 99 en León para las áreas específicas de tu vehículo, y aun así recibes una infracción <strong className="text-yellow-300">directamente y únicamente por el nivel de oscuridad</strong> de dicho polarizado (no por otras causas como conducir sin licencia, exceso de velocidad, etc.), Tovar3 te ofrece:]
                <ul className="list-disc space-y-1 mt-2">
                    <li>[Placeholder: Asesoría y apoyo para entender y, si es viable, contestar la infracción.]</li>
                    <li>[Placeholder: Revisión del caso y, si se determina que hubo un error en nuestra recomendación o instalación que directamente causó la multa (y no un cambio de criterio de la autoridad o una medición subjetiva), podríamos ofrecer soluciones como el reemplazo de la película en el área afectada por una de VLT superior sin costo, o la cobertura de un porcentaje de la multa (especificar términos y límites claros). ESTO DEBE SER DEFINIDO CUIDADOSAMENTE POR TOVAR3.]</li>
                </ul>
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-300">Condiciones y Exclusiones Importantes</h3>
              <p>
                [Placeholder: Detallar exclusiones. Ejemplo:
                La garantía no aplica si: el cliente solicita explícitamente un VLT más oscuro que el recomendado por Tovar3 para cumplimiento; si la multa se debe a otros factores; si el vehículo se usa en otro municipio/estado con normativas diferentes; si hay cambios posteriores en la legislación o su interpretación por las autoridades. La garantía se enfoca en la correcta asesoría e instalación al momento del servicio, basada en la interpretación vigente en León.]
              </p>
              <p className="mt-4">
                <strong className="text-yellow-300">Nuestro objetivo es tu satisfacción y que conduzcas con confianza.</strong> Te explicaremos todos los detalles de esta garantía al momento de tu servicio.
              </p>
            </div>
            <div className="flex justify-center items-center p-6">
              {/* <!-- Placeholder for Guarantee Seal/Icon --> */}
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-xl">
                <span className="text-6xl md:text-7xl">🛡️</span>
                <p className="font-semibold mt-2 md:mt-4 text-lg">Garantía Tovar3</p>
                <p className="text-xs mt-1">Conduce con Tranquilidad</p>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios-polarizado" className="mb-16 md:mb-20 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">
            Beneficios del Polarizado Legal (Respetando Límites)
          </h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600">
            <p>
              [Placeholder: Breve introducción reiterando que es posible obtener grandes beneficios incluso con polarizados que cumplen la normativa. Adaptar los beneficios listados en Prompt 3 (UV, calor, seguridad, etc.) para que enfaticen que se logran DENTRO de los límites legales. Ej: "Reducción de calor significativa incluso con VLTs permitidos gracias a tecnología cerámica/nanocarbono..."]
            </p>
            <ul className="list-disc pl-5 space-y-1">
                <li>[Placeholder: Beneficio 1: Protección UV superior (99%) incluso con películas claras o de VLT medio.]</li>
                <li>[Placeholder: Beneficio 2: Reducción notable de calor (especificar tecnologías como cerámica que no dependen solo de la oscuridad).]</li>
                <li>[Placeholder: Beneficio 3: Mayor seguridad al mantener fragmentos de vidrio unidos en caso de rotura.]</li>
                <li>[Placeholder: Beneficio 4: Reducción de deslumbramiento para una conducción más cómoda.]</li>
                <li>[Placeholder: Beneficio 5: Protección de interiores contra decoloración.]</li>
                <li>[Placeholder: Beneficio 6: Privacidad incrementada (dependiendo del VLT trasero permitido).]</li>
            </ul>
          </div>
        </section>

        <section id="faq-legal" className="mb-16 md:mb-20 scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Preguntas Frecuentes sobre Polarizado Legal en León
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.question}>
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionItem>
            ))}
          </div>
        </section>

        <section id="cta-legal" className="text-center py-10 bg-slate-100 rounded-lg shadow-inner">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6">
            ¿Listo para un Polarizado Legal, Seguro y con Garantía?
          </h2>
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/cotizar?service=polarizado&legal=true" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg">
                Cotiza tu Polarizado Legal y Garantizado
              </a>
            </Link>
            <Link href="/contacto" legacyBehavior>
              <a className="inline-block bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300">
                Contacta a un Experto en Polarizado Legal
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegalPage;
