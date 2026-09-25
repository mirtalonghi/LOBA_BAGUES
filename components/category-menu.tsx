import Link from "next/link"

import { cn } from "@/lib/utils"

type CategoryMenuProps = {
  categorias: string[]
  activa: string | null
}

export function CategoryMenu({ categorias, activa }: CategoryMenuProps) {
  const opciones = [{ nombre: "Todas", href: "/#productos", activo: activa === null }].concat(
    categorias.map((categoria) => ({
      nombre: categoria,
      href: `/?categoria=${encodeURIComponent(categoria)}#productos`,
      activo: activa === categoria,
    })),
  )

  return (
    <nav aria-label="Categorías" className="-mx-4 mb-8 overflow-x-auto px-4">
      <ul className="flex w-max gap-2">
        {opciones.map((opcion) => (
          <li key={opcion.nombre}>
            <Link
              href={opcion.href}
              scroll={false}
              aria-current={opcion.activo ? "page" : undefined}
              className={cn(
                "inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                opcion.activo
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-foreground",
              )}
            >
              {opcion.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
