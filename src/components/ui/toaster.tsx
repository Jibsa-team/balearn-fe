"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`
              min-w-[300px] 
              md:h-[100px]
              h-[70px]
              md:rounded-md
              rounded-full
              border-[1px]
              shadow-lg 
              animate-in 
              slide-in-from-bottom-6 
              duration-300
              z-[50]
              ${
                variant === "destructive"
                  ? "bg-red-50 border-red-400"
                  : "bg-[rgba(0,0,0,0.8)] text-white"
              }
            `}
          >
            <div className="grid gap-2 py-2">
              {title && (
                <ToastTitle className="text-base font-semibold">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription
                  className={`text-sm ${
                    variant === "destructive" ? "text-black" : " text-white"
                  }`}
                >
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose
              className="absolute right-2 top-2 rounded-md p-1 
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </Toast>
        );
      })}
      <ToastViewport
        className="fixed bottom-0 right-0 top-auto z-[100] flex 
        max-h-screen w-full flex-col-reverse gap-2 p-4 sm:right-0 
        sm:flex-col md:max-w-[420px]"
      />
    </ToastProvider>
  );
}
