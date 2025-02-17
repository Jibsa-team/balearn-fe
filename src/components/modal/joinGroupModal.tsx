"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";
import { InputOTPControlled } from "./joinGroupModal.input";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarModalClose: Dispatch<SetStateAction<boolean>>;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({
  isOpen,
  onClose,
  sidebarModalClose,
}) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
        >
          <motion.div
            className="bg-white rounded-xl p-6 md:w-[400px] w-[300px] shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <header className="flex justify-between items-center mb-[20px]">
              <h2
                className="sm:text-[1.1rem] text-[1rem]
               font-semibold text-center"
              >
                전달받은 코드를 입력해주세요
              </h2>
              <IoMdClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </header>
            <InputOTPControlled sidebarModalClose={sidebarModalClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinGroupModal;
