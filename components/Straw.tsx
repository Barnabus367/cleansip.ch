interface StrawProps {
  delay: number;
  rotation: 'left' | 'right';
  height: 'short' | 'medium' | 'tall' | 'extra-tall';
}

export default function Straw({ delay, rotation, height }: StrawProps) {
  const heightClasses = {
    short: 'h-48',
    medium: 'h-52', 
    tall: 'h-56',
    'extra-tall': 'h-60'
  };

  const rotationClasses = {
    left: '-rotate-2',
    right: 'rotate-3'
  };

  return (
    <div
      className={`
        relative w-1.5 ${heightClasses[height]} bg-primary-200/70 rounded-full shadow-soft
        straw-gradient
        transform origin-bottom transition-all duration-700 hover:scale-105
        ${rotationClasses[rotation]}
      `}
      style={{
        animationDelay: `${delay}s`
      }}
      data-testid="straw"
    />
  );
}
