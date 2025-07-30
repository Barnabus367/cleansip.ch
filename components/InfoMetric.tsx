interface InfoMetricProps {
  label: string;
  value: string;
  className?: string;
}

export default function InfoMetric({ label, value, className = "" }: InfoMetricProps) {
  return (
    <div className={className}>
      <p className="text-[0.6rem] tracking-[0.2em] text-secondary-500/40 uppercase mb-1">
        {label}
      </p>
      <p className="text-xs font-medium text-secondary-500">
        {value}
      </p>
    </div>
  );
}
