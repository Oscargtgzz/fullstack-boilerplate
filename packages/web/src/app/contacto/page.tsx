"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link'; // Though not explicitly used for navigation, good to have for consistency

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string; // Optional field, but can have format validation
  message?: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
};

const initialErrors: FormErrors = {};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.phone.trim()) {
        newErrors.phone = 'El teléfono es obligatorio.';
    } else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) { // Basic phone format
        newErrors.phone = 'Ingresa un número de teléfono válido.';
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) { // Email format if provided
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) { // Clear error when user starts typing
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    console.log("Contact Form Data:", formData);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData(initialFormData); // Clear form
    // Optionally, keep form disabled or show a persistent success message
  };

  return (
    <div className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
            Contáctanos
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            [Placeholder: ¿Tienes alguna pregunta, necesitas asesoría o quieres agendar una cita? Estamos aquí para ayudarte. Completa el formulario o utiliza nuestros datos de contacto directo.]
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Contact Information Section */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">Información de Contacto</h2>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-1">Dirección:</h3>
                <p>[Placeholder: Blvd. Adolfo López Mateos XXXX, Col. YYYY, C.P. ZZZZZ, León, Guanajuato, México]</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-1">Teléfono:</h3>
                <a href="tel:+524771234567" className="hover:text-teal-700 transition-colors">[Placeholder: +52 (477) 123-4567]</a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-1">Correo Electrónico:</h3>
                <a href="mailto:contacto@tovar3.com" className="hover:text-teal-700 transition-colors">[Placeholder: contacto@tovar3.com]</a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-1">Horario de Atención:</h3>
                <p>[Placeholder: Lunes a Viernes: 9:00 AM - 7:00 PM]</p>
                <p>[Placeholder: Sábados: 9:00 AM - 2:00 PM]</p>
                <p>[Placeholder: Domingos: Cerrado]</p>
              </div>
            </div>
          </section>

          {/* Google Maps Integration Section */}
          <section className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">Encuéntranos Fácilmente</h2>
            <div className="aspect-w-16 aspect-h-9 bg-slate-200 rounded-lg shadow-inner flex items-center justify-center">
              {/* Placeholder for Google Map Embed */}
              {/* Example using iframe (replace with actual embed code later):
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.731888888888!2d-101.684069684988!3d21.1213809859478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842bbe45c9bf872b%3A0x5ae893c000000000!2sLe%C3%B3n%2C%20Gto.!5e0!3m2!1ses-419!2smx!4v1670000000000!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
              */}
               <p className="text-slate-500 p-4 text-center">[Placeholder: Google Map Embebido Aquí. Se mostrará un mapa interactivo de nuestra ubicación.]</p>
            </div>
          </section>
        </div>

        {/* Contact Form Section */}
        <section className="mt-10 md:mt-16 bg-white p-6 md:p-10 rounded-xl shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-8 text-center">Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo <span className="text-red-500">*</span></label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={`w-full p-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className={`w-full p-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`w-full p-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
              <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje <span className="text-red-500">*</span></label>
              <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} required className={`w-full p-3 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 ${errors.message ? 'border-red-500' : 'border-slate-300'}`}></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : submitStatus === 'success' ? 'Mensaje Enviado ✔' : 'Enviar Mensaje'}
              </button>
            </div>
            {submitStatus === 'success' && (
              <p className="text-green-600 text-center font-medium">¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.</p>
            )}
            {submitStatus === 'error' && Object.keys(errors).length > 0 && (
              <p className="text-red-600 text-center font-medium">Por favor, corrige los errores en el formulario.</p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
