import { formatPrice } from '../lib/price-formatter';

const Price = ({
  amount,
  className,
  currencyCode = 'CHF',
  currencyCodeClassName
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {formatPrice(amount, currencyCode)}
  </p>
);

export default Price;
