interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const baseClasses = 'w-full min-h-[56px] rounded-xl font-medium transition-all duration-200 shadow-soft hover:shadow-lg flex items-center justify-center gap-3 text-base'

  const variantClasses = {
    primary: 'bg-rose-beige text-white hover:bg-rose-beige-hover',
    secondary: 'bg-white text-text-gray border-2 border-gray-200 hover:border-dusty-pink',
    outline: 'border-2 border-dusty-pink text-rose-beige hover:bg-dusty-pink hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
