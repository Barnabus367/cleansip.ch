import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CleanSip Logo"
      viewBox="0 0 60 60"
      {...props}
      className={clsx('h-8 w-8', props.className)}
    >
      {/* Professional CleanSip S-shaped straw icon from brandkit */}
      <defs>
        <pattern id="strawPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="2" x2="4" y2="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      
      {/* S-shaped straw main stroke */}
      <path d="M18 12 C18 12 18 22 25 22 L28 22 C35 22 35 28 35 28 L35 32 C35 32 35 38 42 38 L45 38" 
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Pattern overlay */}
      <path d="M18 12 C18 12 18 22 25 22 L28 22 C35 22 35 28 35 28 L35 32 C35 32 35 38 42 38 L45 38" 
            stroke="url(#strawPattern)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Top opening */}
      <circle cx="18" cy="12" r="2.5" fill="currentColor"/>
      {/* Bottom opening with ellipse */}
      <ellipse cx="45" cy="38" rx="3" ry="1.5" fill="currentColor"/>
    </svg>
  );
}
