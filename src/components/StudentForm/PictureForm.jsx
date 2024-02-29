import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const PictureForm = ({ setImageFile }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [isTakingPicture, setIsTakingPicture] = useState(false);
  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = dataURItoBlob(imageSrc);
    setImageFile(blob);
    setPreviewImage(imageSrc);
    setIsTakingPicture(false);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const resetPicture = () => {
    setPreviewImage(null);
  };

  return (
    <div className="flex flex-col justify-center items-start my-10">
      <h1 className="text-2xl">Foto</h1>
      <div className="flex justify-center items-center w-full gap-x-10">
        <div
          className="w-32 h-32 rounded-full overflow-hidden border border-gray-400 flex justify-center items-center text-black"
          style={{
            backgroundImage: `url(${previewImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full rounded-full"
            />
          ) : (
            isTakingPicture && (
              <Webcam audio={false} className="w-full h-full" ref={webcamRef} />
            )
          )}
        </div>
        <div className="mt-4 flex justify-center gap-x-4 items-center">
          {!previewImage && (
            <div>
              {!isTakingPicture ? (
                <button
                  type="button"
                  className="picture-button"
                  onClick={() => setIsTakingPicture(true)}
                >
                  Usar Webcam
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                  onClick={capturePhoto}
                >
                  Tirar Foto
                </button>
              )}
            </div>
          )}
          {previewImage && (
            <div
              onClick={resetPicture}
              className=" picture-button bg-red-600 hover:bg-red-800 text-white"
            >
              Resetar foto
            </div>
          )}
          <div className="picture-button">
            <label className="cursor-pointer">
              Enviar do pc
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureForm;
