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
