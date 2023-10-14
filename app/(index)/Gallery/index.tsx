"use client";

import { useState } from "react";

import { City } from "@/app/constants";
import Navigation from "@/app/navigation";

import Collection, { CollectionType } from "../Collection";

import "./styles.css";

interface Props {
  collections: Record<City, CollectionType>;
}
const Gallery = (props: Props) => {
  const { collections } = props;

  const cities = [City.LONDON, City.ZABROWO, City.GDYNIA, City.BELFAST];

  const [focusedCity, setFocusedCity] = useState<City | null>(null);
  const focusCity = (city: City | null) => setFocusedCity(city);
  const blurCity = () => setFocusedCity(null);

  return (
    <>
      <Navigation onNavigate={blurCity} />
      <main>
        <div className="gallery">
          {cities.map((city) => (
            <Collection
              key={city}
              collection={collections[city]}
              focusedCity={focusedCity}
              onFocusCity={focusCity}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Gallery;
