import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCompareList, togglePropertyCompare } from '@/lib/storage';
import { formatPrice } from '@/lib/utils';
import type { Property } from '@/types/property';

export default function ComparePage() {
  const [list, setList] = useState<Property[]>([]);

  // Carga la lista real al montar el componente
  useEffect(() => {
    setList(getCompareList());
  }, []);

  const handleRemove = (property: Property) => {
    const result = togglePropertyCompare(property);
    setList(result.newList);
  };

  // --- Si la lista está vacía, mostramos el "Empty State" con diseño ---
  if (list.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Volver a propiedades
        </Link>

        <div className="flex flex-col items-center justify-center p-12 mt-8 text-center border-2 border-dashed rounded-lg bg-muted/20">
          <h2 className="text-xl font-semibold mb-2">No hay propiedades seleccionadas</h2>
          <p className="text-muted-foreground mb-6">Selecciona hasta 3 propiedades para compararlas.</p>
          <Button asChild><Link to="/">Explorar propiedades</Link></Button>
        </div>

      </div>
    );
  }

  // --- LÓGICA DE CÁLCULO ---
  const minPrice = Math.min(...list.map(p => p.price));
  const maxArea = Math.max(...list.map(p => p.area));

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Encabezado del Bloque 1 */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver a propiedades
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Comparar Propiedades</h1>
      </div>

      {/* Tabla del Bloque 2 */}
      <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full border-collapse text-sm bg-white">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="p-4 text-left font-bold w-44">Especificaciones</th>
              {list.map(p => (
                <th key={p.id} className="p-4 border-l border-border min-w-[200px]">
                  <div className="flex flex-col items-center gap-3">
                    <img src={p.images[0]} className="w-24 h-16 object-cover rounded-md shadow-sm" alt="" />
                    <span className="font-bold truncate w-40 text-center">{p.title}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemove(p)} className="text-destructive h-8 hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4 mr-1" /> Quitar
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-4 font-semibold bg-muted/10">Precio</td>
              {list.map(p => (
                <td key={p.id} className={`p-4 text-center border-l border-border ${p.price === minPrice ? 'bg-green-50 text-green-700 font-bold' : ''}`}>
                  {p.price === minPrice && <Star className="inline h-3 w-3 mr-1 fill-current" />}
                  {formatPrice(p.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold bg-muted/10">Superficie</td>
              {list.map(p => (
                <td key={p.id} className={`p-4 text-center border-l border-border ${p.area === maxArea ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>
                  {p.area === maxArea && <Star className="inline h-3 w-3 mr-1 fill-current" />}
                  {p.area} m²
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold bg-muted/10">Dormitorios / Baños</td>
              {list.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-border">
                  {p.bedrooms} hab. / {p.bathrooms} baños
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold bg-muted/10">Precio / m²</td>
              {list.map(p => (
                <td key={p.id} className="p-4 text-center border-l border-border font-mono italic">
                  {formatPrice(Math.round(p.price / p.area))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}