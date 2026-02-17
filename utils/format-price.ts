export const formatPrice = (price: number): string => {
  if (isNaN(price) || price === null || price === 0) {
    return "";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};
