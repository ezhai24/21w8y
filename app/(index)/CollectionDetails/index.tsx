"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { CollectionType } from "../Collection";

import "./styles.css";
import { useState } from "react";

interface Props {
  collection: CollectionType;
  onClose: () => void;
}
const CollectionDetails = (props: Props) => {
  const { collection, onClose } = props;

  const [currentPhoto, setCurrentPhoto] = useState(0);

  const showPrevPhoto = () => {
    if (currentPhoto === 0) {
      setCurrentPhoto(collection.photos.length - 1);
    } else {
      setCurrentPhoto((prev) => prev - 1);
    }
  };
  const showNextPhoto = () => {
    if (currentPhoto === collection.photos.length - 1) {
      setCurrentPhoto(0);
    } else {
      setCurrentPhoto((prev) => prev + 1);
    }
  };

  return (
    <>
      <motion.div
        className="slider"
        exit={
          screen.width < 768
            ? { y: "40vh", height: 0 }
            : { x: "47vw", width: 0 }
        }
        transition={{ duration: 0.8 }}
      >
        {collection.photos.length > 1 ? (
          <motion.button
            className="button prevButton"
            onClick={showPrevPhoto}
            exit={{ opacity: 0 }}
          >
            <ChevronLeftIcon />
          </motion.button>
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={collection.photos[currentPhoto].url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween" }}
            className="imageContainer"
          >
            <Image
              src={collection.photos[currentPhoto].url}
              alt={collection.photos[currentPhoto].alt}
              priority
              fill
              sizes="40vw"
            />
          </motion.div>
        </AnimatePresence>

        {collection.photos.length > 1 ? (
          <motion.button
            className="button nextButton"
            onClick={showNextPhoto}
            exit={{ opacity: 0 }}
          >
            <ChevronRightIcon />
          </motion.button>
        ) : null}
        <motion.button
          className="button closeButton"
          onClick={onClose}
          exit={{ opacity: 0 }}
        >
          <XMarkIcon />
        </motion.button>
      </motion.div>
    </>
  );
};

export default CollectionDetails;
