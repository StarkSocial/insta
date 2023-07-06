import React, { useState, useEffect } from "react";
import NotFound from "./NotFound";

interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

interface ImageListProps {
  images: Image[];
  handleSelectImage: (image: Image) => void;
  handleDeleteImage: (id: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  handleSelectImage,
  handleDeleteImage,
}) => {
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      const timer = setTimeout(() => setShowNotFound(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [images]);

  if (images.length !== 0)
    return (
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.imageUrl} alt={image.description} />
            <p>{image.description}</p>
            {!isNaN(image.id) && (
              <>
                <button className="edit" onClick={() => handleSelectImage(image)}>
                  Edit
                </button>
                <button className="del" onClick={() => handleDeleteImage(image.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    );

  if (showNotFound) return <NotFound />;

  return null;
};

export default ImageList;