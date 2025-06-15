import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "w-10 h-10", width = 120, height = 40 }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/raigine_logo.png"
        alt="rAIgine Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}
