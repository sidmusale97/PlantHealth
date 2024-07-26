export default function DecimalDisplay({ decimal }: { decimal: number }) {
    const LOW_THRESHOLD = 0.25;
    const HIGH_THRESHOLD = 0.75;
    let textColorClass;

    // Determine text color class based on value
    if (decimal < LOW_THRESHOLD || decimal > HIGH_THRESHOLD) {
        textColorClass = 'text-red-500'; // Red color for negative values
    } else {
        textColorClass = 'text-green-500'; // Green color for positive values
    }
    return (
        <span className={`font-bold text-lg ml-3 ${textColorClass}`}>
          {(decimal*100).toFixed(0)}%
        </span>
      );
}