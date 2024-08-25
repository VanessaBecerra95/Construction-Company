import type { MetaFunction } from "@remix-run/node";
import Formulario from "~/components/ui/formulario";

export const meta: MetaFunction = () => {
  return [
    { title: "Construction Company" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-gray-100">
      <section className="text-gray-800">
        <div className="container flex flex-col-reverse mx-auto py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col px-6 py-8 space-y-8 rounded-md sm:p-10 lg:p-16 lg:w-1/2 xl:w-2/5 bg-gradient-to-r from-indigo-600 to-blue-500 text-gray-50 shadow-lg">
            <h1 className="text-5xl font-bold leading-snug">
              Bienvenido al portal de gestión de personal 👷‍♂️👷‍♀️
            </h1>
            <p className="text-lg font-normal leading-relaxed">
              Esta página ha sido diseñada para facilitar la administración eficiente de nuestro valioso equipo humano. Aquí, los administradores pueden gestionar todos los aspectos relacionados con el personal de nuestra empresa de construcción.
            </p>
          </div>
          <div className="lg:w-1/2 xl:w-3/5">
            <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
              <img
                src="/images/img-hero.webp"
                alt="Two construction workers looking at a blueprint"
                className="rounded-lg shadow-lg aspect-video sm:min-h-96"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Registro de Personal 📝</h2>
          <Formulario />
        </div>
      </section>
    </div>
  );
}
