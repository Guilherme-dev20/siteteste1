import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { campaign } from '../data/campaign'
import { products } from '../data/products'

export default function Campaign() {
  if (!campaign.active) return null

  const relatedProducts = products.filter((p) => campaign.productIds.includes(p.id))

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Fundo nebulosa */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-nebula-purple/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-red-400">
              Campanha
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
        </motion.div>

        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8
                     bg-gradient-to-br from-[#10101f] to-[#0a0a18]"
        >
          {/* ── Lado esquerdo: banner ────────────────────────────── */}
          <div className="relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
            <Image
              src={campaign.banner}
              alt={campaign.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              quality={95}
              priority
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#10101f] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10101f] via-transparent to-transparent lg:hidden" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                           tracking-widest uppercase text-white shadow-lg"
                style={{ backgroundColor: campaign.badgeColor }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {campaign.badge}
              </motion.span>
            </div>
          </div>

          {/* ── Lado direito: conteúdo ───────────────────────────── */}
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-nebula-purple mb-2">
                {campaign.subtitle}
              </p>
              <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">
                {campaign.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {campaign.description}
              </p>
            </motion.div>

            {/* Produtos relacionados */}
            <div className="space-y-3 mb-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600">
                Produtos relacionados
              </p>
              {relatedProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 bg-white/4 rounded-xl p-3 border border-white/6
                             hover:border-nebula-purple/40 hover:bg-nebula-purple/5 transition-all duration-200 group"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1a30]">
                    <img
                      src={product.placeholder}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate group-hover:text-nebula-purple transition-colors">
                      {product.name}
                    </p>
                    <p className="text-gray-500 text-xs">{product.category} · {product.theme}</p>
                  </div>
                  <button
                    onClick={() => {
                      const text = `Olá! Vi a campanha "${campaign.title}" e tenho interesse no produto: ${product.name}!`
                      window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank')
                    }}
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold
                               text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30
                               px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    <svg className="w-3.5 h-3.5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                    </svg>
                    Pedir
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Botão ver coleção */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href={campaign.collectionLink}
                className="inline-flex items-center gap-2 text-sm font-bold text-nebula-purple
                           hover:text-white border border-nebula-purple/40 hover:border-nebula-purple
                           hover:bg-nebula-purple/10 px-5 py-2.5 rounded-xl transition-all duration-200"
              >
                Ver coleção completa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
