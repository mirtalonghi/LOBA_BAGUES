"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { formatPrecio, type Product } from "@/lib/products"

type Slide = {
  key: string
  src: string
  alt: string
  etiqueta: string
  titulo: string
  texto: string
  precioLista?: number
  precio?: number
}

const slidesPorDefecto: Slide[] = [
  {
    key: "oil",
    src: "/image/Oil1.png",
    alt: "Aceite facial de la línea LOBA BAGUES",
    etiqueta: `Colección ${new Date().getFullYear()}`,
    titulo: "Aceites que iluminan",
    texto: "Fórmulas ligeras para una piel descansada todos los días.",
  },
  {
    key: "nails",
    src: "/image/nails-3.png",
    alt: "Esmaltes de uñas de la línea LOBA BAGUES",
    etiqueta: `Colección ${new Date().getFullYear()}`,
    titulo: "Color en tus manos",
    texto: "Esmaltes de larga duración en tonos de temporada.",
  },
  {
    key: "blush",
    src: "/image/blush-2.jpg",
    alt: "Rubor en polvo de la línea LOBA BAGUES",
    etiqueta: `Colección ${new Date().getFullYear()}`,
    titulo: "Rubores en tono natural",
    texto: "Texturas suaves que se difuminan sin esfuerzo.",
  },
]

function slidesDesdeOfertas(ofertas: Product[]): Slide[] {
  return ofertas.map((producto) => {
    const descuento =
      producto.precioLista > 0
        ? Math.round((1 - producto.precio / producto.precioLista) * 100)
        : 0
    return {
      key: `oferta-${producto.id}`,
      src: producto.imagen,
      alt: producto.nombre,
      etiqueta: descuento > 0 ? `Oferta · ${descuento}% off` : "Oferta",
      titulo: producto.nombre,
      texto: producto.descripcion,
      precioLista: producto.precioLista,
      precio: producto.precio,
    }
  })
}

export function HeroCarousel({ ofertas = [] }: { ofertas?: Product[] }) {
  const slides = ofertas.length > 0 ? slidesDesdeOfertas(ofertas) : slidesPorDefecto
  const total = slides.length
  const [activo, setActivo] = useState(0)
  const indice = activo % total
  const slide = slides[indice]

  const siguiente = useCallback(() => {
    setActivo((prev) => (prev + 1) % total)
  }, [total])

  const anterior = useCallback(() => {
    setActivo((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (total < 2) return
    const id = setInterval(siguiente, 6000)
    return () => clearInterval(id)
  }, [siguiente, total])

  return (
    <section
      aria-label={ofertas.length > 0 ? "Productos en oferta" : "Destacados"}
      aria-roledescription="carrusel"
      className="relative isolate overflow-hidden"
    >
      <div className="relative h-[460px] w-full sm:h-[480px] lg:h-[560px]">
        {slides.map((item, index) => (
          <Image
            key={item.key}
            src={item.src || "/placeholder.svg"}
            alt={index === indice ? item.alt : ""}
            aria-hidden={index !== indice}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${
              index === indice ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/45 to-foreground/10"
          aria-hidden="true"
        />

        <div
          aria-live="polite"
          className="relative flex h-full flex-col items-start justify-end gap-3 px-6 pb-16 text-background sm:px-10 lg:px-16"
        >
          <p className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-foreground">
            {slide.etiqueta}
          </p>
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
            {slide.titulo}
          </h2>
          {slide.texto ? (
            <p className="line-clamp-3 max-w-md text-sm leading-relaxed text-background/85 text-pretty sm:text-base">
              {slide.texto}
            </p>
          ) : null}

          {slide.precio !== undefined ? (
            <p className="flex items-baseline gap-3">
              {slide.precioLista !== undefined && slide.precioLista > slide.precio ? (
                <span className="text-sm text-background/70 line-through sm:text-base">
                  <span className="sr-only">Precio anterior: </span>
                  {formatPrecio(slide.precioLista)}
                </span>
              ) : null}
              <span className="font-serif text-3xl sm:text-4xl">
                <span className="sr-only">Precio de oferta: </span>
                {formatPrecio(slide.precio)}
              </span>
            </p>
          ) : null}

          <a
            href={ofertas.length > 0 ? "#ofertas" : "#productos"}
            className="mt-2 inline-flex items-center rounded-full bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {ofertas.length > 0 ? "Comprar oferta" : "Ver productos"}
          </a>
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={anterior}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Anterior</span>
            </button>
            <button
              type="button"
              onClick={siguiente}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Siguiente</span>
            </button>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivo(index)}
                  aria-current={index === indice}
                  className={`h-1.5 rounded-full transition-all ${
                    index === indice ? "w-8 bg-background" : "w-3 bg-background/50"
                  }`}
                >
                  <span className="sr-only">{`Ir a ${item.titulo}`}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
