// src/components/CompareButton.tsx
import { useState } from 'react';
import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Property } from '@/types/property';
import { getCompareList, togglePropertyCompare } from '@/lib/storage';

interface CompareButtonProps {
  property: Property;
}

export function CompareButton({ property }: CompareButtonProps) {
  // Lazy initialization: lee del localStorage solo la primera vez que se dibuja el botón
  const [isSelected, setIsSelected] = useState(() => 
    getCompareList().some((p) => p.id === property.id)
  );

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); 
    
    const result = togglePropertyCompare(property);
    
    // Si falla (ej. límite de 3), mostramos error y salimos de la función
    if (!result.success) {
      toast.error(result.message);
      return; //devolviendo "void"
    }

    // Si tuvo éxito, actualizamos la UI
    setIsSelected(!isSelected);
    
    // Operador ternario para el mensaje
    isSelected 
      ? toast.info('Removida de la comparación')
      : toast.success('Agregada a la comparación');
      
    // Avisamos al resto de la app
    window.dispatchEvent(new Event('compare-list-updated'));
  };

  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      size="sm"
      className="flex items-center gap-2"
      onClick={handleToggle}
    >
      <Scale className="h-4 w-4" />
      {isSelected ? 'Agregado' : 'Comparar'}
    </Button>
  );
}