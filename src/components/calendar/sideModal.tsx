import React from "react";
import { motion } from "framer-motion";

function CanlendarSideModal({ isOpen }: { isOpen: boolean }) {
  return (
    isOpen && (
      <motion.div
        className="w-[300px] bg-white shadow-lg rounded-lg p-4 z-50 fixed top-0 right-0 bottom-0 md:w-[250px] sm:w-[90%] sm:top-[10%] sm:right-0"
        initial={{ x: 300, opacity: 0 }} // 초기 위치와 불투명도 설정
        animate={{ x: 0, opacity: 1 }} // 열렸을 때의 애니메이션
        exit={{ x: 300, opacity: 0 }} // 닫힐 때 애니메이션
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // 애니메이션 속도와 탄성 조정
      >
        CanlendarSideModal
      </motion.div>
    )
  );
}

export default CanlendarSideModal;
