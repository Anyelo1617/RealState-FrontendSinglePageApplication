import type React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ComparePage(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botón de regreso y Título */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a propiedades
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Comparar Propiedades</h1>
        <p className="text-muted-foreground mt-2">
          Analiza lado a lado las características de tus propiedades favoritas.
        </p>
      </div>

      {/* Empty State Temporal */}
      <div className="flex flex-col items-center justify-center p-12 mt-8 text-center border-2 border-dashed rounded-lg bg-muted/20">
        <h2 className="text-xl font-semibold mb-2">No hay propiedades seleccionadas</h2>
        <p className="text-muted-foreground mb-6">
          Vuelve a la página principal y selecciona hasta 3 propiedades para compararlas.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          Explorar propiedades
        </Link>
      </div>
    </div>
  );
}