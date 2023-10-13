"use client";

import { City } from "@/app/constants";

import Collection, { CollectionType } from "../Collection";

import "./styles.css";

interface Props {
  collections: Record<City, CollectionType>;
}
const Gallery = (props: Props) => {
  const { collections } = props;

  return (
    <div className="gallery">
      <Collection collection={collections[City.LONDON]} />
      <Collection collection={collections[City.ZABROWO]} />
      <Collection collection={collections[City.GDYNIA]} />
      <Collection collection={collections[City.BELFAST]} />
    </div>
  );
};

export default Gallery;
