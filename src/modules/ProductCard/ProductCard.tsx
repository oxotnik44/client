import { Link, useParams, useNavigate } from "react-router-dom";
import { useProductCard } from "./api/fetchProductCard";
import { Loader } from "src/shared/ui/Loader/Loader";
import { ActionFooter } from "src/components/ActionFooter/ActionFooter";
import { ProductCardDetails } from "./ui/ProductCardDetails";
import { ProductPrice } from "./ui/ProductPrice";
import { CookingLink } from "./ui/CookingLink";
import ConfirmationModal from "./components/ConfirmationModal";
import arrowLeft from "src/assets/arrow-left.svg";
import { useState } from "react";

export const ProductCard = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductCard(Number(id));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCookingLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    navigate("/cooking");
    setShowModal(false);
  };

  const handleCancel = () => setShowModal(false);

  if (isLoading) return <Loader marginTop={100} />;
  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        Ошибка: {error?.message}
        <Link
          to="/products/1"
          className="flex w-[330px] ml-[46px] mt-[4%] rounded-[30px] h-[84px] justify-center items-center bg-buttonBg"
        >
          <img src={arrowLeft} alt="return" />
          <div className="font-bold text-[28px]">Вернуться к выбору товара</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex text-center h-full flex-col justify-center items-center">
      <div className="text-[66px] font-black w-[80%]">{product?.name}</div>
      <ProductCardDetails
        image={product?.image}
        name={product?.name}
        composition={product?.composition}
      />
      <ProductPrice price={product?.price} />
      <CookingLink
        to="/cooking"
        text="Приготовить"
        icon={arrowLeft}
        onClick={handleCookingLinkClick}
      />
      {showModal && (
        <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      <ActionFooter />
    </div>
  );
};
