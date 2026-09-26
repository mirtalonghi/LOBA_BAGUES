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
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="relative h-72 w-full sm:h-96 lg:h-[480px]">
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

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground/40 px-3 py-2">
              {slides.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivo(index)}
                  aria-current={index === indice}
                  className={`h-1.5 rounded-full transition-all ${
                    index === indice ? "w-8 bg-background" : "w-3 bg-background/60"
                  }`}
                >
                  <span className="sr-only">{`Ir a ${item.titulo}`}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div aria-live="polite" className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
          <p className="whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-foreground sm:text-xs">
            {slide.etiqueta}
          </p>
          <a
            href={ofertas.length > 0 ? "#ofertas" : "#productos"}
            className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-foreground px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent hover:text-accent-foreground sm:px-6 sm:text-xs"
          >
            {ofertas.length > 0 ? "Comprar oferta" : "Ver productos"}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-2xl leading-tight text-foreground text-balance sm:text-3xl lg:text-4xl">
            {slide.titulo}
          </h2>
          {slide.texto ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              {slide.texto}
            </p>
          ) : null}
          {slide.precio !== undefined ? (
            <p className="flex items-baseline gap-3 pt-1">
              {slide.precioLista !== undefined && slide.precioLista > slide.precio ? (
                <span className="text-sm text-muted-foreground line-through sm:text-base">
                  <span className="sr-only">Precio anterior: </span>
                  {formatPrecio(slide.precioLista)}
                </span>
              ) : null}
              <span className="font-serif text-2xl text-foreground sm:text-3xl">
                <span className="sr-only">Precio de oferta: </span>
                {formatPrecio(slide.precio)}
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
