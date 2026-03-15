import { motion } from 'framer-motion'

const items = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.1)',
    title: 'Compra 100% Segura',
    sub: 'Seus dados nunca são compartilhados',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
    ),
    color: '#34d399',
    bg: 'rgba(52,211,153,0.1)',
    title: 'Refazemos se precisar',
    sub: 'Não ficou bom? A gente resolve sem custo',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    title: '+500 pedidos entregues',
    sub: 'Clientes em Fortaleza e toda a região CE',
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
      </svg>
    ),
    color: '#25D366',
    bg: 'rgba(37,211,102,0.1)',
    title: 'Suporte humano no WhatsApp',
    sub: 'Respondemos na hora, pessoa real',
  },
]

export default function TrustBanner() {
  return (
    <section
      className="relative py-5 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #0a0615, #0e0a1e, #0a0615)',
        borderTop: '1px solid rgba(139,92,246,0.1)',
        borderBottom: '1px solid rgba(139,92,246,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 lg:justify-center"
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: item.bg, color: item.color }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.2 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '10px', color: '#4b5563', lineHeight: 1.3, marginTop: '2px' }}>
                  {item.sub}
                </p>
              </div>

              {/* Vertical divider (desktop only, except last) */}
              {i < items.length - 1 && (
                <div
                  className="hidden lg:block flex-shrink-0 ml-auto"
                  style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.07)' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
