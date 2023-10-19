"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
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

        <div className="imageContainer">
          {collection.photos.map((photo) => (
            <motion.div
              className="image"
              initial={
                photo.url === collection.photos[currentPhoto].url
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              animate={
                photo.url === collection.photos[currentPhoto].url
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              key={photo.url}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="80vw, (max-width: 768px) 80vh"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
              />
            </motion.div>
          ))}
        </div>

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
