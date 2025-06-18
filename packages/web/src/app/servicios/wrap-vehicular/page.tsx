"use client"; // Can be removed if no client-side interactivity is needed later

import React from 'react';
import Link from 'next/link';

// Benefit/Feature Item Component
interface FeatureItemProps {
  icon: string; // Emoji or SVG class
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4 p-4">
    <div className="text-3xl text-teal-500 mt-1">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
);

// Wrap Type Card Component
interface WrapTypeCardProps {
  title: string;
  description: string;
  imageUrl: string; // Placeholder image
}

const WrapTypeCard: React.FC<WrapTypeCardProps> = ({ title, description, imageUrl }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
    <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-teal-600 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  </div>
);


const CarWrapPage: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-slate-800 text-white py-24 md:py-40">
        <div className="absolute inset-0">
          <img
            src="https://via.placeholder.com/1600x700/0F172A/334155?text=Espectacular+Car+Wrap" // Placeholder image
            alt="Car Wrap Hero Banner"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Transforma tu Auto con Wrap Vehicular
          </h1>
          <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto">
            Estilo Único, Protección Superior y Calidad Inigualable para tu Vehículo en León.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Section: Explora las Posibilidades del Wrap */}
        <section className="mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6">
            Explora las Infinitas Posibilidades del Wrap
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Desde cambios de color completos hasta diseños personalizados, el wrap vehicular es la forma definitiva de expresar tu estilo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {[
              { id: 1, before: "https://via.placeholder.com/400x300/94A3B8/FFFFFF?text=Antes:+Rojo", after: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Después:+Verde+Mate" },
              { id: 2, before: "https://via.placeholder.com/400x300/94A3B8/FFFFFF?text=Antes:+Blanco", after: "https://via.placeholder.com/400x300/6366F1/FFFFFF?text=Después:+Azul+Satinado" },
              { id: 3, before: "https://via.placeholder.com/400x300/94A3B8/FFFFFF?text=Antes:+Gris", after: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Después:+Naranja+Brillante" },
            ].map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="grid grid-cols-2">
                    <img src={item.before} alt="Antes del wrap" className="w-full h-48 object-cover"/>
                    <img src={item.after} alt="Después del wrap" className="w-full h-48 object-cover"/>
                </div>
                <p className="p-3 text-sm text-slate-700 font-medium bg-slate-100">Proyecto {item.id} - Transformación</p>
              </div>
            ))}
          </div>
          <Link href="/galeria/wraps" legacyBehavior>
            <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
              Ver Galería Completa de Wraps
            </a>
          </Link>
        </section>

        {/* Section: Explanation of Car Wrapping */}
        <section className="mb-16 md:mb-24 bg-white p-8 md:p-12 rounded-xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-8 text-center">
            ¿Qué es el Car Wrapping y Por Qué Elegirlo?
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-8">
            <div className="prose prose-lg text-slate-600">
              <p>
                El car wrapping, o rotulación vehicular, es un proceso mediante el cual se aplica una <strong className="text-teal-600">película de vinilo adhesivo especializado</strong> sobre la pintura original de tu vehículo. Esta técnica permite cambiar la apariencia de tu auto de manera temporal o a largo plazo, ofreciendo una versatilidad que la pintura tradicional no puede igualar.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-6">
              <FeatureItem icon="🎨" title="Cambio de Color Total" description="Elige entre cientos de colores y acabados para un look completamente nuevo sin alterar la pintura original." />
              <FeatureItem icon="✨" title="Acabados Únicos" description="Explora opciones como mate, satinado, cromo, texturizado (carbono, cepillado) y más." />
              <FeatureItem icon="🛡️" title="Protección de Pintura" description="El vinilo actúa como una capa protectora contra rayones leves, contaminantes y rayos UV." />
              <FeatureItem icon="📢" title="Branding y Publicidad" description="Ideal para empresas que buscan promocionar su marca con gráficos personalizados en vehículos." />
              <FeatureItem icon="🔄" title="Reversibilidad" description="El wrap puede retirarse profesionalmente, devolviendo el auto a su estado original sin dañar la pintura." />
              <FeatureItem icon="💰" title="Valor de Reventa" description="Al proteger la pintura original, ayudas a mantener o incluso mejorar el valor de reventa de tu vehículo." />
            </div>
          </div>
        </section>

        {/* Section: Tipos de Wraps y Acabados */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-10 text-center">
            Tipos de Wraps y Acabados para Cada Estilo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WrapTypeCard
              title="Full Wraps (Rotulación Completa)"
              description="Cubre cada panel pintado de tu vehículo para un cambio de color total y una apariencia uniforme."
              imageUrl="https://via.placeholder.com/400x300/1E293B/FFFFFF?text=Full+Wrap"
            />
            <WrapTypeCard
              title="Partial Wraps (Rotulación Parcial)"
              description="Ideal para acentuar ciertas partes del vehículo como el techo, capó, espejos, o crear diseños bitono."
              imageUrl="https://via.placeholder.com/400x300/334155/FFFFFF?text=Partial+Wrap"
            />
            <WrapTypeCard
              title="Graphic Wraps (Diseños Personalizados)"
              description="Logotipos, gráficos publicitarios, franjas deportivas o cualquier diseño que imagines para destacar."
              imageUrl="https://via.placeholder.com/400x300/475569/FFFFFF?text=Graphic+Wrap"
            />
          </div>
          <div className="mt-10 prose prose-lg max-w-3xl mx-auto text-slate-600 text-center">
            <p>Utilizamos solo <strong className="text-teal-600">vinilos de alta calidad</strong> de marcas reconocidas (Placeholder: Avery Dennison, 3M, Oracal, etc.), disponibles en una increíble variedad de acabados:</p>
            <ul className="list-disc list-inside inline-block text-left">
              <li>Brillante (Gloss)</li>
              <li>Mate (Matte)</li>
              <li>Satinado (Satin)</li>
              <li>Cromo (Chrome)</li>
              <li>Metálicos y Perlados</li>
              <li>Texturizados (Fibra de carbono, cepillado, etc.)</li>
              <li>Cambiantes de color (Color-shift)</li>
            </ul>
          </div>
        </section>

        {/* Section: Nuestro Proceso de Aplicación Profesional */}
        <section className="mb-16 md:mb-24 bg-teal-600 text-white py-12 md:py-16 px-6 rounded-xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Nuestro Proceso de Aplicación Profesional
          </h2>
          <div className="prose prose-lg prose-invert max-w-3xl mx-auto text-center">
            <p>
              En Tovar3, la perfección es nuestro estándar. Nuestro proceso de aplicación de wrap es meticuloso y se enfoca en la <strong className="text-yellow-300">calidad y durabilidad</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-left inline-block">
              <li>Limpieza y descontaminación profunda de la superficie.</li>
              <li>Desmontaje cuidadoso de emblemas, manijas y otros componentes necesarios.</li>
              <li>Aplicación experta del vinilo, panel por panel, utilizando técnicas precisas.</li>
              <li>Moldeado al calor para un ajuste perfecto en curvas y contornos.</li>
              <li>Post-calentamiento para asegurar la adhesión y durabilidad.</li>
              <li>Reensamblaje y control de calidad final.</li>
            </ol>
            <p className="mt-6">
              Confía en nuestros <strong className="text-yellow-300">instaladores certificados</strong> (Placeholder: Certificaciones) para un resultado impecable que superará tus expectativas.
            </p>
          </div>
        </section>

        {/* Optional Sections Placeholder */}
        <section className="mb-16 md:mb-24 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Inspiración y Tendencias</h2>
            <p className="text-slate-600">Descubre los últimos estilos, colores de moda y proyectos inspiradores en el mundo del car wrapping. Te ayudamos a encontrar el look perfecto para ti. (Contenido próximamente...)</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Cuidado y Mantenimiento del Wrap</h2>
            <p className="text-slate-600">Te proporcionaremos todas las indicaciones para cuidar tu wrap y mantenerlo luciendo espectacular por años. (Guía de cuidado próximamente...)</p>
          </div>
        </section>

        {/* CTAs */}
        <section className="text-center py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-8">
            ¿Listo para Darle una Nueva Vida a tu Vehículo?
          </h2>
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/galeria/wraps" legacyBehavior>
              <a className="inline-block bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
                Explora Nuestra Galería de Wraps
              </a>
            </Link>
            <Link href="/cotizador" legacyBehavior>
              <a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg">
                Cotiza tu Proyecto de Wrap
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CarWrapPage;
