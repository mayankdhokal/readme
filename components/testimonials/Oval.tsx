type OvalProps = {
  color: string
  className?: string
  style?: React.CSSProperties
  id?: string
}

export default function Oval({ color, className, style, id }: OvalProps) {
  return (
    <div
      id={id}
      className={`absolute rounded-full transition-all duration-500 ease-out ${className}`}
      style={{
        borderRadius: '50% 45% 55% 50%',
        backgroundColor: color,
        ...style
      }}
      aria-hidden
    />
  )
}

