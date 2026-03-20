import React, { useState } from 'react';
import { ImageModal } from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  title: string;
  fallbackImage?: string;
}

// ==========================================
// FUNCIONES AUXILIARES (Helpers)
// ==========================================
/**
 * Decide qué lista de imágenes usar
 */
function getImagesToDisplay(images: string[], fallbackImage?: string): string[] {
  if (images && images.length > 0) {
    return images; // Si hay imágenes, las usamos tal cual
  }
  if (fallbackImage) {
    return [fallbackImage]; // Si no hay imágenes, pero hay una de respaldo, la usamos
  }
  return []; // Si no hay absolutamente nada, devolvemos una lista vacía
}


// ======================================================
// SUBCOMPONENTES (Piezas de UI pequeñas y reutilizables)
// ======================================================

/**
 * Dibuja la imagen grande principal.
 */
function MainImage({ src, title, onClick }: { src: string; title: string; onClick: () => void }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={src}
        alt={title}
        className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      {/* Capa oscura sutil que aparece al pasar el mouse */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
}

/**
 * Dibuja una miniatura individual para la cuadrícula.
 */
function Thumbnail({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer group h-24"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Capa oscura sutil que aparece al pasar el mouse */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </div>
  );
}


// ==================================
// COMPONENTE PRINCIPAL
// ==================================

export function ImageGallery({ images, title, fallbackImage }: ImageGalleryProps): React.ReactElement | null {

  // Estado para saber si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para recordar a qué foto le hicimos clic
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Obtenemos las imágenes limpias usando nuestra función auxiliar
  const displayImages = getImagesToDisplay(images, fallbackImage);

  // Si no hay nada que mostrar, no dibujamos el componente
  if (displayImages.length === 0) return null;

  // Función para abrir el modal en una posición específica
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* --- SECCIÓN 1: La foto principal (índice 0) --- */}
      <MainImage
        src={displayImages[0]}
        title={title}
        onClick={() => openModal(0)}
      />

      {/* - SECCIÓN 2: Las miniaturas (solo si hay más de 1 foto) - */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {/* slice(1) corta la primera foto porque ya la mostramos arriba */}
          {displayImages.slice(1).map((img, index) => (
            <Thumbnail
              key={index + 1} // Sumamos 1 porque el slice alteró la posición original
              src={img}
              alt={`${title} - miniatura ${index + 2}`}
              onClick={() => openModal(index + 1)} // Le pasamos la posición real a abrir
            />
          ))}
        </div>
      )}

      {/* - SECCIÓN 3: El Modal a pantalla completa - */}
      {/* Solo existe en el DOM si isModalOpen es true */}
      {isModalOpen && (
        <ImageModal
          images={displayImages}
          initialIndex={selectedIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}