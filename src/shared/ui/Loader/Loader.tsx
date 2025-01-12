/// <reference types="vite-plugin-svgr/client" />
import LoaderIcon from "src/assets/loader.svg?react";

interface Props {
  className?: string;
  marginTop?: number; // Новый пропс для отступа сверху в пикселях
}

export const Loader = ({ className, marginTop }: Props) => {
  // Значение по умолчанию 96
  return (
    <div style={{ marginTop: `${marginTop}px` }}>
      <LoaderIcon className={className} />
    </div>
  );
};
