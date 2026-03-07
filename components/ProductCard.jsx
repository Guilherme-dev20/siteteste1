import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="product-card group card-glass rounded-2xl overflow-hidden cursor-pointer
                 hover:border-nebula-purple/50 hover:shadow-purple-glow transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-space-dark">
        <img
          src={product.placeholder}
          alt={product.name}
          className="product-img w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Link
            href="/personalizar"
            className="w-full text-center bg-nebula-purple/90 text-white text-sm font-semibold
                       py-2 rounded-lg hover:bg-nebula-purple transition-colors duration-200"
          >
            Personalizar
          </Link>
        </div>

        {product.popular && (
          <div className="absolute top-3 left-3">
            <span className="bg-nebula-purple text-white text-xs font-semibold px-2.5 py-1 rounded-full
                             shadow-purple-glow">
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-semibold text-sm group-hover:text-nebula-purple
                         transition-colors duration-200 leading-tight">
            {product.name}
          </h3>
        </div>
        <p className="text-gray-500 text-xs">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-nebula-purple/80 bg-nebula-purple/10 px-2 py-1 rounded-full">
            {product.theme}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const text = `Olá! Tenho interesse no produto: ${product.name}. Gostaria de fazer um pedido!`
              window.open(
                `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`,
                '_blank'
              )
            }}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
            </svg>
            Pedir
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
