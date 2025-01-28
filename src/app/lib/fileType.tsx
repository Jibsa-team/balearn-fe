import {
  BsFileEarmarkPdfFill,
  BsFileEarmarkTextFill,
  BsFileEarmarkWordFill,
  BsFileEarmarkExcelFill,
  BsFileEarmarkImageFill,
  BsFileEarmarkFill,
} from "react-icons/bs";

export const FileIcon = ({ type }: { type: string }) => {
  const iconClass = "text-xl mr-[5px]";

  switch (type.toLowerCase()) {
    case "application/pdf":
      return <BsFileEarmarkPdfFill className={`text-red-500 ${iconClass}`} />;
    case "text/plain":
      return <BsFileEarmarkTextFill className={`text-gray-500 ${iconClass}`} />;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <BsFileEarmarkWordFill className={`text-blue-600 ${iconClass}`} />;
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return (
        <BsFileEarmarkExcelFill className={`text-green-600 ${iconClass}`} />
      );
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return (
        <BsFileEarmarkImageFill className={`text-purple-500 ${iconClass}`} />
      );
    default:
      return <BsFileEarmarkFill className={`text-gray-400 ${iconClass}`} />;
  }
};
