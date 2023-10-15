"use client";

import Image from "next/image";
import { CollectionType } from "../Collection";

import "./styles.css";

interface Props {
  collection: CollectionType;
  toggleDetailView: () => void;
}
const CollectionDetails = (props: Props) => {
  const { collection, toggleDetailView } = props;

  return (
    <div className="slider">
      <Image
        key={collection.photos[0].url}
        src={collection.photos[0].url}
        alt={collection.photos[0].alt}
        fill
        sizes="40vw"
      />
    </div>
  );
};

export default CollectionDetails;
