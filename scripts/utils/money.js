 export function formatNaira(priceKobo) {
  const naira = priceKobo / 100;
  return `₦${naira.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
