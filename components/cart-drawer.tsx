"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatPrecio } from "@/lib/products"
import { WHATSAPP_NUMERO } from "@/lib/site-config"

export function CartDrawer() {
  const { items, total, abierto, setAbierto, quitar, cambiarCantidad, vaciar } = useCart()
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => {
    if (!abierto) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAbierto(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [abierto, setAbierto])

  if (!abierto) return null

  const comprar = () => {
    if (items.length === 0) {
      setMensaje("Tu carrito está vacío.")
      return
    }

    const lineas = items.map(
      (item) => `• ${item.nombre} x${item.cantidad} — ${formatPrecio(item.precio * item.cantidad)}`,
    )
    const texto = [
      "¡Hola! Quiero hacer este pedido:",
      "",
      ...lineas,
      "",
      `Total: ${formatPrecio(total)}`,
    ].join("\n")

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`
    window.open(url, "_blank", "noopener,noreferrer")

    vaciar()
    setMensaje("Te llevamos a WhatsApp para confirmar tu pedido.")
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={() => setAbierto(false)}
        className="absolute inset-0 bg-foreground/50"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito de compras"
        className="relative flex h-full w-full max-w-sm flex-col bg-card shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 className="font-serif text-lg text-card-foreground">Tu carrito</h2>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm leading-relaxed text-muted-foreground">
              Todavía no agregaste productos.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    width={64}
                    height={64}
                    className="size-16 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium text-card-foreground">{item.nombre}</p>
                    <p className="text-sm text-primary">{formatPrecio(item.precio)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Minus className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">{`Quitar una unidad de ${item.nombre}`}</span>
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                        className="flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Plus className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">{`Agregar una unidad de ${item.nombre}`}</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => quitar(item.id)}
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 transition-colors hover:text-destructive hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          {mensaje && (
            <p role="status" className="mb-3 text-sm text-primary">
              {mensaje}
            </p>
          )}
          <div className="mb-4 flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-primary">{formatPrecio(total)}</span>
          </div>
          <button
            type="button"
            onClick={comprar}
            className="w-full rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            Comprar
          </button>
        </div>
      </aside>
    </div>
  )
}
