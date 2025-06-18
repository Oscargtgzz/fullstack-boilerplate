"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Consistent Mock Data Source (can be moved to a shared file later)
// This needs to be available to this component as well
interface Article {
  id: string;
  title: string;
  summary: string; // For potential use if full content fails or as meta
  date: string;
  imageUrl: string;
  category?: string;
  href: string;
  content: string;
}

const MOCK_BLOG_ARTICLES_SOURCE: Article[] = [
  { id: 'como-cuidar-tu-ppf', title: 'Guía Completa: Cómo Cuidar tu PPF y Mantenerlo Impecable', summary: 'El Paint Protection Film es una inversión increíble para tu auto. Aprende los mejores consejos y productos para asegurar su máxima durabilidad y apariencia.', date: '20 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/ppfcare/800/450', category: 'Guía de Cuidado', href: '/blog/como-cuidar-tu-ppf', content: "<p>[Contenido Detallado Párrafo 1: Introducción a la importancia del PPF y por qué su cuidado es crucial. Mencionar que es una barrera protectora pero no indestructible.]</p><p>[Contenido Detallado Párrafo 2: Consejos de Lavado. Frecuencia, tipo de jabón (pH neutro), técnica de dos cubos, evitar alta presión directa en bordes. Secado con microfibras limpias.]</p><h3 class='text-xl font-semibold my-4'>Subtítulo Ejemplo</h3><p>[Contenido Detallado Párrafo 3: Productos Recomendados y a Evitar. Mencionar selladores específicos para PPF, quick detailers. Advertir contra solventes agresivos, ceras abrasivas o pulimentos no adecuados para PPF.]</p><p>[Contenido Detallado Párrafo 4: ¿Qué hacer con manchas difíciles? Excrementos de aves, insectos, resina. Actuar rápido, usar productos seguros para PPF. Cuándo consultar a un profesional.]</p><p>[Contenido Detallado Párrafo 5: Inspección Regular y Mantenimiento a Largo Plazo. Revisar bordes, posibles levantamientos. Importancia de la calidad de la instalación inicial (mencionar Tovar3).]</p>" },
  { id: 'wrap-kia-stinger-mate', title: 'Proyecto Destacado: Transformación de Kia Stinger a Gris Mate', summary: 'Un vistazo detallado al proceso de wrapping completo de este deportivo, mostrando el antes y después y los desafíos del proyecto.', date: '15 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/kiastingerwrap/800/450', category: 'Proyecto Wrap', href: '/blog/wrap-kia-stinger-mate', content: "<p>[Contenido Detallado Párrafo 1: Presentación del vehículo (Kia Stinger) y el objetivo del cliente (cambio de look a gris mate). Estado inicial del auto.]</p><p>[Contenido Detallado Párrafo 2: Proceso de Preparación. Limpieza profunda, descontaminación, desmontaje de piezas necesarias (manijas, emblemas, etc.). Importancia de esta etapa.]</p><h3 class='text-xl font-semibold my-4'>Galería del Proyecto</h3><div class='grid grid-cols-2 gap-4 my-4'><img src='https://picsum.photos/seed/kiabefore/400/300' alt='Kia Stinger Antes' class='rounded-md shadow-lg'/><img src='https://picsum.photos/seed/kiaafter/400/300' alt='Kia Stinger Después' class='rounded-md shadow-lg'/></div><p>[Contenido Detallado Párrafo 3: Aplicación del Vinilo. Elección del material (marca y tipo de vinilo gris mate). Técnica de aplicación, panel por panel. Desafíos específicos del Stinger (curvas complejas, etc.).]</p>" },
  { id: 'beneficios-polarizado-nanoceramico', title: 'Maximizando Confort: Los Beneficios del Polarizado Nanocerámico', summary: 'Descubre por qué el polarizado nanocerámico es la mejor opción para rechazar el calor, protegerte de los rayos UV y mejorar tu experiencia de manejo.', date: '10 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/nanoceramicbenefits/800/450', category: 'Polarizado', href: '/blog/beneficios-polarizado-nanoceramico', content: "<p>[Contenido Detallado sobre beneficios del nanocerámico...]</p>" },
  { id: 'legalidad-polarizado-leon-gto', title: 'Navegando el Artículo 99: Polarizado Legal en León, GTO', summary: 'Una guía esencial para entender la normativa local sobre polarizados y cómo Tovar3 te ayuda a cumplirla sin sacrificar confort y estilo.', date: '5 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/legalpolarizado/800/450', category: 'Información Legal', href: '/blog/legalidad-polarizado-leon-gto', content: "<p>[Contenido Detallado sobre Artículo 99...]</p>" },
  { id: 'top-5-accesorios-2024', title: 'Top 5 Accesorios Indispensables para tu Auto en 2024', summary: 'Desde iluminación LED hasta sistemas de seguridad, descubre los accesorios que están marcando tendencia y mejorando la funcionalidad de los vehículos.', date: '1 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/topaccesorios/800/450', category: 'Tendencias y Accesorios', href: '/blog/top-5-accesorios-2024', content: "<p>[Contenido Detallado sobre accesorios top...]</p>" },
  { id: 'mantenimiento-recubrimiento-ceramico', title: 'Cómo Mantener tu Recubrimiento Cerámico como Nuevo', summary: 'Consejos prácticos para el lavado y cuidado de tu vehículo con recubrimiento cerámico, asegurando que su brillo y protección perduren.', date: '25 de Junio, 2024', imageUrl: 'https://picsum.photos/seed/ceramiccare/800/450', category: 'Guía de Cuidado', href: '/blog/mantenimiento-recubrimiento-ceramico', content: "<p>[Contenido Detallado sobre cuidado de cerámico...]</p>" }
];

// Simulate API Call for Single Blog Post
const fetchSinglePostAPI = async (slug: string): Promise<{ post: Article | null }> => {
  console.log(`Simulating API Call: Fetching post with slug "${slug}"...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = MOCK_BLOG_ARTICLES_SOURCE.find(p => p.id === slug) || null;
      if (Math.random() < 0.95 || (post && slug === 'force_success')) { // 95% success if post exists
        console.log(post ? "API Call Successful: Post fetched." : "API Call: Post not found by slug.");
        resolve({ post });
      } else {
        console.error("API Call Failed: Simulating error fetching single post.");
        reject({ message: 'Error al cargar el artículo. Intenta de nuevo más tarde.' });
      }
    }, 800); // Simulate 0.8 second delay
  });
};

// Skeleton for Post Detail Page
const PostSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 max-w-3xl animate-pulse">
        <header className="mb-8 md:mb-12 border-b pb-6 border-slate-200">
            <div className="h-10 bg-slate-300 rounded w-3/4 mb-4"></div>
            <div className="flex items-center text-sm space-x-4">
                <div className="h-4 bg-slate-300 rounded w-1/4"></div>
                <div className="h-4 bg-slate-300 rounded w-1/4"></div>
                <div className="h-5 bg-slate-300 rounded-full w-1/6"></div>
            </div>
        </header>
        <figure className="mb-8 md:mb-12">
            <div className="w-full h-96 bg-slate-300 rounded-xl shadow-lg"></div>
        </figure>
        <div className="prose prose-lg max-w-none">
            <div className="h-6 bg-slate-300 rounded w-full mb-4"></div>
            <div className="h-6 bg-slate-300 rounded w-5/6 mb-4"></div>
            <div className="h-6 bg-slate-300 rounded w-full mb-4"></div>
            <div className="h-6 bg-slate-300 rounded w-4/6 mb-4"></div>
        </div>
    </div>
);


const BlogPostPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [postError, setPostError] = useState<string | null>(null);
  const [apiPostData, setApiPostData] = useState<Article | null>(null);

  const loadPost = useCallback(async (currentSlug: string) => {
    if (!currentSlug) {
        setPostLoading(false);
        setPostError("No se ha especificado un artículo para cargar."); // Should not happen with Next.js routing
        return;
    }
    setPostLoading(true);
    setPostError(null);
    setApiPostData(null);
    try {
      const response = await fetchSinglePostAPI(currentSlug);
      setApiPostData(response.post);
    } catch (error: any) {
      setPostError(error.message || 'Ocurrió un error desconocido al cargar el post.');
    } finally {
      setPostLoading(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug, loadPost]);

  if (postLoading) {
    return (
      <div className="bg-white py-12 md:py-20">
        <PostSkeleton />
      </div>
    );
  }

  if (postError) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <div className="bg-red-50 p-8 rounded-md shadow-md max-w-lg mx-auto">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <h2 className="mt-2 text-xl font-medium text-red-700">Error al Cargar Artículo</h2>
            <p className="mt-1 text-sm text-red-600">{postError}</p>
            <div className="mt-6 space-x-4">
                <button onClick={() => loadPost(slug)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md transition duration-300">Reintentar</button>
                <Link href="/blog" legacyBehavior><a className="text-slate-700 hover:text-slate-900 font-medium py-2 px-5 rounded-md border border-slate-300 hover:bg-slate-100">Volver al Blog</a></Link>
            </div>
        </div>
      </div>
    );
  }

  if (!apiPostData) { // API call succeeded but post was null
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-700 mb-4">Artículo no Encontrado</h1>
        <p className="text-slate-600 mb-8">Lo sentimos, el artículo que buscas no existe o ha sido movido.</p>
        <Link href="/blog" legacyBehavior><a className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">Volver al Blog</a></Link>
      </div>
    );
  }

  const article = apiPostData; // Use the fetched data

  const getContextualCTA = () => {
    // ... (same getContextualCTA function as before)
    switch (article.category) { case 'Polarizado': return <Link href="/cotizar?service=polarizado" legacyBehavior><a className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">Cotiza tu Polarizado</a></Link>; case 'Proyecto Wrap': return <Link href="/proyectos?filter=wrap" legacyBehavior><a className="inline-block mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">Ver más Proyectos de Wraps</a></Link>; case 'Guía de Cuidado': return <Link href="/servicios" legacyBehavior><a className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">Conoce Nuestros Servicios de Protección</a></Link>; default: return null; }
  };

  return (
    <div className="bg-white py-12 md:py-20">
      <article className="container mx-auto px-4 max-w-3xl">
        <header className="mb-8 md:mb-12 border-b pb-6 border-slate-200">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center text-sm text-slate-500 space-x-4">
            <span>Publicado: {article.date}</span>
            <span>Por: Tovar3 Team (Placeholder)</span>
            {article.category && <span className="px-2 py-0.5 bg-teal-100 text-teal-700 font-medium rounded-full text-xs">{article.category}</span>}
          </div>
        </header>
        <figure className="mb-8 md:mb-12">
          <img src={article.imageUrl} alt={`Imagen destacada para ${article.title}`} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg" />
          {article.category === 'Proyecto Wrap' && (<figcaption className="text-center text-sm text-slate-500 mt-2">[Placeholder for Before & After Image Gallery for this project. Content already has some images.]</figcaption>)}
        </figure>
        <div
          className="prose prose-lg max-w-none prose-slate prose-img:rounded-xl prose-img:shadow-md prose-headings:text-slate-700 prose-a:text-teal-600 hover:prose-a:text-teal-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <section className="mt-12 md:mt-16 pt-8 border-t border-slate-200 text-center">
          {getContextualCTA()}
          <div className="mt-6">
            <Link href="/blog" legacyBehavior><a className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition duration-300">&larr; Volver al Blog</a></Link>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPostPage;
