import { Modal } from "src/app/ui/Modal/Modal";

const ConfirmationModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal setVisible={onCancel} visible={true}>
      <div className="bg-white p-12 rounded-[20px] shadow-lg w-[90%] max-w-[500px] mx-auto">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Вы уверены, что хотите этот товар?
        </h2>
        <div className="flex justify-center gap-8">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white font-bold text-2xl py-4 px-8 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Да
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white font-bold text-2xl py-4 px-8 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Нет
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
