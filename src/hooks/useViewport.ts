"use client";

import { useEffect } from "react";
import { isMobile } from "@/utils/userAgent";

export const useViewport = () => {
  useEffect(() => {
    if (!isMobile()) return;

    let viewportMeta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta") as HTMLMetaElement;
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }

    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover";

    const adjustViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    adjustViewportHeight();
    window.addEventListener("resize", adjustViewportHeight);

    return () => window.removeEventListener("resize", adjustViewportHeight);
  }, []);
};
