import { CollectionType } from "./Collection/index";
import Gallery from "./Gallery";

export enum City {
  LONDON = "London",
  ZABROWO = "Ząbrowo",
  GDYNIA = "Gdynia",
  BELFAST = "Belfast",
}

const Home = async () => {
  const collections = await fetchCollections();
  return <Gallery collections={collections} />;
};

type RawPhoto = {
  id: string;
};
type RawPhotoDetails = {
  id: string;
  created_at: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    full: string;
  };
  location: {
    city: string | null;
  };
};
const fetchCollections = async (): Promise<Record<City, CollectionType>> => {
  const photosRes = await fetch(
    `https://api.unsplash.com/users/21w8y/photos/?` +
      new URLSearchParams({
        client_id: process.env.UNSPLASH_ACCESS_KEY ?? "",
        per_page: "30",
        order_by: "latest",
      })
  );
  const photos: RawPhoto[] = await photosRes.json();

  const collections: Record<City, CollectionType> = {
    [City.LONDON]: { title: "LND", photos: [], startDate: null, endDate: null },
    [City.ZABROWO]: {
      title: "ZAB",
      photos: [],
      startDate: null,
      endDate: null,
    },
    [City.GDYNIA]: { title: "GDY", photos: [], startDate: null, endDate: null },
    [City.BELFAST]: {
      title: "BEL",
      photos: [],
      startDate: null,
      endDate: null,
    },
  };
  for (const photo of photos) {
    const detailsRes = await fetch(
      `https://api.unsplash.com/photos/${photo.id}/?` +
        new URLSearchParams({
          client_id: process.env.UNSPLASH_ACCESS_KEY ?? "",
        })
    );
    const photoDetails: RawPhotoDetails = await detailsRes.json();

    const location = photoDetails.location.city as City;
    if (location && Object.values(City).includes(location)) {
      collections[location].photos.push({
        url: photoDetails.urls.full,
        alt:
          photoDetails.alt_description ??
          photoDetails.description ??
          `Unsplash photo of ${location}`,
      });

      const createdAt = new Date(photoDetails.created_at);
      if (!collections[location].startDate) {
        collections[location].startDate = createdAt;
      } else {
        collections[location].startDate =
          createdAt < collections[location].startDate!
            ? createdAt
            : collections[location].startDate;
      }

      if (!collections[location].endDate) {
        collections[location].endDate = createdAt;
      } else {
        collections[location].endDate =
          collections[location].endDate! < createdAt
            ? createdAt
            : collections[location].endDate;
      }
    }
  }

  return collections;
};

export default Home;
