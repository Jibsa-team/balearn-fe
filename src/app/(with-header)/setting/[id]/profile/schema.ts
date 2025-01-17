import { z } from "zod";

export const formSchema = z.object({
  userName: z.string().min(1, "모임명을 입력해주세요."),
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "유효한 이미지를 업로드해주세요."
    )
    .optional(),
});
