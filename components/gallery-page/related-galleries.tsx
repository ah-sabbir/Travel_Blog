"use client";

import { FC, useEffect, useState } from "react";
import ArticleCard from "../article-card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GalleryEntity } from "@/entities/gallery.entity";
import { getRelatedGalleries } from "@/lib/fetch-gallery-data";
import GalleryCard from "../gallery-card";

interface Props {
  countryId: string;
  galleryId: string;
}

const RelatedGalleries: FC<Props> = ({ countryId, galleryId }): JSX.Element => {
  const [relatedGalleries, setRelatedGalleries] = useState<GalleryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGalleries = async () => {
    setIsLoading(true);
    try {
      const galleries = await getRelatedGalleries(countryId, galleryId);
      setIsLoading(false);
      setRelatedGalleries(galleries as GalleryEntity[]);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return (
    <div className="mt-5 grid grid-cols-3 gap-6">
      {isLoading ? (
        <>
          {[...Array(3).keys()].map((item) => (
            <Skeleton key={item} className="w-full aspect-[0.777]" inline />
          ))}
        </>
      ) : (
        <>
          {relatedGalleries.map((gallery) => (
            <GalleryCard gallery={gallery} key={gallery._id.toString()} />
          ))}
        </>
      )}
    </div>
  );
};

export default RelatedGalleries;
