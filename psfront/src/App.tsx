import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import ImageList from "./ImageList";
import ImageForm from "./ImageForm";
import NotFound from "./NotFound";
import ImageDetails from "./ImageDetails";

// Defining the Image interface
interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

function App() {
  // Defining state variables for app, images, selectedImage and fileInputRef
  const backend_url = "http://localhost:3000";
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetching images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images from the server
  const fetchImages = async () => {
    try {
      // Extracting the id from the URL if it exists
      const id = window.location.pathname.split("/")[1];
      // Constructing the API endpoint based on whether an id is present in the URL or not
      const endpoint = id ? `${backend_url}/${id}` : `${backend_url}/`;
      // Sending a GET request to the constructed endpoint
      const response = await fetch(endpoint);
      const data = await response.json();
      // Updating the images state variable with the fetched data
      setImages(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create a new image by sending a POST request to the server
  const handleCreateImage = async () => {
    // Prompting the user to enter the image URL and description
    const imageUrl = prompt("Enter image URL");
    if (!imageUrl) return;
    const description = prompt("Enter image description");
    if (!description) return;

    try {
      // Sending a POST request to the server with the entered image URL and description
      await fetch(backend_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, description }),
      });
      // Fetching the updated list of images from the server
      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to edit an existing image by sending a PATCH request to the server
  const handleEditImage = async (event: React.FormEvent, id: number) => {
    event.preventDefault();
    // Extracting the entered image URL and description from the form
    const form = event.target as HTMLFormElement;
    const imageUrl = form.elements.namedItem("imageUrl") as HTMLInputElement;
    const description = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const updatedData: Partial<Image> = {
      imageUrl: imageUrl.value,
      description: description.value,
    };
    try {
      // Sending a PATCH request to the server with the updated image data
      await fetch(`${backend_url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      // Fetching the updated list of images from the server
      fetchImages();
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete an existing image by sending a DELETE request to the server
  const handleDeleteImage = async (id: number) => {
    try {
      await fetch(`${backend_url}/${id}`, {
        method: "DELETE",
      });
      // Fetching the updated list of images from the server
      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to set the selectedImage state variable when an image is clicked
  const handleSelectImage = (image: Image) => {
    setSelectedImage(image);
  };

  // Function to upload a new image file and send its information to the server
  const handleUploadImage = async () => {
    // Checking if a file is selected in the fileInputRef input element
    if (!fileInputRef.current?.files?.length) return;

    // Extracting the selected file and prompting the user to enter a description for it
    const file = fileInputRef.current.files[0];
    const description = prompt("Enter image description");
    if (!description) return;

    // Creating a FormData object with the selected file and entered description
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    try {
      // Sending a POST request to the /upload endpoint of the server with the FormData object
      await fetch(`${backend_url}/upload`, {
        method: "POST",
        body: formData,
      });
      // Fetching the updated list of images from the server
      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <Header
        handleCreateImage={handleCreateImage}
        handleUploadImage={handleUploadImage}
        fileInputRef={fileInputRef}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageForm
                selectedImage={selectedImage}
                handleEditImage={handleEditImage}
              />
              <ImageList
                images={images}
                handleSelectImage={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
              />
            </>
          }
        />
        <Route path="/:id" element={<ImageDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;