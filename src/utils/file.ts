export const fileSize = (size: number) => {
  return (size / 1024).toFixed(2) + " KB";
};
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { toast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";


export async function downloadLearningFile(file: { id: number; name: string }) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/${file.id}/download`,
      { cache: "no-store" }
    );
    if (!response.ok) throw new Error("Download failed");
    saveAs(await response.blob(), file.name);
    return true;
  } catch {
    toast({ title: "자료를 다운로드하지 못했습니다", variant: "destructive" });
    return false;
  }
}
