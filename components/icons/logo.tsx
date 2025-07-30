import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CleanSip logo"
      viewBox="0 0 32 32"
      {...props}
      className={clsx('h-4 w-4 fill-primary', props.className)}
    >
      {/* Straw icon representing CleanSip */}
      <circle cx="16" cy="8" r="3" />
      <rect x="14" y="8" width="4" height="16" rx="2" />
      <circle cx="16" cy="26" r="2" />
    </svg>
  );
}
