"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { City } from "@/app/constants";
import Navigation from "@/app/navigation";

import Collection, { CollectionType } from "../Collection";
import CollectionDetails from "../CollectionDetails";

import "./styles.css";

interface Props {
  collections: Record<City, CollectionType>;
}
const Gallery = (props: Props) => {
  const { collections } = props;

  const cities = [City.LONDON, City.ZABROWO, City.GDYNIA, City.BELFAST];

  const [focusedCity, setFocusedCity] = useState<City | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const focusCity = (city: City | null) => setFocusedCity(city);
  const blurCity = () => setFocusedCity(null);
  const toggleDetailView = (isOpen?: boolean) =>
    setIsDetailViewOpen((prev) => isOpen ?? !prev);

  useEffect(() => {
    cities.forEach((city) => {
      collections[city].photos.forEach((photo) => {
        new Image().src = photo.url;
      });
    });
  });

  const onNavigate = () => {
    blurCity();
    if (isDetailViewOpen) {
      toggleDetailView(false);
    }
  };

  return (
    <>
      <Navigation onNavigate={onNavigate} />
      <main>
        <AnimatePresence mode="wait">
          {focusedCity && isDetailViewOpen ? (
            <CollectionDetails
              key="collectionDetails"
              collection={collections[focusedCity]}
              onClose={onNavigate}
            />
          ) : (
            <motion.div key="gallery" className="gallery" exit={{ gap: 0 }}>
              {cities.map((city, index) => (
                <Collection
                  key={city}
                  index={index}
                  collection={collections[city]}
                  focusedCity={focusedCity}
                  onFocusCity={focusCity}
                  toggleDetailView={toggleDetailView}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Gallery;
