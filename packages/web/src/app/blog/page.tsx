"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ArticleSummary { // For index page, content might be shorter
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  category?: string;
  href: string;
}

// Consistent Mock Data Source (can be moved to a shared file later)
const MOCK_BLOG_ARTICLES_SOURCE: {
    id: string;
    title: string;
    summary: string;
    date: string;
    imageUrl: string;
    category?: string;
    href: string;
    content: string; // Full content for detail page
}[] = [
  { id: 'como-cuidar-tu-ppf', title: 'Guía Completa: Cómo Cuidar tu PPF y Mantenerlo Impecable', summary: 'El Paint Protection Film es una inversión increíble para tu auto. Aprende los mejores consejos y productos para asegurar su máxima durabilidad y apariencia.', date: '20 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/ppfcare/400/250', category: 'Guía de Cuidado', href: '/blog/como-cuidar-tu-ppf', content: "<p>Contenido detallado sobre PPF...</p>" },
  { id: 'wrap-kia-stinger-mate', title: 'Proyecto Destacado: Transformación de Kia Stinger a Gris Mate', summary: 'Un vistazo detallado al proceso de wrapping completo de este deportivo, mostrando el antes y después y los desafíos del proyecto.', date: '15 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/kiastingerwrap/400/250', category: 'Proyecto Destacado', href: '/blog/wrap-kia-stinger-mate', content: "<p>Detalles del proyecto Kia Stinger...</p>" },
  { id: 'beneficios-polarizado-nanoceramico', title: 'Maximizando Confort: Los Beneficios del Polarizado Nanocerámico', summary: 'Descubre por qué el polarizado nanocerámico es la mejor opción para rechazar el calor, protegerte de los rayos UV y mejorar tu experiencia de manejo.', date: '10 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/nanoceramicbenefits/400/250', category: 'Tecnología y Consejos', href: '/blog/beneficios-polarizado-nanoceramico', content: "<p>Beneficios a fondo del nanocerámico...</p>" },
  { id: 'legalidad-polarizado-leon-gto', title: 'Navegando el Artículo 99: Polarizado Legal en León, GTO', summary: 'Una guía esencial para entender la normativa local sobre polarizados y cómo Tovar3 te ayuda a cumplirla sin sacrificar confort y estilo.', date: '5 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/legalpolarizado/400/250', category: 'Información Legal', href: '/blog/legalidad-polarizado-leon-gto', content: "<p>Todo sobre el Artículo 99...</p>" },
  { id: 'top-5-accesorios-2024', title: 'Top 5 Accesorios Indispensables para tu Auto en 2024', summary: 'Desde iluminación LED hasta sistemas de seguridad, descubre los accesorios que están marcando tendencia y mejorando la funcionalidad de los vehículos.', date: '1 de Julio, 2024', imageUrl: 'https://picsum.photos/seed/topaccesorios/400/250', category: 'Tendencias y Accesorios', href: '/blog/top-5-accesorios-2024', content: "<p>Lista y descripción de accesorios top...</p>" },
  { id: 'mantenimiento-recubrimiento-ceramico', title: 'Cómo Mantener tu Recubrimiento Cerámico como Nuevo', summary: 'Consejos prácticos para el lavado y cuidado de tu vehículo con recubrimiento cerámico, asegurando que su brillo y protección perduren.', date: '25 de Junio, 2024', imageUrl: 'https://picsum.photos/seed/ceramiccare/400/250', category: 'Guía de Cuidado', href: '/blog/mantenimiento-recubrimiento-ceramico', content: "<p>Guía de mantenimiento para cerámico...</p>" }
];


// Simulate API Call for Blog Index
const fetchBlogIndexAPI = async (): Promise<{ articles: ArticleSummary[] }> => {
  console.log("Simulating API Call: Fetching blog index...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) { // 90% success rate
        console.log("API Call Successful: Blog index fetched.");
        // Return only summary fields for index page
        const summaries: ArticleSummary[] = MOCK_BLOG_ARTICLES_SOURCE.map(
          ({ id, title, summary, date, imageUrl, category, href }) => ({
            id, title, summary, date, imageUrl, category, href,
          })
        );
        resolve({ articles: summaries });
      } else {
        console.error("API Call Failed: Simulating error fetching blog index.");
        reject({ message: 'Error al cargar los artículos del blog.' });
      }
    }, 1000); // Simulate 1 second delay
  });
};

// Reusable ArticleCard Component
interface ArticleCardProps { article: ArticleSummary; }
const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
    <Link href={article.href} legacyBehavior>
      <a className="block bg-white rounded-xl shadow-lg overflow-hidden group transform hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 h-full flex flex-col">
        <div className="relative w-full h-48 md:h-52">
          <img src={article.imageUrl} alt={`Imagen para ${article.title}`} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300" />
          {article.category && <span className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full opacity-90 group-hover:opacity-100">{article.category}</span>}
        </div>
        <div className="p-5 md:p-6 flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors duration-200 min-h-[2.8em] line-clamp-2">{article.title}</h3>
          <p className="text-xs text-slate-500 mb-3">{article.date}</p>
          <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow min-h-[3.75em]">{article.summary}</p>
          <span className="inline-block text-sm font-semibold text-teal-600 group-hover:text-teal-700 group-hover:underline transition-colors duration-200 mt-auto">Leer Más &rarr;</span>
        </div>
      </a>
    </Link>
);

// Skeleton Card for Loading State
const ArticleSkeletonCard: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-48 md:h-52 bg-slate-300"></div>
        <div className="p-5 md:p-6 space-y-3">
            <div className="h-5 bg-slate-300 rounded w-3/4"></div>
            <div className="h-3 bg-slate-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-slate-300 rounded w-full"></div>
            <div className="h-3 bg-slate-300 rounded w-full"></div>
            <div className="h-3 bg-slate-300 rounded w-5/6"></div>
            <div className="h-6 bg-slate-300 rounded-full w-1/3 mt-3"></div>
        </div>
    </div>
);


const BlogIndexPage: React.FC = () => {
  const [blogIndexLoading, setBlogIndexLoading] = useState<boolean>(true);
  const [blogIndexError, setBlogIndexError] = useState<string | null>(null);
  const [apiBlogArticles, setApiBlogArticles] = useState<ArticleSummary[]>([]);

  // Placeholder for future filter state
  // const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  const loadBlogArticles = useCallback(async () => {
    setBlogIndexLoading(true);
    setBlogIndexError(null);
    try {
      const response = await fetchBlogIndexAPI();
      setApiBlogArticles(response.articles);
    } catch (error: any) {
      setBlogIndexError(error.message || 'Ocurrió un error desconocido.');
    } finally {
      setBlogIndexLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogArticles();
  }, [loadBlogArticles]);

  // Placeholder for filtered articles - for now, just use apiBlogArticles
  const displayedArticles = apiBlogArticles;

  return (
    <div className="bg-slate-100 py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">Nuestro Blog y Recursos</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Encuentra guías útiles, consejos de expertos, proyectos destacados y las últimas novedades en personalización y cuidado automotriz. Queremos compartir nuestro conocimiento contigo.
          </p>
        </header>

        <section className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-md sticky top-[70px] md:top-[80px] z-30 backdrop-blur-md bg-opacity-90">
            <h2 className="text-xl font-semibold text-slate-700">Explora Contenido</h2>
            <div className="flex space-x-2">
              <button disabled className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-200 rounded-md cursor-not-allowed">Categorías (Próximamente)</button>
              <button disabled className="px-4 py-2 text-sm font-medium text-slate-500 bg-slate-200 rounded-md cursor-not-allowed">Buscar (Próximamente)</button>
            </div>
          </div>
        </section>

        {blogIndexLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => <ArticleSkeletonCard key={index} />)}
          </div>
        )}

        {blogIndexError && !blogIndexLoading && (
          <div className="text-center py-16 bg-red-50 p-8 rounded-md shadow-md">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <h3 className="mt-2 text-xl font-medium text-red-700">Error al Cargar Artículos</h3>
            <p className="mt-1 text-sm text-red-600">{blogIndexError}</p>
            <button
              onClick={loadBlogArticles}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md transition duration-300"
            >
              Reintentar Carga
            </button>
          </div>
        )}

        {!blogIndexLoading && !blogIndexError && displayedArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {!blogIndexLoading && !blogIndexError && displayedArticles.length === 0 && (
          <div className="text-center py-16">
             <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
            <h3 className="mt-2 text-xl font-medium text-slate-800">No hay artículos disponibles</h3>
            <p className="mt-1 text-sm text-slate-500">Vuelve pronto para más contenido o intenta de nuevo.</p>
          </div>
        )}

        {!blogIndexLoading && !blogIndexError && (
             <div className="mt-16 text-center"> <p className="text-slate-500 text-sm italic">(Mostrando {displayedArticles.length} artículos. Paginación no implementada.)</p> </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndexPage;
