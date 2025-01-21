import { Notice } from "@/types/notify/teamNotifyDto";
import { motion } from "framer-motion";

interface DetailNotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailData: Notice | null;
}

export default function DetailNotifyModal({
  isOpen,
  onClose,
  detailData,
}: DetailNotifyModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackgroundClick}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2 className="text-xl font-bold mb-4">상세보기</h2>
          <div className="mb-4">
            <label className="block mb-1">제목</label>
            <textarea
              className="w-full h-12 p-2 border rounded-md"
              value={detailData?.title || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">내용</label>
            <textarea
              className="w-full h-24 p-2 border rounded-md"
              value={detailData?.detail || ""}
              readOnly
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  );
}
