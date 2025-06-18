"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect, useCallback } from 'react';
import Link from 'next/link';

// Interfaces (assuming these are defined as in the previous prompt)
interface ServiceOption { id: string; name: string; icon?: string; description?: string; }
interface VehicleDetails { make: string; model: string; year: string; bodyType: string; }
interface PolarizadoOptions { vltFront: string; vltRear: string; vltRearWindshield: string; vltWindshieldStrip: string; filmType: string; }
interface WrapOptions { coverage: string; finish: string; }
interface PpfOptions { areas: string[]; }
interface CeramicoOptions { layers: string; }
interface AccesoriosOptions { desiredAccessory: string; }
type ServiceSpecificOptions = | PolarizadoOptions | WrapOptions | PpfOptions | CeramicoOptions | AccesoriosOptions | {};
interface QuoteItem { item: string; cost: number; details?: string; }
interface MockQuote { total: number; breakdown: QuoteItem[]; } // Used by client-side and API mock

// Constants (assuming these are defined as in the previous prompt)
const serviceOptionsList: ServiceOption[] = [ { id: 'polarizado', name: 'Polarizado', icon: '🕶️', description: 'Control solar, privacidad y estética.' }, { id: 'wrap', name: 'Wrap Vehicular', icon: '🎨', description: 'Cambio de color y diseños únicos.' }, { id: 'ppf', name: 'PPF (Paint Protection Film)', icon: '🛡️', description: 'Máxima protección para tu pintura.' }, { id: 'ceramico', name: 'Recubrimiento Cerámico', icon: '✨', description: 'Brillo extremo y fácil limpieza.' }, { id: 'accesorios', name: 'Accesorios', icon: '⚙️', description: 'Mejoras y complementos para tu auto.' }, ];
const carMakes = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Otro"];
const bodyTypes = ["Sedán", "SUV", "Pick-up", "Hatchback", "Coupé", "Minivan", "Otro"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 25 }, (_, i) => (currentYear - i).toString());
const vltLevels = ["N/A", "5%", "20%", "35%", "50%", "70%"];
const polarizadoFilmTypes = ["Estándar", "Carbon", "Cerámico", "Nanocerámico", "Seguridad"];
const wrapCoverageOptions = ["Completo (Full Wrap)", "Parcial (Techo, Capó)", "Franjas / Detalles"];
const wrapFinishOptions = ["Brillante", "Mate", "Satinado", "Cromo", "Texturizado", "Otro"];
const ppfAreaOptions = [ { id: 'fullFront', name: 'Kit Frontal Completo (Capó, Fascia, Salpicaderas, Espejos)'}, { id: 'bumper', name: 'Fascia Delantera (Bumper)'}, { id: 'hoodFull', name: 'Capó Completo'}, { id: 'mirrors', name: 'Espejos Laterales'}, { id: 'rockerPanels', name: 'Estribos (Rocker Panels)'}, { id: 'doorEdges', name: 'Filos de Puerta'}, { id: 'trunkLedge', name: 'Filo de Cajuela'}, ];
const ceramicoLayerOptions = ["1 Capa (Básico)", "3 Capas (Estándar)", "5 Capas (Premium)", "Específica para Rines"];

const initialVehicleDetails: VehicleDetails = { make: '', model: '', year: '', bodyType: '' };
const initialServiceSpecificOptions: ServiceSpecificOptions = {};

// Client-side Mock Quote Calculation (for Step 3 instant feedback)
const calculateMockQuoteClientSide = (
    serviceId: string | null,
    vehicle: VehicleDetails,
    options: ServiceSpecificOptions
): MockQuote => {
    // ... (Implementation from Prompt 14 - kept for brevity in this diff, but it's the same)
    let currentTotal = 0; const breakdown: QuoteItem[] = []; if (!serviceId) return { total: 0, breakdown: [] }; const serviceName = serviceOptionsList.find(s => s.id === serviceId)?.name || "Servicio Desconocido"; let basePrice = 0; switch (serviceId) { case 'polarizado': basePrice = 1200; break; case 'wrap': basePrice = 12000; break; case 'ppf': basePrice = 1000; break; case 'ceramico': basePrice = 3500; break; case 'accesorios': basePrice = 300; break; } breakdown.push({ item: `Servicio Base: ${serviceName}`, cost: basePrice }); currentTotal += basePrice; if (vehicle.bodyType === "SUV" || vehicle.bodyType === "Pick-up" || vehicle.bodyType === "Minivan") { const vehicleModifier = basePrice * 0.20; breakdown.push({ item: `Ajuste por Vehículo Grande: ${vehicle.bodyType}`, cost: vehicleModifier }); currentTotal += vehicleModifier; } else if (vehicle.bodyType === "Coupé") { const vehicleModifier = basePrice * 0.05; breakdown.push({ item: `Ajuste por Coupé`, cost: vehicleModifier }); currentTotal += vehicleModifier; } if (serviceId === 'polarizado' && options) { const pOpts = options as PolarizadoOptions; let filmCost = 0; if (pOpts.filmType === "Cerámico") filmCost = 800; else if (pOpts.filmType === "Nanocerámico") filmCost = 1500; else if (pOpts.filmType === "Seguridad") filmCost = 1000; else if (pOpts.filmType === "Carbon") filmCost = 400; if (filmCost > 0) breakdown.push({ item: `Tipo de Película: ${pOpts.filmType}`, cost: filmCost }); currentTotal += filmCost; const areasSelected = [pOpts.vltFront, pOpts.vltRear, pOpts.vltRearWindshield, pOpts.vltWindshieldStrip].filter(v => v && v !== "N/A").length; const areaCost = areasSelected * 50; if (areaCost > 0) breakdown.push({item: `Cobertura de ${areasSelected} área(s) de vidrios`, cost: areaCost}); currentTotal += areaCost; } else if (serviceId === 'wrap' && options) { const wOpts = options as WrapOptions; if (wOpts.coverage === "Completo (Full Wrap)") { currentTotal += 5000; breakdown.push({item: 'Cobertura: Full Wrap', cost: 5000})} else if (wOpts.coverage === "Parcial (Techo, Capó)") { currentTotal += 1500; breakdown.push({item: 'Cobertura: Parcial', cost: 1500})} if (wOpts.finish === "Cromo" || wOpts.finish === "Texturizado") { currentTotal += 6000; breakdown.push({item: `Acabado Especial: ${wOpts.finish}`, cost: 6000})} else if (wOpts.finish && wOpts.finish !== "Brillante") { currentTotal += 1000; breakdown.push({item: `Acabado: ${wOpts.finish}`, cost: 1000})} } else if (serviceId === 'ppf' && options) { const ppfOpts = options as PpfOptions; const numAreas = ppfOpts.areas?.length || 0; if (numAreas > 0) { const areaBaseCost = 2500; if(basePrice === 1000 && numAreas > 0) { currentTotal -= 1000; breakdown.shift(); } const totalAreaCost = numAreas * areaBaseCost; breakdown.push({ item: `PPF - ${numAreas} área(s) seleccionada(s)`, cost: totalAreaCost, details: ppfOpts.areas.map(id => ppfAreaOptions.find(opt => opt.id === id)?.name).join(', ') }); currentTotal += totalAreaCost; } } else if (serviceId === 'ceramico' && options) { const cOpts = options as CeramicoOptions; if (cOpts.layers === "3 Capas (Estándar)") { currentTotal += 1500; breakdown.push({item: 'Recubrimiento: 3 Capas', cost: 1500})} else if (cOpts.layers === "5 Capas (Premium)") { currentTotal += 3000; breakdown.push({item: 'Recubrimiento: 5 Capas Premium', cost: 3000})} } else if (serviceId === 'accesorios' && options) { const accOpts = options as AccesoriosOptions; if (accOpts.desiredAccessory && accOpts.desiredAccessory.length > 5) { const accessoryEstimate = 500 + accOpts.desiredAccessory.length * 5; breakdown.push({ item: `Estimado para: ${accOpts.desiredAccessory.substring(0,30)}...`, cost: accessoryEstimate }); currentTotal += accessoryEstimate; } } return { total: Math.round(currentTotal), breakdown };
};

// Simulated Backend API Call
const fetchQuoteFromAPI = async (payload: {
  serviceId: string | null;
  vehicle: VehicleDetails;
  options: ServiceSpecificOptions;
}): Promise<{ quote: MockQuote }> => {
  console.log("Simulating API Call - Sending Payload:", payload);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8 || payload.serviceId === 'force_success') { // 80% success rate or forced
        // Simulate a slightly different calculation or add an "API Fee"
        const clientQuote = calculateMockQuoteClientSide(payload.serviceId, payload.vehicle, payload.options);
        const apiAdjustedBreakdown = clientQuote.breakdown.map(item => ({ ...item, cost: Math.round(item.cost * 1.05) })); // 5% higher from API
        if (payload.serviceId) { // Add an API specific item only if serviceId exists
            apiAdjustedBreakdown.push({ item: "Tarifa de procesamiento API", cost: 50, details: "Simulado" });
        }
        const apiTotal = apiAdjustedBreakdown.reduce((sum, item) => sum + item.cost, 0);

        resolve({ quote: { total: apiTotal, breakdown: apiAdjustedBreakdown } });
      } else {
        reject({ message: 'Error al conectar con el servidor de cotizaciones. Intenta de nuevo.' });
      }
    }, 1500); // Simulate 1.5 second delay
  });
};


const CotizadorOnlinePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>(initialVehicleDetails);
  const [serviceSpecificOptions, setServiceSpecificOptions] = useState<ServiceSpecificOptions>(initialServiceSpecificOptions);

  // For client-side instant feedback in Step 3
  const [clientSideQuoteDetails, setClientSideQuoteDetails] = useState<MockQuote | null>(null);

  // For API quote in Step 4
  const [apiQuoteLoading, setApiQuoteLoading] = useState<boolean>(false);
  const [apiQuoteError, setApiQuoteError] = useState<string | null>(null);
  const [apiQuoteData, setApiQuoteData] = useState<MockQuote | null>(null); // Stores API response { quote: MockQuote }

  // State for Step 4 forms
  const [emailForQuote, setEmailForQuote] = useState<string>('');
  const [contactRequestName, setContactRequestName] = useState<string>('');
  const [contactRequestEmail, setContactRequestEmail] = useState<string>('');
  const [contactRequestPhone, setContactRequestPhone] = useState<string>('');
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmittingQuoteEmail, setIsSubmittingQuoteEmail] = useState(false);
  const [isSubmittingContactRequest, setIsSubmittingContactRequest] = useState(false);
  const [quoteEmailSuccess, setQuoteEmailSuccess] = useState(false);
  const [contactRequestSuccess, setContactRequestSuccess] = useState(false);

  const resetCotizador = () => {
    setCurrentStep(1); setSelectedService(null); setVehicleDetails(initialVehicleDetails);
    setServiceSpecificOptions(initialServiceSpecificOptions); setClientSideQuoteDetails(null);
    setApiQuoteLoading(false); setApiQuoteError(null); setApiQuoteData(null);
    setEmailForQuote(''); setContactRequestName(''); setContactRequestEmail(''); setContactRequestPhone('');
    setFormErrors({}); setQuoteEmailSuccess(false); setContactRequestSuccess(false);
    setIsSubmittingQuoteEmail(false); setIsSubmittingContactRequest(false);
  };

  const calculateAndSetClientSideQuote = useCallback(() => {
    if (currentStep === 3 && selectedService && vehicleDetails.make && vehicleDetails.model && vehicleDetails.year && vehicleDetails.bodyType) {
        const currentQuote = calculateMockQuoteClientSide(selectedService, vehicleDetails, serviceSpecificOptions);
        setClientSideQuoteDetails(currentQuote);
    } else {
        setClientSideQuoteDetails(null);
    }
  }, [currentStep, selectedService, vehicleDetails, serviceSpecificOptions]);

  useEffect(() => {
    calculateAndSetClientSideQuote();
  }, [serviceSpecificOptions, calculateAndSetClientSideQuote]); // Recalculate client-side quote when options change in step 3

  const triggerApiQuoteFetch = useCallback(async () => {
    if (!selectedService) return; // Should not happen if navigation logic is correct

    setApiQuoteLoading(true);
    setApiQuoteError(null);
    setApiQuoteData(null);
    try {
      const response = await fetchQuoteFromAPI({
        serviceId: selectedService,
        vehicle: vehicleDetails,
        options: serviceSpecificOptions,
      });
      setApiQuoteData(response.quote);
    } catch (error: any) {
      setApiQuoteError(error.message || 'Ocurrió un error desconocido.');
    } finally {
      setApiQuoteLoading(false);
    }
  }, [selectedService, vehicleDetails, serviceSpecificOptions]);


  useEffect(() => {
    if (currentStep === 4) {
      triggerApiQuoteFetch();
    }
  }, [currentStep, triggerApiQuoteFetch]);


  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    if (serviceId === 'polarizado') setServiceSpecificOptions({ vltFront: '', vltRear: '', vltRearWindshield: '', vltWindshieldStrip: '', filmType: '' });
    else if (serviceId === 'wrap') setServiceSpecificOptions({ coverage: '', finish: '' });
    else if (serviceId === 'ppf') setServiceSpecificOptions({ areas: [] });
    else if (serviceId === 'ceramico') setServiceSpecificOptions({ layers: '' });
    else if (serviceId === 'accesorios') setServiceSpecificOptions({ desiredAccessory: '' });
    else setServiceSpecificOptions({});
    setClientSideQuoteDetails(null); setApiQuoteData(null); setApiQuoteError(null);
  };

  const handleVehicleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleDetails(prev => ({ ...prev, [name]: value }));
    setClientSideQuoteDetails(null); setApiQuoteData(null); setApiQuoteError(null);
  };

  const handlePpfAreaChange = (areaId: string) => {
    setServiceSpecificOptions(prev => {
        const currentAreas = (prev as PpfOptions)?.areas || [];
        const newAreas = currentAreas.includes(areaId) ? currentAreas.filter(a => a !== areaId) : [...currentAreas, areaId];
        return { ...prev, areas: newAreas } as PpfOptions;
    });
  };

  const handleOptionsInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceSpecificOptions(prev => ({ ...prev, [name]: value } as ServiceSpecificOptions));
  };

  const canProceed = (): boolean => {
    if (currentStep === 1 && !selectedService) return false;
    if (currentStep === 2 && (!vehicleDetails.make || !vehicleDetails.model || !vehicleDetails.year || !vehicleDetails.bodyType)) return false;
    if (currentStep === 3) {
        if(selectedService === 'polarizado') { const opts = serviceSpecificOptions as PolarizadoOptions; if(!opts.filmType || !opts.vltFront || !opts.vltRear || !opts.vltRearWindshield) return false;}
        if(selectedService === 'wrap') { const opts = serviceSpecificOptions as WrapOptions; if(!opts.coverage || !opts.finish) return false; }
        if(selectedService === 'ppf') { const opts = serviceSpecificOptions as PpfOptions; if(!opts.areas || opts.areas.length === 0) return false; }
        if(selectedService === 'ceramico') { const opts = serviceSpecificOptions as CeramicoOptions; if(!opts.layers) return false; }
        if(selectedService === 'accesorios') { const opts = serviceSpecificOptions as AccesoriosOptions; if(!opts.desiredAccessory || opts.desiredAccessory.length < 10) return false; }
    }
    return true;
  };

  const nextStep = () => {
    if (!canProceed()) { alert("Por favor, completa todos los campos obligatorios (*) de este paso."); return; }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setApiQuoteError(null); // Clear API error when navigating back
    setCurrentStep(prev => prev - 1);
  };

  const getSelectedServiceName = () => serviceOptionsList.find(s => s.id === selectedService)?.name || "";

  const validateStep4Form = (formType: 'email' | 'contact'): boolean => { /* ... same as before ... */ const newErrors: any = {}; if (formType === 'email') { if (!emailForQuote.trim()) newErrors.emailForQuote = 'El email es obligatorio.'; else if (!/\S+@\S+\.\S+/.test(emailForQuote)) newErrors.emailForQuote = 'Email inválido.'; } else if (formType === 'contact') { if (!contactRequestName.trim()) newErrors.contactRequestName = 'El nombre es obligatorio.'; if (!contactRequestEmail.trim()) newErrors.contactRequestEmail = 'El email es obligatorio.'; else if (!/\S+@\S+\.\S+/.test(contactRequestEmail)) newErrors.contactRequestEmail = 'Email inválido.'; if (contactRequestPhone.trim() && !/^\+?[0-9\s-()]{7,20}$/.test(contactRequestPhone)) newErrors.contactRequestPhone = 'Teléfono inválido.'; } setFormErrors(newErrors); return Object.keys(newErrors).length === 0; };
  const handleSendQuoteEmail = async (e: FormEvent) => { e.preventDefault(); setQuoteEmailSuccess(false); if (!validateStep4Form('email')) return; setIsSubmittingQuoteEmail(true); const fullQuoteData = { action: "SendQuoteByEmail", emailRecipient: emailForQuote, service: selectedService, serviceName: getSelectedServiceName(), vehicle: vehicleDetails, options: serviceSpecificOptions, quote: apiQuoteData }; console.log("Full Quote Data to Email (API):", fullQuoteData); await new Promise(resolve => setTimeout(resolve, 1000)); setIsSubmittingQuoteEmail(false); setQuoteEmailSuccess(true); };
  const handleContactRequestSubmit = async (e: FormEvent) => { e.preventDefault(); setContactRequestSuccess(false); if (!validateStep4Form('contact')) return; setIsSubmittingContactRequest(true); const fullContactData = { action: "RequestContactToDiscuss", contactInfo: { name: contactRequestName, email: contactRequestEmail, phone: contactRequestPhone }, service: selectedService, serviceName: getSelectedServiceName(), vehicle: vehicleDetails, options: serviceSpecificOptions, quote: apiQuoteData }; console.log("Full Contact Request Data (API):", fullContactData); await new Promise(resolve => setTimeout(resolve, 1000)); setIsSubmittingContactRequest(false); setContactRequestSuccess(true); };

  // Render functions for Step 3 options (minified for brevity, assume full implementation from Prompt 14)
  const renderPolarizadoOptions = () => ( <div className="space-y-6"><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Vidrios Delanteros Laterales <span className="text-red-500">*</span></label><select name="vltFront" value={(serviceSpecificOptions as PolarizadoOptions)?.vltFront || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.map(lvl => <option key={`front-${lvl}`} value={lvl}>{lvl}</option>)}</select><p className="text-xs text-slate-500 mt-1">Legalidad puede variar. <Link href="/legal" className="text-teal-600 hover:underline">Más info.</Link></p></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Vidrios Traseros Laterales <span className="text-red-500">*</span></label><select name="vltRear" value={(serviceSpecificOptions as PolarizadoOptions)?.vltRear || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.map(lvl => <option key={`rear-${lvl}`} value={lvl}>{lvl}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Medallón Trasero <span className="text-red-500">*</span></label><select name="vltRearWindshield" value={(serviceSpecificOptions as PolarizadoOptions)?.vltRearWindshield || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.map(lvl => <option key={`rearwindshield-${lvl}`} value={lvl}>{lvl}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Nivel VLT Franja Parabrisas</label><select name="vltWindshieldStrip" value={(serviceSpecificOptions as PolarizadoOptions)?.vltWindshieldStrip || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona VLT</option>{vltLevels.filter(l => l !== "5%").map(lvl => <option key={`windshieldstrip-${lvl}`} value={lvl}>{lvl}</option>)}</select><p className="text-xs text-slate-500 mt-1">Generalmente solo franja superior permitida.</p></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Película <span className="text-red-500">*</span></label><select name="filmType" value={(serviceSpecificOptions as PolarizadoOptions)?.filmType || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Tipo</option>{polarizadoFilmTypes.map(type => <option key={type} value={type}>{type}</option>)}</select></div></div>);
  const renderWrapOptions = () => ( <div className="space-y-6"><div><label className="block text-sm font-medium text-slate-700 mb-1">Área de Cobertura <span className="text-red-500">*</span></label><select name="coverage" value={(serviceSpecificOptions as WrapOptions)?.coverage || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Cobertura</option>{wrapCoverageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Acabado <span className="text-red-500">*</span></label><select name="finish" value={(serviceSpecificOptions as WrapOptions)?.finish || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Acabado</option>{wrapFinishOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div></div>);
  const renderPpfOptions = () => ( <div className="space-y-4"><label className="block text-sm font-medium text-slate-700 mb-2">Selecciona Áreas a Cubrir (al menos una <span className="text-red-500">*</span>):</label>{ppfAreaOptions.map(area => (<label key={area.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer"><input type="checkbox" name="areas" value={area.id} checked={((serviceSpecificOptions as PpfOptions)?.areas || []).includes(area.id)} onChange={() => handlePpfAreaChange(area.id)} className="h-5 w-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500"/><span className="text-slate-700">{area.name}</span></label>))}</div>);
  const renderCeramicoOptions = () => ( <div><label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Recubrimiento / Capas <span className="text-red-500">*</span></label><select name="layers" value={(serviceSpecificOptions as CeramicoOptions)?.layers || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm"><option value="">Selecciona Opción</option>{ceramicoLayerOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>);
  const renderAccesoriosOptions = () => ( <div><label htmlFor="desiredAccessory" className="block text-sm font-medium text-slate-700 mb-1">Describe el Accesorio que Buscas <span className="text-red-500">*</span></label><textarea id="desiredAccessory" name="desiredAccessory" rows={4} value={(serviceSpecificOptions as AccesoriosOptions)?.desiredAccessory || ''} onChange={handleOptionsInputChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" placeholder="Ej: Sensores de reversa, luces LED, sistema de audio..." required minLength={10}/></div>);


  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 md:mb-16"> {/* ... Header content ... */} <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4"> Obtén tu Cotización Online Personalizada </h1> <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"> Nuestra herramienta te guiará paso a paso para obtener un estimado preciso y transparente. </p> </header>
        <div className="mb-10 p-4 bg-slate-100 rounded-lg shadow text-center"> <p className="text-lg font-semibold text-slate-700">Paso {currentStep} de 4: { currentStep === 1 ? "Selección de Servicio" : currentStep === 2 ? "Detalles del Vehículo" : currentStep === 3 ? "Configuración del Servicio" : "Resumen y Cotización" }</p> </div>
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl max-w-3xl mx-auto">
          {/* Step 1, 2, 3 ... (Render functions are minified for brevity) */}
          {currentStep === 1 && ( <section> <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">1. Selecciona el Tipo de Servicio <span className="text-red-500">*</span></h2> <div className="grid sm:grid-cols-2 gap-4"> {serviceOptionsList.map((service) => ( <button key={service.id} onClick={() => handleServiceSelect(service.id)} className={`p-4 rounded-lg shadow-md text-left transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${selectedService === service.id ? 'bg-teal-500 text-white ring-teal-500' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 ring-teal-300' } `} > <div className="flex items-center mb-1"> {service.icon && <span className="text-2xl mr-3">{service.icon}</span>} <h3 className="text-lg font-semibold">{service.name}</h3> </div> {service.description && <p className={`text-xs ${selectedService === service.id ? 'text-teal-100' : 'text-slate-500'}`}>{service.description}</p>} </button> ))} </div> </section> )}
          {currentStep === 2 && selectedService && ( <section> <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">2. Selecciona tu Vehículo <span className="text-red-500">*</span></h2> <div className="space-y-4"> <div> <label htmlFor="make" className="block text-sm font-medium text-slate-700">Marca <span className="text-red-500">*</span></label> <select id="make" name="make" value={vehicleDetails.make} onChange={handleVehicleInputChange} required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"> <option value="">Selecciona Marca</option> {carMakes.map(make => <option key={make} value={make}>{make}</option>)} </select> </div> <div> <label htmlFor="model" className="block text-sm font-medium text-slate-700">Modelo <span className="text-red-500">*</span></label> <input type="text" id="model" name="model" value={vehicleDetails.model} onChange={handleVehicleInputChange} placeholder="Ej: Corolla, Civic, Mustang" required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" /> </div> <div> <label htmlFor="year" className="block text-sm font-medium text-slate-700">Año <span className="text-red-500">*</span></label> <select id="year" name="year" value={vehicleDetails.year} onChange={handleVehicleInputChange} required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"> <option value="">Selecciona Año</option> {years.map(year => <option key={year} value={year}>{year}</option>)} </select> </div> <div> <label htmlFor="bodyType" className="block text-sm font-medium text-slate-700">Tipo de Carrocería <span className="text-red-500">*</span></label> <select id="bodyType" name="bodyType" value={vehicleDetails.bodyType} onChange={handleVehicleInputChange} required className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"> <option value="">Selecciona Tipo</option> {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)} </select> </div> </div> </section> )}
          {currentStep === 3 && selectedService && (
            <section>
                <h2 className="text-2xl font-semibold text-slate-700 mb-1 text-center">3. Configura tu Servicio <span className="text-red-500">*</span></h2>
                <p className="text-center text-teal-600 font-medium mb-6">{getSelectedServiceName()}</p>
                {selectedService === 'polarizado' && renderPolarizadoOptions()}
                {selectedService === 'wrap' && renderWrapOptions()}
                {selectedService === 'ppf' && renderPpfOptions()}
                {selectedService === 'ceramico' && renderCeramicoOptions()}
                {selectedService === 'accesorios' && renderAccesoriosOptions()}
                {clientSideQuoteDetails && (
                    <div className="mt-6 p-3 bg-slate-50 rounded-md border border-slate-200 text-right">
                        <p className="text-md font-semibold text-slate-700">Estimado (Cliente): <span className="text-teal-600">${clientSideQuoteDetails.total.toLocaleString('es-MX')} MXN</span></p>
                        <p className="text-xs text-slate-500">(Este estimado se actualiza al cambiar opciones)</p>
                    </div>
                )}
            </section>
          )}

          {/* Step 4: Quote Summary - API Driven */}
          {currentStep === 4 && (
            <section>
              <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">4. Tu Cotización Estimada (API)</h2>
              {apiQuoteLoading && (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                  <p className="mt-4 text-slate-600 font-semibold">Calculando cotización oficial...</p>
                </div>
              )}
              {apiQuoteError && (
                <div className="text-center py-10 bg-red-50 p-6 rounded-md">
                  <p className="text-red-600 font-semibold mb-3">Error: {apiQuoteError}</p>
                  <button onClick={triggerApiQuoteFetch} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-md transition duration-300">
                    Intentar de Nuevo
                  </button>
                </div>
              )}
              {apiQuoteData && !apiQuoteLoading && !apiQuoteError && (
                <>
                  <div className="bg-slate-100 p-6 rounded-lg shadow-inner mb-8">
                    {/* ... Display API quote data (similar to clientSideQuoteDetails before) ... */}
                    <h3 className="text-xl font-semibold text-slate-700 mb-1">Servicio: <span className="text-teal-600">{getSelectedServiceName()}</span></h3>
                    <p className="text-sm text-slate-500 mb-3">Vehículo: {vehicleDetails.make} {vehicleDetails.model} ({vehicleDetails.year}) - {vehicleDetails.bodyType}</p>
                    <div className="mb-4"><h4 className="text-lg font-semibold text-slate-700 mb-2">Desglose (API):</h4><ul className="space-y-1 text-sm">{apiQuoteData.breakdown.map((item, index) => ( <li key={index} className="flex justify-between border-b border-slate-200 py-1.5"> <span className="text-slate-600">{item.item} {item.details && <span className="text-xs text-slate-400">({item.details})</span>}</span> <span className="font-medium text-slate-700">${item.cost.toLocaleString('es-MX')}</span> </li> ))}</ul></div>
                    <div className="text-right mt-4 border-t border-slate-300 pt-3"><p className="text-2xl font-bold text-teal-600">Total Estimado (API): ${apiQuoteData.total.toLocaleString('es-MX')} MXN</p></div>
                  </div>
                  <div className="my-8 border-t border-slate-200"></div>
                  {/* ... Action Forms from Prompt 14, now using apiQuoteData ... */}
                  <div className="space-y-8">
                    <div> <h3 className="text-xl font-semibold text-slate-700 mb-3">Recibir Cotización Detallada por Email</h3> <form onSubmit={handleSendQuoteEmail} className="flex flex-col sm:flex-row gap-3"> <input type="email" placeholder="Tu correo electrónico" value={emailForQuote} onChange={(e) => setEmailForQuote(e.target.value)} className={`flex-grow p-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 ${formErrors.emailForQuote ? 'border-red-500' : 'border-slate-300'}`} /> <button type="submit" disabled={isSubmittingQuoteEmail || quoteEmailSuccess} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-md transition duration-300 disabled:opacity-60"> {isSubmittingQuoteEmail ? 'Enviando...' : quoteEmailSuccess ? 'Email Enviado ✔' : 'Enviar Email'} </button> </form> {formErrors.emailForQuote && <p className="text-red-500 text-xs mt-1">{formErrors.emailForQuote}</p>} {quoteEmailSuccess && <p className="text-green-600 text-sm mt-2">Cotización enviada a {emailForQuote}.</p>} </div>
                    <div> <h3 className="text-xl font-semibold text-slate-700 mb-3">Solicitar Contacto para Asesoría Personalizada</h3> <form onSubmit={handleContactRequestSubmit} className="space-y-3"> <input type="text" placeholder="Nombre Completo *" value={contactRequestName} onChange={(e) => setContactRequestName(e.target.value)} className={`w-full p-3 border rounded-md shadow-sm ${formErrors.contactRequestName ? 'border-red-500' : 'border-slate-300'}`} /> {formErrors.contactRequestName && <p className="text-red-500 text-xs -mt-2 mb-1">{formErrors.contactRequestName}</p>} <input type="email" placeholder="Correo Electrónico *" value={contactRequestEmail} onChange={(e) => setContactRequestEmail(e.target.value)} className={`w-full p-3 border rounded-md shadow-sm ${formErrors.contactRequestEmail ? 'border-red-500' : 'border-slate-300'}`} /> {formErrors.contactRequestEmail && <p className="text-red-500 text-xs -mt-2 mb-1">{formErrors.contactRequestEmail}</p>} <input type="tel" placeholder="Teléfono (Opcional)" value={contactRequestPhone} onChange={(e) => setContactRequestPhone(e.target.value)} className={`w-full p-3 border rounded-md shadow-sm ${formErrors.contactRequestPhone ? 'border-red-500' : 'border-slate-300'}`} /> {formErrors.contactRequestPhone && <p className="text-red-500 text-xs -mt-2 mb-1">{formErrors.contactRequestPhone}</p>} <button type="submit" disabled={isSubmittingContactRequest || contactRequestSuccess} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300 disabled:opacity-60"> {isSubmittingContactRequest ? 'Enviando Solicitud...' : contactRequestSuccess ? 'Solicitud Enviada ✔' : 'Solicitar Llamada'} </button> </form> {contactRequestSuccess && <p className="text-green-600 text-sm mt-2 text-center">Gracias, {contactRequestName}. Te contactaremos pronto.</p>} </div>
                    <div> <h3 className="text-xl font-semibold text-slate-700 mb-3">¿Prefieres Agendar Directamente?</h3> <Link href="/contacto" legacyBehavior><a className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300"> Visita Nuestra Página de Contacto </a></Link> </div>
                    <button onClick={resetCotizador} className="w-full mt-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-md transition duration-300"> Iniciar Nueva Cotización </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-10 text-center p-3 bg-yellow-50 border border-yellow-200 rounded-md"> <strong>Disclaimer:</strong> Esta es una cotización estimada y está sujeta a inspección final del vehículo y confirmación de disponibilidad de materiales y opciones. Precios en MXN. </p>
                </>
              )}
            </section>
          )}

          <div className="mt-10 flex justify-between"> {/* Navigation Buttons */}
            {currentStep > 1 && (<button onClick={prevStep} className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">Anterior</button>)}
            {currentStep < 4 && (<button onClick={nextStep} disabled={!canProceed()} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto">Siguiente</button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CotizadorOnlinePage;
