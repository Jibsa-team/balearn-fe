"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const ProfileModal = ({ isOpen, onClose, onLogout }: ModalProps) => {
  const router = useRouter();
  const { id } = useParams();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-[150px] bg-white border rounded-md shadow-lg z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => router.push(`/setting/${id}/profile`)}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <span>프로필 수정</span>
          </button>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <span>로그아웃</span>
          </button>
          <button
            onClick={onClose}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            취소
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
