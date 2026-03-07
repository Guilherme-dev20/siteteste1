import { motion } from 'framer-motion'

export default function ThemeCard({ theme, index = 0, isActive = false, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
        ${isActive
          ? 'ring-2 shadow-purple-glow-lg'
          : 'hover:shadow-purple-glow'
        }`}
      style={{
        ringColor: theme.color,
        borderColor: isActive ? theme.color : 'transparent',
      }}
    >
      {/* Background Image */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={theme.cover}
          alt={theme.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ filter: isActive ? 'brightness(0.5)' : 'brightness(0.4)' }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.color}40 0%, rgba(5,5,16,0.85) 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{theme.icon}</span>
          <h3 className="text-white font-bold text-xl font-display">{theme.name}</h3>
        </div>
        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
          {theme.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: `${theme.color}30`, color: theme.color, border: `1px solid ${theme.color}40` }}
          >
            {theme.count} produtos
          </span>
          <motion.span
            animate={{ x: isActive ? 4 : 0 }}
            className="text-sm font-medium"
            style={{ color: theme.color }}
          >
            {isActive ? 'Ver menos ←' : 'Ver produtos →'}
          </motion.span>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{ backgroundColor: theme.color }}
        />
      )}
    </motion.div>
  )
}
