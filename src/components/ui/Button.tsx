import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  as?: 'button' | 'a'
  href?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-daikin-blue text-white hover:bg-daikin-blue-dark active:scale-95 focus-visible:ring-daikin-blue',
  secondary: 'bg-white text-daikin-blue border-2 border-daikin-blue hover:bg-daikin-blue-50 active:scale-95 focus-visible:ring-daikin-blue',
  ghost: 'text-daikin-blue hover:bg-daikin-blue-50 active:scale-95',
  white: 'bg-white text-daikin-blue hover:bg-daikin-blue-50 active:scale-95',
  outline: 'border border-soft-gray-2 text-charcoal hover:border-daikin-blue hover:text-daikin-blue active:scale-95',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
