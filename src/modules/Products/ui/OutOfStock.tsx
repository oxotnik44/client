export const OutOfStock = ({ isOutOfStock }: { isOutOfStock: boolean }) => {
  return isOutOfStock ? (
    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 rounded-[33px] flex items-center justify-center">
      <span className="text-white text-[18px] font-bold mt-[290px]">
        Нет в наличии
      </span>
    </div>
  ) : null;
};
