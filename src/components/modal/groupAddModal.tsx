import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FaLayerGroup } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface GroupAddModalProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  onConfirm: () => void;
}

const GroupAddModal: React.FC<GroupAddModalProps> = ({
  isOpen,
  position,
  onClose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onConfirm,
}) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleMoveGroup = () => {
    router.push(`/group`);
  };

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-0 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <motion.div
        className="absolute bg-white p-6 rounded-lg shadow-lg"
        style={{
          top: position.top, // 동적으로 계산된 top 값
          left: position.left, // 동적으로 계산된 left 값
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={handleModalClick}
      >
        <div className="min-w-[240px] flex justify-between items-center mb-[20px]">
          <div>
            <FaLayerGroup className="text-logoColor" />
          </div>
          <div className="text-lg"></div>
          <IoClose
            className="cursor-pointer text-gray-500 hover:bg-gray-200 rounded-full"
            onClick={onClose}
          />
        </div>

        {/**모임 리스트 */}
        <div className="my-4 flex justify-between items-center space-x-4 border-b border-b-gray-100 pb-[10px] cursor-pointer">
          <div className="flex items-center">
            <Image
              src={"/Avatar.png"}
              alt={"유저 이미지"}
              width={25}
              height={25}
              className="rounded-full mr-[10px]"
            />
            <span className="text-[1.1rem] text-gray-600 hover:text-black">
              OurMeeting
            </span>
          </div>

          <IoIosCheckmark className="bg-logoColor text-white flex items-center justify-center rounded-full" />
        </div>

        {/**모임 생성 버튼 */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleMoveGroup}
        >
          <FiPlus className="w-[30px] h-[30px] p-[7px] rounded-full bg-gray-100 mr-[10px]" />
          <span>모임 생성</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GroupAddModal;
