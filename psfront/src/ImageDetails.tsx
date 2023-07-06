import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

const ImageDetails: React.FC = () => {
  const { id } = useParams();
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);
  const backend_url = "http://localhost:3000";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${backend_url}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setImage(data);
        } else {
          setImage(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [id]);

  if (loading) return <img src="preloader.svg" alt="Preloader"></img>;
  if (!image) return <NotFound />;

  return (
    <div>
      <img src={image.imageUrl} alt={image.description} />
      <p>{image.description}</p>
    </div>
  );
};

export default ImageDetails;