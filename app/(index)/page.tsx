import Image from "next/image";
import "./styles.css";

enum City {
  LONDON = "London",
  ZABROWO = "Ząbrowo",
  GDYNIA = "Gdynia",
  BELFAST = "Belfast",
}

type Collection = {
  photos: {
    url: string;
    alt: string;
  }[];
  startDate: Date | null;
  endDate: Date | null;
};
const Home = async () => {
  const collections = await fetchCollections();
  return (
    <div className="gallery">
      <div>
        <Image
          priority
          src={collections[City.LONDON].photos[0].url}
          alt={collections[City.LONDON].photos[0].alt}
          fill
          sizes="25vw"
        />
        LND
      </div>
      <div>
        <Image
          priority
          src={collections[City.ZABROWO].photos[0].url}
          alt={collections[City.ZABROWO].photos[0].alt}
          fill
          sizes="25vw"
        />
        ZAB
      </div>
      <div>
        <Image
          priority
          src={collections[City.GDYNIA].photos[0].url}
          alt={collections[City.GDYNIA].photos[0].alt}
          fill
          sizes="25vw"
        />
        GDY
      </div>
      <div>
        <Image
          priority
          src={collections[City.BELFAST].photos[0].url}
          alt={collections[City.BELFAST].photos[0].alt}
          fill
          sizes="25vw"
        />
        BEL
      </div>
    </div>
  );
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
const fetchCollections = async (): Promise<Record<City, Collection>> => {
  const photosRes = await fetch(
    `https://api.unsplash.com/users/21w8y/photos/?` +
      new URLSearchParams({
        client_id: process.env.UNSPLASH_ACCESS_KEY ?? "",
        per_page: "30",
        order_by: "latest",
      })
  );
  const photos: RawPhoto[] = await photosRes.json();

  const collections: Record<City, Collection> = {
    [City.LONDON]: { photos: [], startDate: null, endDate: null },
    [City.ZABROWO]: { photos: [], startDate: null, endDate: null },
    [City.GDYNIA]: { photos: [], startDate: null, endDate: null },
    [City.BELFAST]: { photos: [], startDate: null, endDate: null },
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
