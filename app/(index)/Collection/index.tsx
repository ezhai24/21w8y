"use client";

import { motion } from "framer-motion";
import { DateTime } from "luxon";
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

const collectionVariants = (index: number) => ({
  initial: { y: 50, opacity: 0 },
  default: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.2,
      delay: index * 0.05,
    },
  },
  focused: { y: 0, opacity: 1, flexGrow: 12 },
  blurred: { y: 0, opacity: 0.2 },
});
const detailsVariants = {
  initial: { y: -10, opacity: 0 },
  focused: { y: 0, opacity: 1 },
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
  index: number;
  collection: CollectionType;
  focusedCity: City | null;
  onFocusCity: (city: City | null) => void;
}
const Collection = (props: Props) => {
  const { index, collection, focusedCity, onFocusCity } = props;

  const formattedStart = collection.startDate
    ? DateTime.fromISO(collection.startDate.toISOString()).toFormat("dd.MM.yy")
    : "X";
  const formattedEnd = collection.endDate
    ? DateTime.fromISO(collection.endDate.toISOString()).toFormat("dd.MM.yy")
    : "X";
  const collectionRange = `${formattedStart} - ${formattedEnd}`;

  const imageCount = `${collection.photos.length} Image${
    collection.photos.length > 1 ? "s" : ""
  }`;

  const toggleFocus = () => {
    if (collection.city === focusedCity) {
      // TO DO: Open expanded collection view instead
      onFocusCity(null);
      return;
    }
    onFocusCity(collection.city);
  };

  return (
    <motion.div
      className="collection"
      onClick={toggleFocus}
      variants={collectionVariants(index)}
      initial="initial"
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
        sizes="30vw, (max-width: 768px) 30vh"
      />
      {collection.city === focusedCity ? (
        <motion.div
          className="details"
          variants={detailsVariants}
          initial="initial"
          animate="focused"
          transition={{ type: "tween", delay: 0.3 }}
        >
          <div>{collectionRange}</div>
          <div className="imageCount">{imageCount}</div>
        </motion.div>
      ) : null}
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
