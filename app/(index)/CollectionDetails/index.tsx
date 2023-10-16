"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { CollectionType } from "../Collection";

import "./styles.css";

interface Props {
  collection: CollectionType;
  onClose: () => void;
}
const CollectionDetails = (props: Props) => {
  const { collection, onClose } = props;

  return (
    <motion.div
      className="slider"
      exit={
        screen.width < 768 ? { y: "40vh", height: 0 } : { x: "47vw", width: 0 }
      }
      transition={{ duration: 0.3 }}
    >
      <div className="imageContainer">
        <Image
          key={collection.photos[0].url}
          src={collection.photos[0].url}
          alt={collection.photos[0].alt}
          priority
          fill
          sizes="40vw"
        />
      </div>
    </motion.div>
  );
};

export default CollectionDetails;
