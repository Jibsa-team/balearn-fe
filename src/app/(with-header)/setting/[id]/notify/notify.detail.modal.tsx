import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Notice } from "@/types/notify/teamNotifyDto";
import { NotifySchema } from "./schema";
import NotifyAddError from "@/components/error/ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

interface DetailNotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailData: Notice | null;
  mode?: "view" | "edit";
  onCloseSetting: () => void;
}

export default function DetailNotifyModal({
  isOpen,
  onClose,
  detailData,
  mode = "view",
  onCloseSetting,
}: DetailNotifyModalProps) {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const queryClient = useQueryClient();
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    if (detailData) {
      setTitle(detailData.title);
      setDetail(detailData.detail);
    }
  }, [detailData, mode]);

  const isFormValid = () => {
    const formData = { title, detail };
    const result = NotifySchema.safeParse(formData);
    return result.success;
  };

  const handleUpdate = async () => {
    try {
      const formData = { title, detail };
      NotifySchema.parse(formData);

      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notice/${detailData?.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ teamId: id, title, detail }),
          headers: { "Content-Type": "application/json" },
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await response.json();

      await queryClient.invalidateQueries({
        queryKey: ["teamNotify", id],
      });

      toast({
        title: "공지 수정 성공",
        description: "공지가 성공적으로 수정되었습니다.",
        variant: "default",
      });

      onClose();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          const field = error.path.join(".");
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "공지 수정 실패",
          description: "공지 수정 중 오류가 발생했습니다.",
          variant: "destructive",
        });
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
          <h2 className="text-xl font-bold mb-4">
            {mode === "view" ? "상세보기" : "공지 수정"}
          </h2>
          <div className="mb-4">
            <label className="block mb-1">제목</label>
            <textarea
              className={`w-full h-12 p-2 border rounded-md ${
                mode === "edit" ? "" : "bg-gray-100"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={mode === "view"}
            />
            {mode === "edit" && errors.title && (
              <NotifyAddError errors={errors.title} />
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">내용</label>
            <textarea
              className={`w-full h-24 p-2 border rounded-md ${
                mode === "edit" ? "" : "bg-gray-100"
              }`}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              readOnly={mode === "view"}
            />
            {mode === "edit" && errors.detail && (
              <NotifyAddError errors={errors.detail} />
            )}
          </div>
          <div className="flex justify-end">
            {mode === "view" ? (
              <button
                onClick={() => {
                  onClose();
                  onCloseSetting();
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                닫기
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onClose();
                    onCloseSetting();
                  }}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                >
                  취소
                </button>
                <button
                  onClick={handleUpdate}
                  className={`px-4 py-2 rounded-md ${
                    isFormValid()
                      ? "bg-logoColor text-white cursor-pointer"
                      : "bg-disabledColor text-gray-200 cursor-not-allowed"
                  }`}
                >
                  수정
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    )
  );
}
