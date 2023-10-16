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

const collectionVariants = (
  city: City,
  focusedCity: City | null,
  index: number
) => ({
  initial: !focusedCity
    ? {
        y: 50,
        opacity: 0,
        flexGrow: 1,
      }
    : {
        y: 0,
        opacity: 1,
        flexGrow: city === focusedCity ? 12 : 1,
      },
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
  exit:
    typeof screen !== "undefined" && screen.width < 768
      ? { flexGrow: 0, height: 0 }
      : { flexGrow: 0, width: 0 },
});
const detailsVariants = {
  initial: { y: -10, opacity: 0 },
  focused: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
};
const titleVariants = (focusedCity: City | null) => ({
  initial: !focusedCity ? { opacity: 1 } : { opacity: 0 },
  focused: { opacity: 1 },
  blurred: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
});

interface Props {
  index: number;
  collection: CollectionType;
  focusedCity: City | null;
  onFocusCity: (city: City | null) => void;
  toggleDetailView: (isOpen?: boolean) => void;
}
const Collection = (props: Props) => {
  const { index, collection, focusedCity, onFocusCity, toggleDetailView } =
    props;

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
      toggleDetailView(true);
      return;
    }
    onFocusCity(collection.city);
  };

  return (
    <motion.div
      className="collection"
      onClick={toggleFocus}
      variants={collectionVariants(collection.city, focusedCity, index)}
      initial="initial"
      animate={
        !focusedCity
          ? "default"
          : collection.city === focusedCity
          ? "focused"
          : "blurred"
      }
      exit={collection.city !== focusedCity ? "exit" : undefined}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Image
        src={collection.photos[0].url}
        alt={collection.photos[0].alt}
        priority
        fill
        sizes="60vw, (max-width: 768px) 60vh"
      />
      {collection.city === focusedCity ? (
        <motion.div
          className="details"
          variants={detailsVariants}
          initial="initial"
          animate="focused"
          exit="exit"
          transition={{ type: "tween", delay: 0.3 }}
        >
          <div>{collectionRange}</div>
          <div className="imageCount">{imageCount}</div>
        </motion.div>
      ) : null}
      <motion.div
        className="title"
        layout
        variants={titleVariants(focusedCity)}
        // TO DO [Time Boxed]: This one style doesn't
        // work with variants. exit="exit" overrides
        // the blurred opacity to 1 for some reason.
        exit={{ opacity: 0 }}
        style={{
          alignSelf: focusedCity ? "end" : "center",
        }}
        transition={{ type: "tween" }}
      >
        {collection.title}
      </motion.div>
    </motion.div>
  );
};

export default Collection;
