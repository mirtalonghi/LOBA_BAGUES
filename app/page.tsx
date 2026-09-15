import Link from "next/link"

import { getCatalogo } from "@/app/actions/products"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductGrid } from "@/components/product-grid"

export default async function Page() {
  const catalogo = await getCatalogo()
  const promos = catalogo.filter((producto) => producto.enPromo)

  return (
    <main>
      <HeroCarousel />

      {promos.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-4 pt-16">
          <div className="mb-8 flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-accent">Promociones</p>
            <h2 className="font-serif text-3xl text-balance sm:text-4xl">Precios especiales</h2>
          </div>
          <ProductGrid productos={promos} />
        </section>
      ) : null}

      <section id="productos" className="mx-auto w-full max-w-6xl px-4 pt-16">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Catálogo</p>
          <h2 className="font-serif text-3xl text-balance sm:text-4xl">Todos los productos</h2>
        </div>

        {catalogo.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center">
            <p className="font-serif text-xl text-foreground">
              Todavía no hay productos publicados
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cargá el catálogo desde el panel de gestión para que aparezca en la tienda.
            </p>
            <Link
              href="/admin"
              className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-foreground"
            >
              Ir al panel
            </Link>
          </div>
        ) : (
          <ProductGrid productos={catalogo} />
        )}
      </section>
    </main>
  )
}
