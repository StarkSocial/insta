import React from "react";

interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

interface ImageFormProps {
  selectedImage: Image | null;
  handleEditImage: (event: React.FormEvent, id: number) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({
  selectedImage,
  handleEditImage,
}) => {
  if (!selectedImage) return null;

  return (
	<div className="form">
		<form onSubmit={(event) => handleEditImage(event, selectedImage.id)}>
		  <input type="text" name="imageUrl" defaultValue={selectedImage.imageUrl} />
		  <input
			type="text"
			name="description"
			defaultValue={selectedImage.description}
		  />
		  <button type="submit">Save</button>
		</form>
	</div>
  );
};

export default ImageForm;