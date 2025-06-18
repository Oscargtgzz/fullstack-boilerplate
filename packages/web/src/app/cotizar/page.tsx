"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';

// Interfaces (assuming these are defined as in the previous prompt)
interface ServiceOption {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

interface VehicleDetails {
  make: string;
  model: string;
  year: string;
  bodyType: string;
}

interface PolarizadoOptions {
  vltFront: string;
  vltRear: string;
  vltRearWindshield: string;
  vltWindshieldStrip: string;
  filmType: string;
}

interface WrapOptions {
  coverage: string;
  finish: string;
}

interface PpfOptions {
  areas: string[];
}

interface CeramicoOptions {
  layers: string;
}

interface AccesoriosOptions {
  desiredAccessory: string;
}

type ServiceSpecificOptions =
  | PolarizadoOptions
  | WrapOptions
  | PpfOptions
  | CeramicoOptions
  | AccesoriosOptions
  | null;

interface QuoteItem {
    item: string;
    cost: number;
}

interface MockQuote {
    total: number;
    breakdown: QuoteItem[];
}

// Constants (assuming these are defined as in the previous prompt)
const serviceOptionsList: ServiceOption[] = [
  { id: 'polarizado', name: 'Polarizado', icon: '🕶️', description: 'Control solar, privacidad y estética.' },
  { id: 'wrap', name: 'Wrap Vehicular', icon: '🎨', description: 'Cambio de color y diseños únicos.' },
  { id: 'ppf', name: 'PPF (Paint Protection Film)', icon: '🛡️', description: 'Máxima protección para tu pintura.' },
  { id: 'ceramico', name: 'Recubrimiento Cerámico', icon: '✨', description: 'Brillo extremo y fácil limpieza.' },
  { id: 'accesorios', name: 'Accesorios', icon: '⚙️', description: 'Mejoras y complementos para tu auto.' },
];

const carMakes = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Otro"];
const bodyTypes = ["Sedán", "SUV", "Pick-up", "Hatchback", "Coupé", "Minivan", "Otro"];
const years = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString());

const vltLevels = ["5%", "20%", "35%", "50%", "70%", "No aplicar"];
const polarizadoFilmTypes = ["Estándar", "Carbon", "Cerámico", "Seguridad"];
const wrapCoverageOptions = ["Completo (Full Wrap)", "Parcial (Techo, Capó)", "Franjas / Detalles"];
const wrapFinishOptions = ["Brillante", "Mate", "Satinado", "Cromo", "Texturizado"];
const ppfAreaOptions = [
    { id: 'fullFront', name: 'Kit Frontal Completo (Capó, Fascia, Salpicaderas, Espejos)'},
    { id: 'bumper', name: 'Fascia Delantera (Bumper)'},
    { id: 'hoodPartial', name: 'Capó (Franja Parcial)'},
    { id: 'mirrors', name: 'Espejos Laterales'},
    { id: 'rockerPanels', name: 'Estribos (Rocker Panels)'},
];
const ceramicoLayerOptions = ["1 Capa (Básico)", "3 Capas (Estándar)", "5 Capas (Premium)", "Específica para Rines"];


// Mock Quote Calculation Function
const calculateMockQuote = (
    serviceId: string | null,
    vehicle: VehicleDetails,
    options: ServiceSpecificOptions
): MockQuote => {
    let basePrice = 0;
    const breakdown: QuoteItem[] = [];

    if (!serviceId) return { total: 0, breakdown: [] };

    const serviceName = serviceOptionsList.find(s => s.id === serviceId)?.name || "Servicio Desconocido";

    // Base prices per service
    switch (serviceId) {
        case 'polarizado': basePrice = 1500; break;
        case 'wrap': basePrice = 15000; break;
        case 'ppf': basePrice = 8000; break;
        case 'ceramico': basePrice = 4000; break;
        case 'accesorios': basePrice = 500; break;
        default: basePrice = 0;
    }
    breakdown.push({ item: `Servicio Base: ${serviceName}`, cost: basePrice });

    // Vehicle type modifier
    if (vehicle.bodyType === "SUV" || vehicle.bodyType === "Pick-up" || vehicle.bodyType === "Minivan") {
        const vehicleModifier = basePrice * 0.15; // 15% more for larger vehicles
        breakdown.push({ item: `Ajuste por Tipo Vehículo: ${vehicle.bodyType}`, cost: vehicleModifier });
        basePrice += vehicleModifier;
    }

    // Options modifiers
    if (serviceId === 'polarizado' && options) {
        const polarizadoOpts = options as PolarizadoOptions;
        if (polarizadoOpts.filmType === "Cerámico") {
            breakdown.push({ item: "Película Cerámica", cost: 1000 }); basePrice += 1000;
        } else if (polarizadoOpts.filmType === "Carbon") {
            breakdown.push({ item: "Película Carbon", cost: 500 }); basePrice += 500;
        } else if (polarizadoOpts.filmType === "Seguridad") {
            breakdown.push({ item: "Película de Seguridad", cost: 1200 }); basePrice += 1200;
        }
    } else if (serviceId === 'wrap' && options) {
        const wrapOpts = options as WrapOptions;
        if (wrapOpts.coverage === "Completo (Full Wrap)") {
             breakdown.push({ item: "Cobertura Completa", cost: 2000 }); basePrice += 2000; // Additional for full
        }
        if (wrapOpts.finish === "Cromo" || wrapOpts.finish === "Texturizado") {
            breakdown.push({ item: `Acabado Especial: ${wrapOpts.finish}`, cost: 5000 }); basePrice += 5000;
        }
    } else if (serviceId === 'ppf' && options) {
        const ppfOpts = options as PpfOptions;
        const areaCost = ppfOpts.areas.length * 1500; // Each area costs 1500
        if (areaCost > 0) {
            breakdown.push({ item: `Cobertura PPF (${ppfOpts.areas.length} áreas)`, cost: areaCost });
            basePrice += areaCost;
        }
    } else if (serviceId === 'ceramico' && options) {
        const ceramicoOpts = options as CeramicoOptions;
        if (ceramicoOpts.layers === "3 Capas (Estándar)") {
            breakdown.push({ item: "Recubrimiento 3 Capas", cost: 2000 }); basePrice += 2000;
        } else if (ceramicoOpts.layers === "5 Capas (Premium)") {
            breakdown.push({ item: "Recubrimiento 5 Capas Premium", cost: 4000 }); basePrice += 4000;
        }
    } else if (serviceId === 'accesorios' && options) {
        const accOpts = options as AccesoriosOptions;
        if (accOpts.desiredAccessory.length > 0) {
             // Simple estimate for accessories based on description length, very mock
            const accessoryEstimate = accOpts.desiredAccessory.length * 10;
            breakdown.push({ item: `Estimado Accesorio: ${accOpts.desiredAccessory.substring(0,20)}...`, cost: accessoryEstimate});
            basePrice += accessoryEstimate;
        }
    }

    return { total: Math.round(basePrice), breakdown };
};


const CotizadorOnlinePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    make: '', model: '', year: '', bodyType: '',
  });
  const [serviceSpecificOptions, setServiceSpecificOptions] = useState<ServiceSpecificOptions>(null);
  const [quote, setQuote] = useState<MockQuote | null>(null);

  // State for Step 4 forms
  const [emailForQuote, setEmailForQuote] = useState<string>('');
  const [contactRequestName, setContactRequestName] = useState<string>('');
  const [contactRequestEmail, setContactRequestEmail] = useState<string>('');
  const [contactRequestPhone, setContactRequestPhone] = useState<string>('');


  useEffect(() => {
    if (currentStep === 4 && selectedService) {
      const calculatedQuote = calculateMockQuote(selectedService, vehicleDetails, serviceSpecificOptions);
      setQuote(calculatedQuote);
    }
  }, [currentStep, selectedService, vehicleDetails, serviceSpecificOptions]);


  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setServiceSpecificOptions(null);
    // Reset specific options based on serviceId, if needed for default values
    if (serviceId === 'ppf') setServiceSpecificOptions({ areas: [] });
    else if (serviceId === 'polarizado') setServiceSpecificOptions({ vltFront: '', vltRear: '', vltRearWindshield: '', vltWindshieldStrip: '', filmType: '' });
    // etc. for other services if they need default non-null option structures
  };

  const handleVehicleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePpfAreaChange = (areaId: string) => {
    setServiceSpecificOptions(prev => {
        const currentAreas = (prev as PpfOptions)?.areas || [];
        if (currentAreas.includes(areaId)) {
            return { ...prev, areas: currentAreas.filter(a => a !== areaId) } as PpfOptions;
        } else {
            return { ...prev, areas: [...currentAreas, areaId] } as PpfOptions;
        }
    });
  };

  const handleOptionsInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceSpecificOptions(prev => ({ ...prev, [name]: value } as ServiceSpecificOptions));
  };


  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      alert("Por favor, selecciona un servicio."); return;
    }
    if (currentStep === 2 && (!vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.year || !vehicleDetails.bodyType)) {
      alert("Por favor, completa todos los detalles del vehículo."); return;
    }
    // TODO: Add validation for Step 3 based on selectedService if needed
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep === 4) setQuote(null); // Clear quote when going back
    setCurrentStep(prev => prev - 1);
  };

  const getSelectedServiceName = () => serviceOptionsList.find(s => s.id === selectedService)?.name || "";

  const handleSendQuoteEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!emailForQuote) { alert("Por favor, ingresa tu email."); return; }
    console.log("Quote Email Request:", { email: emailForQuote, quote, vehicleDetails, serviceSpecificOptions });
    alert(`Cotización enviada (simulado) a ${emailForQuote}. Revisa tu bandeja de entrada (y spam).`);
    setEmailForQuote('');
  };

  const handleContactRequestSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactRequestName || !contactRequestEmail) { alert("Nombre y Email son requeridos."); return; }
    console.log("Contact Request:", { name: contactRequestName, email: contactRequestEmail, phone: contactRequestPhone, quote, vehicleDetails, serviceSpecificOptions });
    alert(`Solicitud de contacto enviada (simulado) para ${contactRequestName}. Te contactaremos pronto.`);
    setContactRequestName('');
    setContactRequestEmail('');
    setContactRequestPhone('');
  };

  // Render functions for Step 3 options (assumed to be same as previous prompt)
  const renderPolarizadoOptions = () => ( /* ... same as before ... */ <div className="space-y-6"><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Vidrios Delanteros Laterales ⓘ</label><select name="vltFront" value={(serviceSpecificOptions as PolarizadoOptions)?.vltFront || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.map(lvl => <option key={`front-${lvl}`} value={lvl}>{lvl}</option>)}</select><p className="text-xs text-slate-500 mt-1">Legalidad puede variar. <Link href="/legal" className="text-teal-600 hover:underline">Más info.</Link></p></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Vidrios Traseros Laterales ⓘ</label><select name="vltRear" value={(serviceSpecificOptions as PolarizadoOptions)?.vltRear || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.map(lvl => <option key={`rear-${lvl}`} value={lvl}>{lvl}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Medallón Trasero ⓘ</label><select name="vltRearWindshield" value={(serviceSpecificOptions as PolarizadoOptions)?.vltRearWindshield || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.map(lvl => <option key={`rearwindshield-${lvl}`} value={lvl}>{lvl}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Franja Parabrisas ⓘ</label><select name="vltWindshieldStrip" value={(serviceSpecificOptions as PolarizadoOptions)?.vltWindshieldStrip || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.filter(l => l !== "5%").map(lvl => <option key={`windshieldstrip-${lvl}`} value={lvl}>{lvl}</option>)}</select><p className="text-xs text-slate-500 mt-1">Generalmente solo franja superior permitida.</p></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Película</label><select name="filmType" value={(serviceSpecificOptions as PolarizadoOptions)?.filmType || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Tipo</option>{polarizadoFilmTypes.map(type => <option key={type} value={type}>{type}</option>)}</select></div></div>);
  const renderWrapOptions = () => ( /* ... same as before ... */ <div className="space-y-6"><div><label className="block text-sm font-medium text-slate-700 mb-1">Área de Cobertura</label><select name="coverage" value={(serviceSpecificOptions as WrapOptions)?.coverage || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Cobertura</option>{wrapCoverageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Acabado</label><select name="finish" value={(serviceSpecificOptions as WrapOptions)?.finish || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Acabado</option>{wrapFinishOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div></div>);
  const renderPpfOptions = () => ( /* ... same as before ... */ <div className="space-y-4"><label className="block text-sm font-medium text-slate-700 mb-2">Selecciona Áreas a Cubrir:</label>{ppfAreaOptions.map(area => (<label key={area.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-md hover:bg-slate-50"><input type="checkbox" name="areas" value={area.id} checked={((serviceSpecificOptions as PpfOptions)?.areas || []).includes(area.id)} onChange={() => handlePpfAreaChange(area.id)} className="h-5 w-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"/><span className="text-slate-700">{area.name}</span></label>))}</div>);
  const renderCeramicoOptions = () => ( /* ... same as before ... */ <div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Recubrimiento / Capas</label><select name="layers" value={(serviceSpecificOptions as CeramicoOptions)?.layers || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Opción</option>{ceramicoLayerOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>);
  const renderAccesoriosOptions = () => ( /* ... same as before ... */ <div><label htmlFor="desiredAccessory" className="block text-sm font-medium text-slate-700 mb-1">Describe el Accesorio que Buscas</label><textarea id="desiredAccessory" name="desiredAccessory" rows={4} value={(serviceSpecificOptions as AccesoriosOptions)?.desiredAccessory || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Ej: Sensores de reversa, luces LED, sistema de audio..."/></div>);


  // Main Render
  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Obtén tu Cotización Online Personalizada
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Nuestra herramienta te guiará paso a paso para obtener un estimado preciso y transparente.
          </p>
        </header>

        <div className="mb-10 p-4 bg-slate-100 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-slate-700">Paso {currentStep} de 4: {
            currentStep === 1 ? "Selección de Servicio" :
            currentStep === 2 ? "Detalles del Vehículo" :
            currentStep === 3 ? "Configuración del Servicio" :
            "Resumen y Cotización"
          }</p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl max-w-3xl mx-auto">
          {/* Steps 1, 2, 3 ... */}
          {currentStep === 1 && ( <section> <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">1. Selecciona el Tipo de Servicio</h2> <div className="grid sm:grid-cols-2 gap-4"> {serviceOptionsList.map((service) => ( <button key={service.id} onClick={() => handleServiceSelect(service.id)} className={`p-4 rounded-lg shadow-md text-left transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${selectedService === service.id ? 'bg-teal-500 text-white ring-teal-500' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 ring-teal-300' } `} > <div className="flex items-center mb-1"> {service.icon && <span className="text-2xl mr-3">{service.icon}</span>} <h3 className="text-lg font-semibold">{service.name}</h3> </div> {service.description && <p className={`text-xs ${selectedService === service.id ? 'text-teal-100' : 'text-slate-500'}`}>{service.description}</p>} </button> ))} </div> </section> )}
          {currentStep === 2 && selectedService && ( <section> <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">2. Selecciona tu Vehículo</h2> <div className="space-y-4"> <div> <label htmlFor="make" className="block text-sm font-medium text-slate-700">Marca</label> <select id="make" name="make" value={vehicleDetails.make} onChange={handleVehicleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"> <option value="">Selecciona Marca</option> {carMakes.map(make => <option key={make} value={make}>{make}</option>)} </select> </div> <div> <label htmlFor="model" className="block text-sm font-medium text-slate-700">Modelo</label> <input type="text" id="model" name="model" value={vehicleDetails.model} onChange={handleVehicleInputChange} placeholder="Ej: Corolla, Civic, Mustang" className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" /> </div> <div> <label htmlFor="year" className="block text-sm font-medium text-slate-700">Año</label> <select id="year" name="year" value={vehicleDetails.year} onChange={handleVehicleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"> <option value="">Selecciona Año</option> {years.map(year => <option key={year} value={year}>{year}</option>)} </select> </div> <div> <label htmlFor="bodyType" className="block text-sm font-medium text-slate-700">Tipo de Carrocería</label> <select id="bodyType" name="bodyType" value={vehicleDetails.bodyType} onChange={handleVehicleInputChange} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"> <option value="">Selecciona Tipo</option> {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)} </select> </div> </div> </section> )}
          {currentStep === 3 && selectedService && ( <section> <h2 className="text-2xl font-semibold text-slate-700 mb-1 text-center">3. Configura tu Servicio</h2> <p className="text-center text-teal-600 font-medium mb-6">{getSelectedServiceName()}</p> {selectedService === 'polarizado' && renderPolarizadoOptions()} {selectedService === 'wrap' && renderWrapOptions()} {selectedService === 'ppf' && renderPpfOptions()} {selectedService === 'ceramico' && renderCeramicoOptions()} {selectedService === 'accesorios' && renderAccesoriosOptions()} </section> )}

          {/* Step 4: Quote Summary */}
          {currentStep === 4 && quote && (
            <section>
              <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">4. Tu Cotización Estimada</h2>
              <div className="bg-slate-100 p-6 rounded-lg shadow-inner mb-8">
                <h3 className="text-xl font-semibold text-slate-700 mb-1">Servicio: <span className="text-teal-600">{getSelectedServiceName()}</span></h3>
                <p className="text-sm text-slate-500 mb-3">Vehículo: {vehicleDetails.make} {vehicleDetails.model} ({vehicleDetails.year}) - {vehicleDetails.bodyType}</p>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-slate-700 mb-2">Desglose Estimado:</h4>
                  <ul className="space-y-1 text-sm">
                    {quote.breakdown.map((item, index) => (
                      <li key={index} className="flex justify-between border-b border-slate-200 py-1">
                        <span className="text-slate-600">{item.item}</span>
                        <span className="font-medium text-slate-700">${item.cost.toLocaleString('es-MX')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right mt-4">
                  <p className="text-2xl font-bold text-teal-600">
                    Total Estimado: ${quote.total.toLocaleString('es-MX')} MXN
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-slate-200"></div>

              {/* Action Steps Section */}
              <div className="space-y-8">
                {/* Send Quote by Email */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">Recibir Cotización por Email</h3>
                  <form onSubmit={handleSendQuoteEmail} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={emailForQuote}
                      onChange={(e) => setEmailForQuote(e.target.value)}
                      required
                      className="flex-grow p-3 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
                      Enviar Email
                    </button>
                  </form>
                </div>

                {/* Request Contact to Discuss */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-3">Solicitar Contacto para Asesoría</h3>
                  <form onSubmit={handleContactRequestSubmit} className="space-y-3">
                    <input type="text" placeholder="Nombre Completo" value={contactRequestName} onChange={(e) => setContactRequestName(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                    <input type="email" placeholder="Correo Electrónico" value={contactRequestEmail} onChange={(e) => setContactRequestEmail(e.target.value)} required className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                    <input type="tel" placeholder="Teléfono (Opcional)" value={contactRequestPhone} onChange={(e) => setContactRequestPhone(e.target.value)} className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
                      Solicitar Llamada
                    </button>
                  </form>
                </div>

                {/* Book Appointment */}
                <div>
                   <h3 className="text-xl font-semibold text-slate-700 mb-3">Agendar una Cita</h3>
                    <Link href="/contacto" legacyBehavior>
                        <a className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
                            Ir a Agendar Cita
                        </a>
                    </Link>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-10 text-center">
                <strong>Disclaimer:</strong> Esta es una cotización estimada y está sujeta a inspección final del vehículo y confirmación de disponibilidad de materiales y opciones. Precios en MXN.
              </p>
            </section>
          )}


          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-between">
            {currentStep > 1 && (
              <button onClick={prevStep} className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
                Anterior
              </button>
            )}
            {currentStep < 4 && selectedService && (
              <button
                onClick={nextStep}
                disabled={ (currentStep === 1 && !selectedService) || (currentStep === 2 && (!vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.year || !vehicleDetails.bodyType)) }
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 ml-auto"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizadorOnlinePage;
