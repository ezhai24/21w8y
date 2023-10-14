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
      {collection.city === focusedCity ? (
        <motion.div
          className="details"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
