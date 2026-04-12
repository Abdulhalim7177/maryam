"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-2xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-stone-500">Loading 3D...</span>
      </div>
    </div>
  ),
});

interface SplineSceneProps {
  scene?: string;
}

export default function SplineScene({ scene }: SplineSceneProps) {
  const defaultScene = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";
  
  return (
    <div className="w-full h-full min-h-[300px]">
      <Spline scene={scene || defaultScene} />
    </div>
  );
}