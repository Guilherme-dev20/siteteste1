import Link from 'next/link'
import { motion } from 'framer-motion'

function CometIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="8" r="5" fill="#a855f7" />
      <line x1="17" y1="11" x2="2" y2="26" stroke="url(#footerCometGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="footerCometGrad" x1="17" y1="11" x2="2" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7"/>
          <stop offset="1" stopColor="#a855f7" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

const footerLinks = {
  Navegação: [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Personalizar Produto', href: '/personalizar' },
    { label: 'Temas', href: '/temas' },
  ],
  'Sobre Nós': [
    { label: 'Nossa História', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'rgba(168,85,247,0.2)', background: 'rgba(10,10,15,0.9)' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <CometIcon />
              <span className="font-display font-bold text-xl text-white">
                Cometa <span className="text-purple-400">Personalização</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Transformamos suas ideias em produtos únicos. Visualize em 3D antes de pedir e faça seu pedido direto pelo WhatsApp — sem conta, sem formulário.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { text: '🛡️ Compra Segura' },
                { text: '🔄 Satisfação Garantida' },
                { text: '⭐ 4.9 · +500 pedidos' },
              ].map((b, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#6b7280',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '3px 8px',
                  }}
                >
                  {b.text}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              {/* WhatsApp */}
              <a
                href="https://wa.me/5585981501747"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#25D366] transition-all duration-300 hover:scale-110"
                style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/cometapersonalizacao"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#E1306C] transition-all duration-300 hover:scale-110"
                style={{ background: 'rgba(225,48,108,0.1)', border: '1px solid rgba(225,48,108,0.3)' }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-sm">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(168,85,247,0.1)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-gray-600 text-sm text-center">
              © {new Date().getFullYear()} Cometa Personalização. Todos os direitos reservados.
            </p>
            {/* Human identity — dúvida? fala com a gente */}
            <a
              href="https://wa.me/5585981501747?text=Olá! Tenho uma dúvida sobre os produtos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: '#25D366', fontSize: '12px', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.color = '#4ade80'}
              onMouseLeave={e => e.currentTarget.style.color = '#25D366'}
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
              </svg>
              Dúvidas? Fala com a gente →
            </a>
          </div>
          <p className="text-gray-700 text-xs flex items-center gap-1.5">
            Feito com
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none" style={{ display: 'inline' }}>
              <circle cx="20" cy="8" r="5" fill="#a855f7" />
              <line x1="17" y1="11" x2="2" y2="26" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
            </svg>
            para deixar sua marca no universo
          </p>
        </div>
      </div>
    </footer>
  )
}
