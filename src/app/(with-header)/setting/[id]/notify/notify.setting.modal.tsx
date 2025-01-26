import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DetailNotifyModal from "./notify.detail.modal";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { Notice } from "@/types/notify/teamNotifyDto";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
}

const modalVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotifyModal = ({ isOpen, onClose, id }: ModalProps) => {
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<Notice | null>(null);
  const [currentMode, setCurrentMode] = useState<"view" | "edit">("view");

  const fetchNotifyDetail = async () => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notice/${id}`
      );
      const result = await response.json();
      const notify: Notice = result.result;
      setDetailData(notify);
      return notify;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNotifyDetail = async () => {
    await fetchNotifyDetail();
    setCurrentMode("view");
    setDetailOpen(true);
  };

  const handleNotifyUpdate = async () => {
    await fetchNotifyDetail();
    setCurrentMode("edit");
    setDetailOpen(true);
  };

  return (
    <>
      {detailOpen && (
        <DetailNotifyModal
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          onCloseSetting={onClose}
          detailData={detailData}
          mode={currentMode}
        />
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-[150px] bg-white border rounded-md shadow-lg z-100"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleNotifyDetail}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span>상세보기</span>
            </button>
            <button
              onClick={handleNotifyUpdate}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span>수정하기</span>
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
              삭제하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotifyModal;
