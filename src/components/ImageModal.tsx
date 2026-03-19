import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}


// ============================================================================
// CUSTOM HOOKS (Lógica separada de la UI)
// ============================================================================

/**
 * Bloquea el scroll del fondo mientras el modal está abierto.
 */
function useScrollLock() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
}

/**
 * Maneja el estado de la imagen actual y la navegación por teclado.
 */
function useGalleryNavigation(totalImages: number, initialIndex: number, onClose: () => void) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Navegación en bucle
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToNext, goToPrev]);

  return { currentIndex, goToNext, goToPrev };
}




// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function ImageModal({ images, initialIndex, onClose }: ImageModalProps): React.ReactElement | null {
  // 1. Inicializamos nuestros hooks
  useScrollLock();
  const { currentIndex, goToNext, goToPrev } = useGalleryNavigation(images.length, initialIndex, onClose);

  // 2. Validación temprana
  if (images === undefined || images === null || images.length === 0) {
    return null;
    }

  // 3. Helper para evitar que los clics en botones cierren el modal
  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose} // Cierra al hacer clic en el fondo oscuro
    >
      {/* Barra superior: Contador y botón de cerrar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-white">
        <div className="text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
          {currentIndex + 1} de {images.length}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Botón Anterior */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 text-white hover:bg-white/20 rounded-full h-12 w-12"
        onClick={(e) => handleAction(e, goToPrev)}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      {/* Imagen Principal */}
      <img
        src={images[currentIndex]}
        alt={`Vista ampliada ${currentIndex + 1}`}
        className="max-h-[85vh] max-w-[85vw] object-contain select-none"
        onClick={(e) => e.stopPropagation()} // Previene cierre al hacer clic en la foto
      />

      {/* Botón Siguiente */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 text-white hover:bg-white/20 rounded-full h-12 w-12"
        onClick={(e) => handleAction(e, goToNext)}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  );
}