import React, { useState, useEffect, useRef } from "react";

// Defining the Image interface
interface Image {
  id: number;
  imageUrl: string;
  description: string;
}

function App() {
  // Defining state variables for app, images, selectedImage and fileInputRef
  const backend_url = "http://localhost:3000";
  const frontend_url = "http://localhost:4000";
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
      // Checking if the response is empty
      if (!data || (Array.isArray(data) && data.length === 0)) {
        // If the response is empty, displaying a 404 image
        setImages([
          {
            id: NaN,
            imageUrl: `${frontend_url}/404.svg`,
            description: "404: Image not found 😔",
          },
        ]);
      } else {
        // If the response is not empty, updating the images state variable with the fetched data
        setImages(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      setImages([
        {
          id: NaN,
          imageUrl: `${frontend_url}/404.svg`,
          description: "404: Image not found 😔",
        },
      ]);
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

  // Rest of the code for rendering the UI goes here
  return (
    <div>
      <header>
        <a href="/">
          <img src="logo.svg" alt="PSInsta logo"></img>
        </a>

        <div id="menu">
          <button onClick={handleCreateImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
            </svg>
            Import photo
          </button>
          <div id="line"></div>
          <label htmlFor="upload-photo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z" />
            </svg>
            Upload a photo
          </label>
          <input type="file" id="upload-photo" ref={fileInputRef} />
          <button onClick={handleUploadImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
            </svg>
            Publish
          </button>
        </div>

        {selectedImage && (
          <form onSubmit={(event) => handleEditImage(event, selectedImage.id)}>
            <input
              type="text"
              name="imageUrl"
              defaultValue={selectedImage.imageUrl}
            />
            <input
              type="text"
              name="description"
              defaultValue={selectedImage.description}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </header>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.imageUrl} alt={image.description} />
            <p>{image.description}</p>
            {!isNaN(image.id) && (
              <>
                <button
                  className="edit"
                  onClick={() => handleSelectImage(image)}
                >
                  Edit
                </button>
                <button
                  className="del"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;