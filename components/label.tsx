import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-2xl border-2 border-white/20 bg-white/90 p-2 text-sm font-semibold text-secondary backdrop-blur-xl shadow-lg">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight font-medium">{title}</h3>
        <Price
          className="flex-none rounded-xl bg-primary px-4 py-2 text-white font-bold shadow-lg"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
