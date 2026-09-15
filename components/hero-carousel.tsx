"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    src: "/image/Oil1.png",
    alt: "Aceite facial de la línea LOBA BAGUES",
    titulo: "Aceites que iluminan",
    texto: "Fórmulas ligeras para una piel descansada todos los días.",
  },
  {
    src: "/image/nails-3.png",
    alt: "Esmaltes de uñas de la línea LOBA BAGUES",
    titulo: "Color en tus manos",
    texto: "Esmaltes de larga duración en tonos de temporada.",
  },
  {
    src: "/image/blush-2.jpg",
    alt: "Rubor en polvo de la línea LOBA BAGUES",
    titulo: "Rubores en tono natural",
    texto: "Texturas suaves que se difuminan sin esfuerzo.",
  },
]

export function HeroCarousel() {
  const [activo, setActivo] = useState(0)

  const siguiente = useCallback(() => {
    setActivo((prev) => (prev + 1) % slides.length)
  }, [])

  const anterior = useCallback(() => {
    setActivo((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const id = setInterval(siguiente, 6000)
    return () => clearInterval(id)
  }, [siguiente])

  return (
    <section aria-label="Destacados" className="relative isolate overflow-hidden">
      <div className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${
              index === activo ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-foreground/45" aria-hidden="true" />

        <div className="relative flex h-full flex-col items-start justify-end gap-3 px-6 pb-16 text-background sm:px-10 lg:px-16">
          <p className="text-[11px] uppercase tracking-[0.35em] text-background/70">
            Colección {new Date().getFullYear()}
          </p>
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
            {slides[activo].titulo}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-background/85 sm:text-base">
            {slides[activo].texto}
          </p>
          <a
            href="#productos"
            className="mt-2 inline-flex items-center rounded-full bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Ver productos
          </a>
        </div>

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
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActivo(index)}
              aria-current={index === activo}
              className={`h-1.5 rounded-full transition-all ${
                index === activo ? "w-8 bg-background" : "w-3 bg-background/50"
              }`}
            >
              <span className="sr-only">{`Ir a la imagen ${index + 1}`}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
