"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type ParallaxMediaProps = {
  src: string;
  alt: string;
  className: string;
  imageClassName?: string;
  sizes?: string;
};

export function ParallaxMedia({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-54, 54]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        className="parallax-media-frame"
        style={{ y: reduceMotion ? 0 : imageY }}
      >
        <Image
          className={imageClassName}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
        />
      </motion.div>
    </div>
  );
}
