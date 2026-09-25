"use client"

import Image from "next/image"
import Link from "next/link"
import { LayoutGrid, ShoppingBag, UserCircle2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"

export function SiteHeader() {
  const { cantidadTotal, setAbierto } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-foreground text-background">
      <nav
        aria-label="Principal"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/image/Logo-Loba.jpg"
            alt="Logo de LOBA BAGUES"
            width={56}
            height={56}
            className="size-12 rounded-full object-cover ring-1 ring-background/30"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg tracking-[0.18em] sm:text-xl">LOBA BAGUES</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-background/60">
              Cosmética
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/#productos"
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-background/10 sm:hidden"
          >
            <LayoutGrid className="size-5" aria-hidden="true" />
            <span className="sr-only">Categorías</span>
          </Link>
          <Link
            href="/#productos"
            className="mr-4 hidden text-sm uppercase tracking-[0.2em] text-background/80 transition-colors hover:text-background sm:block"
          >
            Categorías
          </Link>
          <Link
            href="/quienes-somos"
            className="mr-2 hidden text-sm uppercase tracking-[0.2em] text-background/80 transition-colors hover:text-background sm:block"
          >
            Quiénes somos
          </Link>
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-background/10"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            <span className="sr-only">Abrir carrito de compras</span>
            {cantidadTotal > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">
                {cantidadTotal}
              </span>
            )}
          </button>
          <Link
            href="/admin"
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-background/10"
          >
            <UserCircle2 className="size-5" aria-hidden="true" />
            <span className="sr-only">Panel de gestión</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
