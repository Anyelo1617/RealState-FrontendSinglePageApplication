# 🏡 Módulo 2 - Real Estate React

**Frontend Single Page Application**

Portal inmobiliario moderno desarrollado con **React 19**, **Zod**, **React Hook Form**, **Tailwind CSS v4** y **Shadcn UI**. Esta aplicación permite listar, buscar, comparar y gestionar propiedades inmobiliarias ofreciendo una experiencia de desarrollo y de usuario de primer nivel.

---

## 💻 Stack Tecnológico

El proyecto implementa las últimas tecnologías frontend disponibles para ofrecer una experiencia moderna y eficiente:

| Dependencia | Versión | Propósito |
| :--- | :--- | :--- |
| **React** | `19.2.1` | Biblioteca UI Core |
| **Vite** | `7.3.0` | Build tool & Dev Server |
| **Tailwind CSS** | `4.1.8` | Framework de estilos (Motor v4 nativo) |
| **Shadcn UI** | `Manual` | Componentes UI reutilizables (Arquitectura Copy-Paste) |
| **React Hook Form** | `7.54.2` | Gestión de estado de formularios |
| **Zod** | `4.1.9` | Esquemas de validación (Runtime) |
| **Sonner** | `2.0.7` | Sistema de notificaciones (Toasts) |
| **React Router** | `7.1.1` | Enrutamiento cliente (SPA) |

---

## 🧠 Conceptos Clave Implementados

Este proyecto tiene un fuerte enfoque pedagógico, cubriendo implementaciones avanzadas:

1. **Tailwind CSS v4:** Configuración nativa CSS sin `tailwind.config.js`. Las variables de tema se definen directamente en CSS usando `@theme`.
2. **Validación Type-Safe con Custom Resolver:** Implementación de una capa de validación manual (Custom Resolver) que conecta Zod con React Hook Form, garantizando independencia de versiones y control total sobre el mapeo de errores.
3. **React 19 & Hooks Modernos:** Uso intensivo de `useState`, `useEffect`, `useMemo` y `useCallback` para la gestión eficiente de colecciones y optimización de re-renders.
4. **Estado Local & Persistencia:** Combinación de interactividad en memoria con persistencia de datos a largo plazo mediante `localStorage`.

---

## 🏗️ Arquitectura de la Aplicación

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITECTURA                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    ┌────────────────────────────────────────────────────────────────────┐   │
│    │                           App.tsx                                  │   │
│    │                    (Router + Layout)                               │   │
│    └────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│          ┌─────────────────────────┼─────────────────────────┐              │
│          ▼                         ▼                         ▼              │
│    ┌───────────┐            ┌───────────┐            ┌───────────┐          │
│    │ HomePage  │            │NewProperty│            │ Property  │          │
│    │           │            │   Page    │            │DetailPage │          │
│    └─────┬─────┘            └─────┬─────┘            └─────┬─────┘          │
│          │                        │                        │                │
│          ▼                        ▼                        │                │
│    ┌───────────┐            ┌───────────┐                  │                │
│    │ Property  │            │ Property  │                  │                │
│    │   Card    │            │   Form    │                  │                │
│    └───────────┘            └─────┬─────┘                  │                │
│                                   │                        │                │
│                                   ▼                        │                │
│                             ┌───────────┐                  │                │
│                             │   Zod     │                  │                │
│                             │ Validation│                  │                │
│                             └───────────┘                  │                │
│                                                            │                │
│    ┌───────────────────────────────────────────────────────┴───────────┐    │
│    │                         storage.ts                                │    │
│    │                    (CRUD + localStorage)                          │    │
│    └───────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

```
---

## 🚀 Instalación y Configuración
```text
### Prerrequisitos
- Node.js 20.19+ o 22.12+
- npm 10+

### Instalación y Comandos disponibles

# Servidor de desarrollo (puerto 3001)
npm run dev

# Verificar tipos de TypeScript
npm run type-check

# Ejecutar linter
npm run lint

# Formatear código
npm run format

# Build de producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📂 Estructura del Directorio

```text
module2-real-estate/
├── components.json            # Configuración de componentes de Shadcn UI
├── eslint.config.js           # Reglas de linting
├── index.html                 # Punto de entrada HTML
├── package.json               # Dependencias del proyecto
├── package-lock.json          # Árbol de versiones bloqueado
├── README.md                  # Esta documentación
├── TECH_STACK.md              # Versiones de dependencias y stack
├── tsconfig.json              # Configuración principal de TypeScript
├── tsconfig.node.json         # Configuración TS para entorno Node
├── vite.config.ts             # Configuración de Vite y Tailwind v4
├── slides/                    # Presentaciones y material de la clase
└── src/
    ├── main.tsx               # Punto de entrada de React
    ├── App.tsx                # Componente raíz y configuración de Rutas
    ├── index.css              # Estilos globales y variables de Shadcn
    ├── components/
    │   ├── ui/                # Componentes base Shadcn UI (button, card, etc.)
    │   ├── CompareButton.tsx  # Componente para añadir a comparación
    │   ├── PropertyCard.tsx   # Componente visual de la tarjeta de propiedad
    │   └── PropertyForm.tsx   # Formulario de creación con validación Zod
    ├── pages/
    │   ├── ComparePage.tsx    # Vista de tabla comparativa side-by-side
    │   ├── HomePage.tsx       # Vista principal (Catálogo y filtros)
    │   ├── NewPropertyPage.tsx# Vista para crear una nueva propiedad
    │   └── PropertyDetailPage.tsx # Vista de detalle de una propiedad
    ├── lib/
    │   ├── storage.ts         # Operaciones de localStorage
    │   └── utils.ts           # Funciones de utilidad (ej. cn para Tailwind)
    ├── types/
    │   └── property.ts        # Interfaces TS y esquemas de validación Zod
    └── data/
        └── sampleProperties.ts# Datos semilla de propiedades
```

## 🗺️Parte 1: Property Comparison:

1. **Selección de hasta 3 propiedades.**

2. **Tabla comparativa side-by-side (Precio, hab., baños, área, precio/m²).**

3. **Resaltado dinámico del mejor valor.**

4. **Persistencia y manejo de Empty States.**

```text
Link al video explicativo: https://youtu.be/7xq0ae6DlVo
```
