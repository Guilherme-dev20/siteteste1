import { motion } from 'framer-motion'

export default function ThemeCard({ theme, index = 0, total = 6, featured = false }) {
  const num = String(index + 1).padStart(2, '0')
  const tot = String(total).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer w-full"
      style={{
        aspectRatio: featured ? '16/7' : '16/9',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      whileHover={{ borderColor: `${theme.color}55` }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={theme.cover}
          alt={theme.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.38)' }}
          loading="lazy"
        />
      </div>

      {/* Gradient overlay — stronger at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,16,0.92) 0%, rgba(5,5,16,0.3) 50%, transparent 100%)',
        }}
      />

      {/* Hover color tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${theme.color}12` }}
      />

      {/* Top-left: number */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-bold tracking-widest text-white/40 font-mono">
          {num}/{tot}
        </span>
      </div>

      {/* Top-right: icon */}
      <div className="absolute top-3 right-4 z-10 text-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        {theme.icon}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
        {/* Colored accent line */}
        <div
          className="w-8 h-[2px] rounded-full mb-2.5 transition-all duration-300 group-hover:w-14"
          style={{ backgroundColor: theme.color }}
        />

        <div className="flex items-end justify-between gap-3">
          <h3
            className="font-display font-black text-white uppercase tracking-wide leading-none"
            style={{ fontSize: featured ? 'clamp(1.2rem,2.5vw,1.75rem)' : 'clamp(0.85rem,1.6vw,1.1rem)' }}
          >
            {theme.name}
          </h3>

          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 mb-0.5"
            style={{
              background: `${theme.color}20`,
              color: theme.color,
              border: `1px solid ${theme.color}40`,
            }}
          >
            {theme.count} itens
          </span>
        </div>

        {featured && (
          <p className="text-gray-400 text-xs mt-1.5 line-clamp-1">{theme.description}</p>
        )}
      </div>

      {/* Bottom colored border on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
        style={{ backgroundColor: theme.color }}
      />
    </motion.div>
  )
}
