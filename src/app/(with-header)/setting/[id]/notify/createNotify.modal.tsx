"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { NotifySchema } from "./schema";
import NotifyAddError from "@/components/error/ErrorMessage";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

export default function CreateNotifyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { id } = useParams();

  const isFormValid = () => {
    const formData = { title, detail };
    const result = NotifySchema.safeParse(formData);
    return result.success;
  };

  const handleCreate = async () => {
    try {
      const formData = { title, detail };
      NotifySchema.parse(formData);

      const reqDate = { teamId: id, title, detail };
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notice/create`,
        {
          method: "POST",
          body: JSON.stringify(reqDate),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      console.log(result);

      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          const field = error.path.join(".");
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2 className="text-xl font-bold mb-4">공지 생성</h2>
          <div className="mb-4">
            <label className="block mb-1">제목</label>
            <textarea
              placeholder="공지 제목을 입력하세요"
              className="w-full h-12 p-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <NotifyAddError errors={errors.title} />}
          </div>
          <div className="mb-4">
            <label className="block mb-1">내용</label>
            <textarea
              placeholder="공지 내용을 입력하세요"
              className="w-full h-24 p-2 border rounded-md"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
            {errors.detail && <NotifyAddError errors={errors.detail} />}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
            >
              닫기
            </button>
            <button
              onClick={handleCreate}
              className={`px-4 py-2 rounded-md ${
                isFormValid()
                  ? "bg-logoColor text-white cursor-pointer"
                  : "bg-disabledColor text-gray-200 cursor-not-allowed"
              }`}
            >
              생성
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  );
}
