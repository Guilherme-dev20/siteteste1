import { useEffect, useRef } from 'react'

const NUM_STARS = 200
const NUM_COMETS = 3

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let width, height

    // State
    const stars = []
    const comets = []

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function initStars() {
      stars.length = 0
      for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: randomBetween(0.3, 2),
          opacity: randomBetween(0.2, 1),
          twinkleSpeed: randomBetween(0.005, 0.02),
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    function spawnComet() {
      // Start from top-left area, move to bottom-right
      const startX = randomBetween(-100, width * 0.6)
      const startY = randomBetween(-100, height * 0.3)
      comets.push({
        x: startX,
        y: startY,
        vx: randomBetween(4, 8),
        vy: randomBetween(2, 5),
        length: randomBetween(80, 160),
        opacity: 1,
        life: 0,
        maxLife: randomBetween(80, 140),
      })
    }

    function drawNebula() {
      // Subtle nebula blobs
      const nebulas = [
        { x: width * 0.2, y: height * 0.3, r: 250, color: 'rgba(139,92,246,0.04)' },
        { x: width * 0.8, y: height * 0.6, r: 200, color: 'rgba(168,85,247,0.03)' },
        { x: width * 0.5, y: height * 0.1, r: 300, color: 'rgba(99,102,241,0.03)' },
      ]
      for (const n of nebulas) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
        grad.addColorStop(0, n.color)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawStars(t) {
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset)
        ctx.globalAlpha = star.opacity * twinkle
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    function drawComets() {
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i]
        c.x += c.vx
        c.y += c.vy
        c.life++

        const progress = c.life / c.maxLife
        const alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1

        // Tail (gradient line going backwards)
        const tailX = c.x - (c.vx / Math.hypot(c.vx, c.vy)) * c.length
        const tailY = c.y - (c.vy / Math.hypot(c.vx, c.vy)) * c.length

        const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.6, `rgba(196,181,253,${alpha * 0.3})`)
        grad.addColorStop(1, `rgba(255,255,255,${alpha})`)

        ctx.globalAlpha = 1
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(c.x, c.y)
        ctx.stroke()

        // Head glow
        const headGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 4)
        headGrad.addColorStop(0, `rgba(255,255,255,${alpha})`)
        headGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = headGrad
        ctx.beginPath()
        ctx.arc(c.x, c.y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Remove if out of bounds or life ended
        if (c.life >= c.maxLife || c.x > width + 100 || c.y > height + 100) {
          comets.splice(i, 1)
        }
      }
    }

    let lastCometTime = 0
    const COMET_INTERVAL = 4000 // ms between comets

    function animate(timestamp) {
      // Background
      ctx.fillStyle = '#050510'
      ctx.fillRect(0, 0, width, height)

      // Nebula
      drawNebula()

      // Stars
      drawStars(timestamp)

      // Comets
      if (timestamp - lastCometTime > COMET_INTERVAL) {
        spawnComet()
        lastCometTime = timestamp
      }
      drawComets()

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initStars()
    spawnComet() // spawn one immediately
    animationId = requestAnimationFrame(animate)

    window.addEventListener('resize', () => {
      resize()
      initStars()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
