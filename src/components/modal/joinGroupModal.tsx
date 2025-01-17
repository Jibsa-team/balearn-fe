"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { InputOTPControlled } from "./joinGroupModal.input";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({
  isOpen,
  onClose,
  onJoin,
}) => {
  const [code, setCode] = useState("");

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
  };

  const handleJoinClick = () => {
    onJoin(code);
    setCode("");
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
              <h2 className="text-[1.1rem] font-semibold text-center">
                전달받은 코드를 입력해주세요
              </h2>
              <IoMdClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </header>
            <InputOTPControlled />
            <div className="flex justify-center mt-6">
              <button
                onClick={handleJoinClick}
                className="w-full bg-logoColor text-white px-4 py-2 rounded-lg"
              >
                가입하기
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinGroupModal;
