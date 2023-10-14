"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { City } from "@/app/constants";

import "./styles.css";

export type CollectionType = {
  title: string;
  city: City;
  photos: {
    url: string;
    alt: string;
  }[];
  startDate: Date | null;
  endDate: Date | null;
};

const collectionVariants = {
  focused: {
    flexGrow: 12,
  },
  blurred: {
    opacity: 0.2,
  },
};
const titleVariants = {
  blurred: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

interface Props {
  collection: CollectionType;
  focusedCity: City | null;
  onFocusCity: (city: City) => void;
}
const Collection = (props: Props) => {
  const { collection, focusedCity, onFocusCity } = props;

  const toggleFocus = () => {
    if (collection.city === focusedCity) {
      // open expanded collection view
    }
    onFocusCity(collection.city);
  };

  return (
    <motion.div
      className="collection"
      onClick={toggleFocus}
      variants={collectionVariants}
      animate={
        !focusedCity
          ? "default"
          : collection.city === focusedCity
          ? "focused"
          : "blurred"
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Image
        priority
        src={collection.photos[0].url}
        alt={collection.photos[0].alt}
        fill
        sizes="80vw, (max-width: 768px) 80vh"
      />
      <motion.div
        className="title"
        layout
        variants={titleVariants}
        style={{
          alignSelf: focusedCity ? "end" : "center",
        }}
      >
        {collection.title}
      </motion.div>
    </motion.div>
  );
};

export default Collection;
