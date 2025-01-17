// import { UploadedFile } from "@/types/file/files";
// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// // import { saveAs } from "file-saver";
// import { IoIosCloudUpload } from "react-icons/io";

// function UploadFile() {
//   const [files, setFiles] = useState<UploadedFile[]>([]);

//   const onDrop = (acceptedFiles: File[]) => {
//     const uploadedFiles = acceptedFiles.map((file) => ({
//       name: file.name,
//       size: file.size,
//       owner: "You", // Mock owner, replace with actual owner info if available
//       lastModified: new Date(file.lastModified).toLocaleDateString(),
//       preview: URL.createObjectURL(file),
//       file,
//     }));
//     setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "application/pdf": [".pdf"], // Accept only PDFs
//     },
//   });

//   return (
//     <div className="mb-[20px] shadow-sm">
//       <div className="text-xl flex justify-start mb-[10px]">Upload Files</div>
//       <div
//         {...getRootProps()}
//         className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-[20px] text-center cursor-pointer mb-[40px]"
//       >
//         <input {...getInputProps()} />
//         <div className="flex justify-center text-5xl text-sky-500">
//           <IoIosCloudUpload />
//         </div>
//         <p>Drag and drop files here, or click to select files</p>
//       </div>
//     </div>
//   );
// }

// export default UploadFile;
