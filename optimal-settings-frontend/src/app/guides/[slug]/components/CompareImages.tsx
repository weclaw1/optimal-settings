"use client";

import Image from "next/image";
import { CSSProperties, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  styleFitContainer,
} from "react-compare-slider";

type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label?: string;
};

type CompareImagesProps = {
  firstImage: Image;
  secondImage: Image;
};

type ComparedImageProps = {
  image: Image;
  position: "start" | "end";
  opacity: number;
};

const ComparedImage = ({ image, position, opacity }: ComparedImageProps) => {
  const labelStyle: CSSProperties = {
    fontSize: "1rem",
    position: "absolute" as const,
    padding: ".5rem",
    color: "white",
    opacity: opacity,
    border: "2px solid white",
    borderRadius: ".5rem",
    backdropFilter:
      "blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)",
    WebkitBackdropFilter:
      "blur(0.25rem) saturate(180%) contrast(80%) brightness(120%)",
    transition: "opacity 0.25s ease-in-out",
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: position,
  };

  return (
    <div style={containerStyle}>
      {image.label && <div style={labelStyle}>{image.label}</div>}
      <Image
        style={{
          ...styleFitContainer({
            objectFit: "contain",
          }),
        }}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
      />
    </div>
  );
};

export default function CompareImages({
  firstImage,
  secondImage,
}: CompareImagesProps) {
  const [labelOpacity, setLabelOpacity] = useState(1);

  return (
    <ReactCompareSlider
      onPointerDown={() => setLabelOpacity(0)}
      onPointerUp={() => setLabelOpacity(1)}
      itemOne={
        <ComparedImage
          image={firstImage}
          position="start"
          opacity={labelOpacity}
        />
      }
      itemTwo={
        <ComparedImage
          image={secondImage}
          position="end"
          opacity={labelOpacity}
        />
      }
    />
  );
}
