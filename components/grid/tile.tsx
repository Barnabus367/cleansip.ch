import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-2 bg-white transition-all duration-300',
        {
          'border-primary shadow-lg': active,
          'border-gray-100 hover:border-primary/30 hover:shadow-md': !active && isInteractive,
          'border-gray-100': !active && !isInteractive
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain transition-transform duration-300', {
            'group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
