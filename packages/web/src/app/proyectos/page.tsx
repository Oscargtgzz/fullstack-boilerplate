"use client";

import React, { useState, useMemo } from 'react'; // Added useMemo for optimizing filtered list
import Link from 'next/link';

interface FilterOption {
  id: string;
  name: string;
}

interface ProjectItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  serviceType: string; // 'polarizado', 'wrap', 'ppf', 'ceramico', 'accesorios'
  vehicleModel?: string;
}

const serviceFilters: FilterOption[] = [
  { id: 'all', name: 'Todos los Proyectos' },
  { id: 'polarizado', name: 'Polarizado' },
  { id: 'wrap', name: 'Wrap Vehicular' },
  { id: 'ppf', name: 'PPF' },
  { id: 'ceramico', name: 'Recubrimiento Cerámico' },
  { id: 'accesorios', name: 'Accesorios' },
];

// Mock Dataset
const mockProjectsData: ProjectItem[] = [
  { id: 'proj001', imageUrl: 'https://picsum.photos/seed/audiwrap/400/300', title: 'Wrap Completo Audi A4', description: 'Cambio de color a azul mate metálico.', serviceType: 'wrap', vehicleModel: 'Audi A4' },
  { id: 'proj002', imageUrl: 'https://picsum.photos/seed/bmwpolarizado/400/300', title: 'Polarizado Cerámico BMW Serie 3', description: 'Máxima protección UV y reducción de calor.', serviceType: 'polarizado', vehicleModel: 'BMW Serie 3' },
  { id: 'proj003', imageUrl: 'https://picsum.photos/seed/mustangppf/400/300', title: 'PPF Frontal Mustang GT', description: 'Protección completa para el frontal contra piedras y rayones.', serviceType: 'ppf', vehicleModel: 'Ford Mustang GT' },
  { id: 'proj004', imageUrl: 'https://picsum.photos/seed/suvceramico/400/300', title: 'Recubrimiento Cerámico SUV', description: 'Brillo espectacular y protección duradera para esta camioneta.', serviceType: 'ceramico', vehicleModel: 'Toyota RAV4' },
  { id: 'proj005', imageUrl: 'https://picsum.photos/seed/lucesled/400/300', title: 'Instalación Luces LED', description: 'Mejora de iluminación interior y exterior.', serviceType: 'accesorios', vehicleModel: 'Honda Civic' },
  { id: 'proj006', imageUrl: 'https://picsum.photos/seed/mercedespolarizado/400/300', title: 'Polarizado de Seguridad Mercedes C', description: 'Tono oscuro permitido y mayor resistencia.', serviceType: 'polarizado', vehicleModel: 'Mercedes-Benz Clase C' },
  { id: 'proj007', imageUrl: 'https://picsum.photos/seed/jeepwrap/400/300', title: 'Wrap Camuflaje Jeep Wrangler', description: 'Diseño personalizado de camuflaje digital.', serviceType: 'wrap', vehicleModel: 'Jeep Wrangler' },
  { id: 'proj008', imageUrl: 'https://picsum.photos/seed/porscheppf/400/300', title: 'PPF Completo Porsche 911', description: 'Cobertura total para mantener la pintura impecable.', serviceType: 'ppf', vehicleModel: 'Porsche 911' },
  { id: 'proj009', imageUrl: 'https://picsum.photos/seed/teslaceramico/400/300', title: 'Cerámico Tesla Model 3', description: 'Protección y brillo para pintura delicada.', serviceType: 'ceramico', vehicleModel: 'Tesla Model 3' },
  { id: 'proj010', imageUrl: 'https://picsum.photos/seed/rinesaudi/400/300', title: 'Pintura de Rines Audi', description: 'Restauración y pintura negro brillante para rines.', serviceType: 'accesorios', vehicleModel: 'Audi S5' },
  { id: 'proj011', imageUrl: 'https://picsum.photos/seed/fordloboppf/400/300', title: 'PPF en Zonas de Carga Lobo', description: 'Protección en batea y bordes para pick-up de trabajo.', serviceType: 'ppf', vehicleModel: 'Ford Lobo' },
  { id: 'proj012', imageUrl: 'https://picsum.photos/seed/kiawrapmate/400/300', title: 'Wrap Mate Kia Stinger', description: 'Transformación a un elegante gris mate.', serviceType: 'wrap', vehicleModel: 'Kia Stinger' },
  { id: 'proj013', imageUrl: 'https://picsum.photos/seed/mazdapolarizado/400/300', title: 'Polarizado Nanocarbon Mazda CX-5', description: 'Excelente rechazo de calor y tono uniforme.', serviceType: 'polarizado', vehicleModel: 'Mazda CX-5' },
  { id: 'proj014', imageUrl: 'https://picsum.photos/seed/chargerstripes/400/300', title: 'Franjas Deportivas Charger', description: 'Diseño e instalación de franjas personalizadas.', serviceType: 'wrap', vehicleModel: 'Dodge Charger' },
  { id: 'proj015', imageUrl: 'https://picsum.photos/seed/bmwceramico/400/300', title: 'Tratamiento Cerámico BMW X5', description: 'Protección integral y realce de color profundo.', serviceType: 'ceramico', vehicleModel: 'BMW X5' },
];


const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [vehicleModelFilter, setVehicleModelFilter] = useState<string>(''); // For optional vehicle model text filter

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleVehicleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleModelFilter(event.target.value.toLowerCase());
  };

  // Implement Filtering Logic
  const displayedProjects = useMemo(() => {
    let projects = mockProjectsData;

    // Filter by service type
    if (activeFilter !== 'all') {
      projects = projects.filter(p => p.serviceType === activeFilter);
    }

    // Filter by vehicle model (if text is entered)
    if (vehicleModelFilter) {
      projects = projects.filter(p =>
        p.vehicleModel?.toLowerCase().includes(vehicleModelFilter)
      );
    }
    return projects;
  }, [activeFilter, vehicleModelFilter]);


  return (
    <div className="bg-slate-100 py-12 md:py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Nuestros Proyectos: Inspiración para tu Vehículo
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Explora una selección de nuestros trabajos anteriores. Cada proyecto refleja nuestra dedicación a la calidad, la precisión y la satisfacción del cliente.
          </p>
        </header>

        <section className="mb-10 md:mb-12 p-6 bg-white rounded-xl shadow-lg sticky top-[70px] md:top-[80px] z-40 backdrop-blur-md bg-opacity-90"> {/* Adjusted sticky top value */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-700 mb-2 md:mb-0 whitespace-nowrap">Filtrar por Servicio:</h2>
              <div className="flex flex-wrap gap-2">
                {serviceFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterChange(filter.id)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors duration-150
                      ${activeFilter === filter.id
                        ? 'bg-teal-500 text-white shadow-md'
                        : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }
                    `}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
              <label htmlFor="vehicleModelFilter" className="block text-sm font-medium text-slate-700 mb-1">Filtrar por Modelo:</label>
              <input
                type="text"
                id="vehicleModelFilter"
                value={vehicleModelFilter}
                onChange={handleVehicleModelChange}
                placeholder="Ej: Audi A4, Mustang"
                className="w-full md:w-64 p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
            </div>
          </div>
        </section>

        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {displayedProjects.map(project => (
              <Link
                href={`/proyectos/${project.id}`} // Dynamic placeholder link
                key={project.id}
                legacyBehavior // Recommended if child is <a> tag
              >
                <a className="block bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                  <div className="relative w-full h-56">
                    <img
                      src={project.imageUrl}
                      alt={`Proyecto: ${project.title}`}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full p-3">
                       <h3 className="text-md font-semibold text-white mb-1 truncate group-hover:text-teal-300 transition-colors">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-600 mb-2 h-10 overflow-hidden">{project.description}</p>
                    <span className="text-xs font-semibold text-teal-600 bg-teal-100 px-2.5 py-1 rounded-full inline-block">
                      {serviceFilters.find(f => f.id === project.serviceType)?.name || project.serviceType}
                    </span>
                    {project.vehicleModel && (
                        <span className="ml-2 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full inline-block">
                            {project.vehicleModel}
                        </span>
                    )}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-slate-800">No hay proyectos que coincidan</h3>
            <p className="mt-1 text-sm text-slate-500">Intenta ajustar tus filtros o revisa más tarde.</p>
          </div>
        )}

        <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm italic">(Mostrando {displayedProjects.length} de {mockProjectsData.length} proyectos totales. Paginación no implementada.)</p>
        </div>

      </div>
    </div>
  );
};

export default GalleryPage;
