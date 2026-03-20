// =============================================================================
// PÁGINA: DETALLE DE PROPIEDAD - Real Estate React
// =============================================================================
// Página que muestra información detallada de una propiedad.
//
// ## useParams()
// Hook de React Router que extrae parámetros de la URL.
// La ruta /property/:id define un parámetro dinámico 'id'.
// =============================================================================
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPropertyById, deleteProperty } from '@/lib/storage';
import {
  PROPERTY_TYPE_LABELS,
  OPERATION_TYPE_LABELS,
  AMENITY_LABELS,
  type Amenity,
  type Property, // Asumo que tienes este tipo exportado
} from '@/types/property';
import { formatPrice, formatArea } from '@/lib/utils';

import { ImageGallery } from '@/components/ImageGallery';

// ============================================================================
// CUSTOM HOOK (Lógica de datos separada de la UI)
// ============================================================================

/**
 * Hook que se encarga de buscar la propiedad y manejar su eliminación.
 */
function usePropertyData(id: string | undefined) {
  const navigate = useNavigate();
  const property = id ? getPropertyById(id) : undefined;

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar esta propiedad?')) {
      if (property) {
        deleteProperty(property.id);
        navigate('/'); // Volvemos al inicio tras borrar
      }
    }
  };

  return { property, handleDelete };
}

// ============================================================================
// SUBCOMPONENTES (Piezas de UI pequeñas y fáciles de leer)
// ============================================================================

/**
 * Dibuja la lista de amenidades con su icono de check.
 */
function AmenitiesList({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Amenidades</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2 text-muted-foreground">
              <span className="text-green-500">✓</span>
              {AMENITY_LABELS[amenity as Amenity]}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Dibuja los íconos de habitaciones, baños y área.
 */
function PropertySpecs({ property }: { property: Property }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-t border-b mb-6">
      {property.bedrooms > 0 && (
        <div className="text-center">
          <Bed className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
          <p className="font-semibold">{property.bedrooms}</p>
          <p className="text-xs text-muted-foreground">Habitaciones</p>
        </div>
      )}
      {property.bathrooms > 0 && (
        <div className="text-center">
          <Bath className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
          <p className="font-semibold">{property.bathrooms}</p>
          <p className="text-xs text-muted-foreground">Baños</p>
        </div>
      )}
      <div className="text-center">
        <Square className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
        <p className="font-semibold">{formatArea(property.area)}</p>
        <p className="text-xs text-muted-foreground">Área</p>
      </div>
    </div>
  );
}

/**
 * Dibuja los botones de acción (Contactar, Agendar, Eliminar).
 */
function ActionButtons({ onDelete }: { onDelete: () => void }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-3">
        <Button className="w-full" size="lg">Contactar al vendedor</Button>
        <Button variant="outline" className="w-full">Agendar visita</Button>
        <Button variant="destructive" className="w-full" onClick={onDelete}>
          Eliminar propiedad
        </Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL (Estructura general de la página)
// ============================================================================

export function PropertyDetailPage(): React.ReactElement {
  // 1. Extraemos el ID de la URL
  const { id } = useParams<{ id: string }>();
  
  // 2. Usamos nuestro Custom Hook para obtener los datos y acciones
  const { property, handleDelete } = usePropertyData(id);

  // 3. Early Return: Si la propiedad no existe, mostramos mensaje de error
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Propiedad no encontrada</h1>
        <p className="text-muted-foreground mb-6">La propiedad que buscas no existe o ha sido eliminada.</p>
        <Button asChild><Link to="/">Volver al listado</Link></Button>
      </div>
    );
  }

  // 4. Renderizamos la página completa y limpia
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botón de volver */}
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al listado
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA (Fotos, Descripción y Amenidades) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ¡Usamos nuestro componente modular ImageGallery! */}
          <ImageGallery 
            images={property.images} 
            title={property.title} 
            fallbackImage={`https://placehold.co/1200x600/e2e8f0/64748b?text=${encodeURIComponent(property.propertyType)}`}
          />

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {property.description}
              </p>
            </CardContent>
          </Card>

          <AmenitiesList amenities={property.amenities} />
        </div>

        {/* --- COLUMNA DERECHA (Precio, Detalles y Botones) --- */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              {/* Encabezado del precio */}
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(property.price)}
                </span>
              </div>
              {property.operationType === 'alquiler' && (
                <p className="text-muted-foreground mb-4">por mes</p>
              )}

              <div className="text-sm text-muted-foreground mb-4">
                {PROPERTY_TYPE_LABELS[property.propertyType]}
              </div>

              <h1 className="text-xl font-semibold mb-4">{property.title}</h1>

              {/* Ubicación */}
              <div className="flex items-start gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <div>
                  <p>{property.address}</p>
                  <p>{property.city}</p>
                </div>
              </div>

              {/* Habitaciones, baños, área */}
              <PropertySpecs property={property} />

              {/* Fecha */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <Calendar className="h-4 w-4" />
                <span>
                  Publicado el{' '}
                  {new Date(property.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <ActionButtons onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}