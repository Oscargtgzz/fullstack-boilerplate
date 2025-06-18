"use client"; // Can be removed if no client-side interactivity is needed

import React from 'react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  vehicle?: string; // Optional
}

const teamMembersData: TeamMember[] = [
  { id: 'tm001', name: '[Nombre Fundador/Director]', role: 'Fundador y Director General', imageUrl: 'https://via.placeholder.com/300x300/CBD5E1/475569?text=Director', description: "[Placeholder: Pasión por los autos y dedicación a la calidad. Años de experiencia en el sector automotriz, liderando Tovar3 con una visión de excelencia y transparencia.]" },
  { id: 'tm002', name: '[Nombre Jefe de Taller]', role: 'Jefe de Taller / Instalador Principal', imageUrl: 'https://via.placeholder.com/300x300/A5B4FC/3730A3?text=Jefe+Taller', description: "[Placeholder: Experto en la aplicación precisa de películas y wraps. Certificado en [Marca X, Marca Y]. Su atención al detalle garantiza acabados impecables.]" },
  { id: 'tm003', name: '[Nombre Asesor de Servicio]', role: 'Asesor de Servicio al Cliente', imageUrl: 'https://via.placeholder.com/300x300/99F6E4/0F766E?text=Asesor', description: "[Placeholder: Encargado de entender tus necesidades y guiarte hacia la mejor solución. Amable, conocedor y siempre listo para ayudar.]" },
];

const testimonialsData: Testimonial[] = [
    { id: 'test001', quote: "[Placeholder: 'El equipo de Tovar3 superó mis expectativas. El polarizado nanocerámico es increíble, y su asesoría sobre la legalidad fue muy clara. ¡Totalmente recomendados!']", name: "Ana L.", vehicle: "VW Jetta" },
    { id: 'test002', quote: "[Placeholder: 'Llevé mi camioneta para PPF y el trabajo fue impecable. Se nota la calidad y el profesionalismo. Vale cada peso invertido en proteger mi auto.']", name: "Carlos G.", vehicle: "Ford Ranger" },
    { id: 'test003', quote: "[Placeholder: 'Me decidí por un wrap completo y el resultado es espectacular. La atención al detalle del equipo es impresionante. ¡Mi auto parece otro!']", name: "Sofía M.", vehicle: "Mazda 3 Hatchback" },
];


const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-700">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-green-600 text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
            {/* Placeholder for a subtle background pattern or image related to automotive/precision */}
            <img src="https://via.placeholder.com/1600x500/0F766E/FFFFFF?text=Fondo+Abstracto+Tovar3" alt="Fondo Tovar3" className="w-full h-full object-cover"/>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Conoce a Tovar3: Tu Socio de Confianza en León
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto">
            [Placeholder: Más que un taller, somos un equipo de apasionados por la estética y protección vehicular, comprometidos con la excelencia, la transparencia y tu total satisfacción.]
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20 space-y-16 md:space-y-24">
        {/* Nuestra Historia Section */}
        <section id="historia" className="scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Nuestra Historia</h2>
          <div className="prose prose-lg max-w-3xl mx-auto text-slate-600 text-justify">
            <p>[Placeholder: Párrafo 1: Orígenes de Tovar3. ¿Cómo y cuándo comenzó? ¿Cuál fue la motivación inicial o la visión del fundador? Mencionar los primeros servicios ofrecidos y los valores fundamentales desde el inicio.]</p>
            <p>[Placeholder: Párrafo 2: Crecimiento y Evolución. Hitos importantes en la historia de Tovar3. Expansión de servicios, adopción de nuevas tecnologías, crecimiento del equipo. Cómo se ha adaptado Tovar3 a las necesidades cambiantes de los clientes y del mercado en León.]</p>
            <p>[Placeholder: Párrafo 3: Presente y Futuro. Dónde se encuentra Tovar3 hoy. Reafirmar el compromiso con la calidad y la satisfacción del cliente. Visión a futuro, posibles nuevos servicios o mejoras continuas. Un mensaje de agradecimiento a los clientes por su confianza.]</p>
          </div>
        </section>

        {/* Misión y Valores Section */}
        <section id="mision-valores" className="bg-white p-8 md:p-12 rounded-xl shadow-xl scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 text-center">Misión y Valores</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-teal-600 mb-3">Nuestra Misión</h3>
              <p className="text-slate-600 leading-relaxed">[Placeholder: Definir la misión de Tovar3 de forma clara y concisa. Ejemplo: "Ofrecer soluciones integrales de personalización y protección vehicular de la más alta calidad en León, superando las expectativas de nuestros clientes a través de un servicio experto, transparente y garantizado, asegurando su total tranquilidad y satisfacción."]</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-teal-600 mb-3">Nuestros Valores Fundamentales</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start"><span className="text-xl text-green-500 mr-2 mt-1">✔</span> <strong>Calidad Superior:</strong> [Placeholder: Compromiso con materiales premium y mano de obra experta.]</li>
                <li className="flex items-start"><span className="text-xl text-green-500 mr-2 mt-1">✔</span> <strong>Transparencia Total:</strong> [Placeholder: Precios claros, asesoría honesta, sin sorpresas.]</li>
                <li className="flex items-start"><span className="text-xl text-green-500 mr-2 mt-1">✔</span> <strong>Experiencia y Profesionalismo:</strong> [Placeholder: Equipo capacitado y en constante actualización.]</li>
                <li className="flex items-start"><span className="text-xl text-green-500 mr-2 mt-1">✔</span> <strong>Cumplimiento Legal:</strong> [Placeholder: Asesoría para cumplir normativas, especialmente en polarizado.]</li>
                <li className="flex items-start"><span className="text-xl text-green-500 mr-2 mt-1">✔</span> <strong>Satisfacción del Cliente:</strong> [Placeholder: El cliente es nuestra prioridad, buscamos relaciones a largo plazo.]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conoce a Nuestro Equipo Section */}
        <section id="equipo" className="scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">Conoce a Nuestro Equipo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {teamMembersData.map(member => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-500 object-cover" />
                <h3 className="text-xl font-semibold text-slate-700">{member.name}</h3>
                <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nuestras Instalaciones Section */}
        <section id="instalaciones" className="bg-slate-200 p-8 md:p-12 rounded-xl shadow-lg scroll-mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 text-center">Nuestras Instalaciones</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-300 h-64 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                 <img src={`https://via.placeholder.com/400x300/D1D5DB/4B5563?text=Instalación+Tovar3+-+Área+${i}`} alt={`Instalaciones Tovar3 - Área ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                {/* <p className="text-slate-500">[Placeholder: Foto de Taller {i} - Ej: Área de preparación, Bahía de instalación, Sala de espera]</p> */}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-slate-600 prose max-w-xl mx-auto">[Placeholder: Breve descripción del taller: ambiente limpio, herramientas especializadas, áreas designadas para cada proceso, y cómo esto contribuye a la calidad del trabajo y la experiencia del cliente. Mencionar si hay sala de espera cómoda.]</p>
        </section>

        {/* Certificaciones y Afiliaciones (Opcional) */}
        <section id="certificaciones" className="scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Certificaciones y Afiliaciones (Opcional)</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {/* Placeholder for logos */}
                {[1,2,3].map(i => (
                     <div key={i} className="bg-white p-4 rounded-md shadow-md h-24 w-40 flex items-center justify-center">
                        <p className="text-slate-400 text-sm">[Logo Marca/Cert. {i}]</p>
                    </div>
                ))}
            </div>
            <p className="text-center mt-6 text-slate-500 prose max-w-xl mx-auto">[Placeholder: Si Tovar3 cuenta con certificaciones de marcas de productos (3M, Xpel, etc.), o afiliaciones a asociaciones relevantes, mencionarlas aquí para generar confianza.]</p>
        </section>

        {/* Testimonios Section */}
        <section id="testimonios-about" className="bg-teal-50 p-8 md:p-12 rounded-xl shadow-xl scroll-mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-10 text-center">Testimonios que Nos Respaldan</h2>
            <div className="space-y-8 max-w-2xl mx-auto">
                {testimonialsData.map(testimonial => (
                    <blockquote key={testimonial.id} className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-green-500">
                        <p className="italic text-slate-600 mb-4">"{testimonial.quote}"</p>
                        <footer className="text-sm text-slate-700 font-semibold">- {testimonial.name} {testimonial.vehicle && <span className="text-slate-500 font-normal">({testimonial.vehicle})</span>}</footer>
                    </blockquote>
                ))}
            </div>
        </section>

        {/* Calls-to-Action Section */}
        <section className="text-center py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">Descubre Cómo Podemos Transformar Tu Vehículo</h2>
          <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-6">
            <Link href="/servicios" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg">
                Ver Nuestros Servicios
              </a>
            </Link>
            <Link href="/proyectos" legacyBehavior>
              <a className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300">
                Explora Nuestra Galería
              </a>
            </Link>
            <Link href="/contacto" legacyBehavior>
              <a className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300">
                Contacta con Nosotros
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
