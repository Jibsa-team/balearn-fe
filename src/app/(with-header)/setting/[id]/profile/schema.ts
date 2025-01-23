import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 최소 2글자 이상이어야 합니다.")
    .max(10, "이름은 최대 10글자까지 가능합니다."),
  // profileImage: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file.type.startsWith("image/"),
  //     "유효한 이미지를 업로드해주세요."
  //   )
  //   .optional(),
});
