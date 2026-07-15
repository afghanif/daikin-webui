import { motion } from 'framer-motion'

interface WaveBackgroundProps {
  className?: string
  inverted?: boolean
}

export default function WaveBackground({ className = '', inverted = false }: WaveBackgroundProps) {
  const color1 = inverted ? 'rgba(255,255,255,0.15)' : 'rgba(0,151,224,0.15)'
  const color2 = inverted ? 'rgba(255,255,255,0.10)' : 'rgba(77,192,240,0.10)'
  const color3 = inverted ? 'rgba(255,255,255,0.08)' : 'rgba(0,114,168,0.08)'

  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Wave 1 */}
      <motion.svg
        viewBox="0 0 1440 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ marginBottom: '-4px' }}
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0,100 C240,180 480,20 720,100 C960,180 1200,20 1440,100 L1440,200 L0,200 Z"
          fill={color1}
        />
      </motion.svg>

      {/* Wave 2 */}
      <motion.svg
        viewBox="0 0 1440 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full absolute bottom-0"
        animate={{ x: [0, 80, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0,120 C200,60 400,160 720,120 C1040,80 1240,160 1440,120 L1440,200 L0,200 Z"
          fill={color2}
        />
      </motion.svg>

      {/* Wave 3 */}
      <motion.svg
        viewBox="0 0 1440 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full absolute bottom-0"
        animate={{ x: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0,150 C360,100 720,180 1080,140 C1200,120 1340,160 1440,150 L1440,200 L0,200 Z"
          fill={color3}
        />
      </motion.svg>
    </div>
  )
}
