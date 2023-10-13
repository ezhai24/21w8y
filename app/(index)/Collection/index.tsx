"use client";

import Image from "next/image";
import "./styles.css";

export type CollectionType = {
  title: string;
  photos: {
    url: string;
    alt: string;
  }[];
  startDate: Date | null;
  endDate: Date | null;
};

interface Props {
  collection: CollectionType;
}
const Collection = (props: Props) => {
  const { collection } = props;
  return (
    <div className="collection">
      <Image
        priority
        src={collection.photos[0].url}
        alt={collection.photos[0].alt}
        fill
        sizes="25vw, (max-width: 768px) 25vh"
      />
      {collection.title}
    </div>
  );
};

export default Collection;
