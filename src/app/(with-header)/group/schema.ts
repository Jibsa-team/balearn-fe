import { z } from "zod";

export const formSchema = z.object({
  groupName: z.string().min(1, "모임명을 입력해주세요."),
  groupPurpose: z.string().min(1, "모임 목적을 입력해주세요."),
  goals: z
    .array(
      z.object({
        goal: z.string().min(1, "목표를 입력해주세요."),
        color: z.string().min(1, "색상을 선택해주세요."),
      })
    )
    .min(1, "최소 1개의 목표를 입력해주세요."),
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "유효한 이미지를 업로드해주세요."
    )
    .optional(),
});
