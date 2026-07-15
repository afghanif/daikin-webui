import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  sway: number
  swaySpeed: number
  swayOffset: number
}

export default function AirParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    const COUNT = 40

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width ?? 0),
        y: (canvas?.height ?? 0) + Math.random() * 100,
        radius: 2 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.2,
        sway: Math.random() * 2 - 1,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
      }
    }

    for (let i = 0; i < COUNT; i++) {
      const p = createParticle()
      p.y = Math.random() * (canvas.height ?? 0)
      particles.push(p)
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.swayOffset += p.swaySpeed
        p.x += Math.sin(p.swayOffset) * 0.5
        p.y -= p.speed

        if (p.y < -p.radius * 2) {
          particles[i] = createParticle()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,151,224,${p.opacity})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
