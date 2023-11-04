import Image from 'next/image';

type CardProps = {
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  },
  children: React.ReactNode;
};

export default function Card({ image, children }: CardProps) {
  let imageContent = null;
  if (image) {
    imageContent = (
      <figure className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
      </figure>
    );
  }
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      {imageContent}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
    