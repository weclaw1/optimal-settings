import Image from "next/image";

type CardProps = {
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  cardType?: "normal" | "compact";
  bordered?: boolean;
  children: React.ReactNode;
};

export default function Card({
  image,
  cardType = "normal",
  bordered = false,
  children,
}: CardProps) {
  let imageContent = null;
  if (image) {
    imageContent = (
      <figure className="min-w-fit min-h-fit">
        <Image
          className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52 2xl:w-56 2xl:h-56 object-contain"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </figure>
    );
  }

  let cardClass = "card bg-base-200";
  if (image) {
    cardClass += " card-side";
  }
  if (cardType === "compact") {
    cardClass += " card-compact";
  }
  if (bordered) {
    cardClass += " card-bordered";
  }

  return (
    <div className={cardClass}>
      {imageContent}
      <div className="card-body">{children}</div>
    </div>
  );
}
