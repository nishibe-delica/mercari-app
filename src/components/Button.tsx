interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const baseClasses = 'px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-dusty-pink to-dusty-rose text-white hover:from-dusty-rose hover:to-dusty-pink',
    secondary: 'bg-beige-100 text-gray-700 hover:bg-beige-200',
    outline: 'border-2 border-dusty-pink text-dusty-rose hover:bg-dusty-pink hover:text-white',
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
