"use client"

import Image from "next/image"

import { useCart } from "@/components/cart-provider"
import { formatPrecio, type Product } from "@/lib/products"

export function ProductGrid({ productos }: { productos: Product[] }) {
  const { agregar } = useCart()

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {productos.map((producto) => (
        <li
          key={producto.id}
          className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card"
        >
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {producto.enPromo ? (
              <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                Promo
              </span>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {producto.categoria}
            </p>
            <h3 className="font-serif text-lg text-card-foreground">{producto.nombre}</h3>
            {producto.descripcion ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {producto.descripcion}
              </p>
            ) : null}

            <div className="mt-auto flex items-baseline gap-2 pt-2">
              <p className="text-base font-semibold text-primary">
                {formatPrecio(producto.precio)}
              </p>
              {producto.enPromo ? (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrecio(producto.precioLista)}
                </p>
              ) : null}
            </div>

            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {producto.stock > 0 ? `${producto.stock} en stock` : "Sin stock"}
            </p>

            <button
              type="button"
              disabled={producto.stock === 0}
              onClick={() => agregar(producto)}
              className="mt-3 w-full rounded-full bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {producto.stock === 0 ? "Sin stock" : "Añadir al carrito"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
