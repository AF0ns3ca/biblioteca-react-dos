import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ auth }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleUpgrade = () => {
        if (selectedPlan) {
            Inertia.post("/create-checkout-session", { plan: selectedPlan });
            console.log("Upgrade to premium");
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Hazte Premium" />
            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-10">
                            Mejora a <span className="text-premium">Premium</span>
                        </h1>
                        <p className="text-xl mb-5">
                            Disfruta de beneficios y características exclusivas convirtiéndote en miembro premium de BookNest.
                        </p>
                        <p className="text-xl mb-10">
                            ¡Elige el plan que mejor se adapte a ti y desbloquea un mundo de oportunidades!
                        </p>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row justify-center gap-10">
                        <div className={`bg-white rounded shadow-lg p-6 ${selectedPlan === 'monthly' ? 'border-4 border-yellow-500' : ''} cursor-pointer`} onClick={() => handlePlanSelect('monthly')}>
                            <h2 className="text-2xl font-bold mb-4">Plan Mensual</h2>
                            <p className="text-lg mb-2">Disfruta de todas las características premium por solo €3.99/mes.</p>
                            <ul className="list-disc pl-5 mb-4">
                                <li>Experiencia sin anuncios</li>
                                <li>¡Crea Bibliotecas sin límite!</li>
                                <li>Soporte prioritario al cliente</li>
                                <li>Acceso anticipado a nuevas funciones</li>
                            </ul>
                            <div className="text-center">
                                <span className="text-4xl font-bold">3.99€</span><span className="text-xl">/mes</span>
                            </div>
                        </div>

                        <div className={`bg-white rounded shadow-lg p-6 ${selectedPlan === 'annual' ? 'border-4 border-yellow-500' : ''} cursor-pointer`} onClick={() => handlePlanSelect('annual')}>
                            <h2 className="text-2xl font-bold mb-4">Plan Anual</h2>
                            <p className="text-lg mb-2">Obtén dos meses gratis con nuestro plan anual, por solo €39.99/año.</p>
                            <ul className="list-disc pl-5 mb-4">
                                <li>Experiencia sin anuncios</li>
                                <li>¡Crea Bibliotecas sin límite!</li>
                                <li>Soporte prioritario al cliente</li>
                                <li>Acceso anticipado a nuevas funciones</li>
                                <li>Prioridad en todos los sorteos</li>
                            </ul>
                            <div className="text-center">
                                <span className="text-4xl font-bold">39.99€</span><span className="text-xl">/año</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded"
                            onClick={handleUpgrade}
                            disabled={!selectedPlan}
                        >
                            ¡Hazte Premium Ahora!
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
