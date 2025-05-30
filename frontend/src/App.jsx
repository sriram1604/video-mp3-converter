import { useState, useEffect } from "react";
import Loader from "./components/Loader.jsx";
import Dialog from "./components/dialogBox.jsx"; 
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [animateHeading, setAnimateHeading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [filenameDialogOpen, setFilenameDialogOpen] = useState(false);
  const [fileToConvert, setFileToConvert] = useState(null);

  const [downloadURL, setDownloadURL] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimateHeading(true), 2000);
    const timer2 = setTimeout(() => setShowContent(true), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

 
  const openDialog = (msg) => {
    setDialogMessage(msg);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };


const handleFileChange = (e) => {
  const newFile = e.target.files[0];
  if (!newFile) return;


  if (videoURL) {
    URL.revokeObjectURL(videoURL);
  }

  const newVideoURL = URL.createObjectURL(newFile);
  setFile(newFile);
  setVideoURL(newVideoURL);
  setDownloadURL(null);
  setShowDownloadButton(false);
  setFileName("");
};




  const handleConvertClick = () => {
    if (!file) return openDialog("Please select a video file first!");
    setFileToConvert(file);
    setFilenameDialogOpen(true);
  };

  const handleFilenameSubmit = async (name) => {
    if (!name) {
      openDialog("Filename is required!");
      return;
    }

    setFileName(name);
    setFilenameDialogOpen(false);


    const formData = new FormData();
    formData.append("video", fileToConvert);

    try {
      const res = await fetch("https://easy-converter-qbuq.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        openDialog("Conversion failed. Try again.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadURL(url);
      setShowDownloadButton(true);
    } catch (error) {
      openDialog("Something went wrong. Check your server and try again.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-700 to-blue-500 font-poppins text-white">
      <h1
        className={`text-4xl md:text-5xl font-semibold text-center transition-all duration-1000 ease-in-out
        absolute top-1/2 transform -translate-y-1/2
       ${animateHeading ? "top-20 md:top-8 translate-y-0" : ""}
        bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent`}
      >
        Video to MP3 Converter
      </h1>
      {!showContent && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Loader />
        </div>
      )}

      <div
        className={`w-full max-w-md bg-white text-black mx-auto mt-40 rounded-2xl p-6 shadow-lg transition-opacity duration-1000 transform ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <input
          type="file"
          accept="video/*"
          className="w-full mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-700 file:text-white cursor-pointer file:cursor-pointer"
          onChange={handleFileChange}
          required
        />
        {videoURL && (
          <video
            src={videoURL}
            controls
            className="w-full max-h-60 rounded-md mb-4"
          />
        )}
        

        {!showDownloadButton && (
          <button
            type="button"
            onClick={handleConvertClick}
            className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-2 px-6 rounded-full font-semibold cursor-pointer"
          >
            Convert to MP3
          </button>
        )}

        {showDownloadButton && (
          <div className="text-center mt-4">
            <p className="mb-2 text-black font-semibold">
              Your music is ready! Click the button below to download.
            </p>
            <a
              href={downloadURL}
              download={`${fileName}.mp3`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full font-semibold cursor-pointer"
              onClick={() => {
               
                setTimeout(() => {
                  if (downloadURL) window.URL.revokeObjectURL(downloadURL);
                  
                }, 3000); 
              }}
            >
              Click Here
            </a>

          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className={`mt-auto text-center text-sm py-6 w-full bg-gradient-to-r from-gray-900 to-black text-gray-300 transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-4 flex justify-center space-x-6 text-2xl">
          <a
            href="https://www.facebook.com/share/1Aj4UN8kvN/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transform transition-transform duration-300 hover:scale-125"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://x.com/__srxrzm__?s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transform transition-transform duration-300 hover:scale-125"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/_srx_.rzm_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transform transition-transform duration-300 hover:scale-125"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://github.com/sriram1604"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-100 transform transition-transform duration-300 hover:scale-125"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://sriram-softwaredev-portfolio.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transform transition-transform duration-300 hover:scale-125"
          >
            <i className="fas fa-globe"></i>
          </a>
        </div>
        <p className="text-sm m-5">
          Made by <span className="text-white font-medium">Sriram ❤️</span>
        </p>
        <p className="text-xs text-gray-400 m-5">&copy; 2025 All Rights Reserved</p>
      </footer>

      {/* Dialogs */}

      {/* General Alert Dialog */}
      <Dialog
        message={dialogMessage}
        isOpen={dialogOpen}
        onClose={closeDialog}
        inputMode={false}
      />

      {/* Filename Input Dialog */}
      <Dialog
        isOpen={filenameDialogOpen}
        message="Enter your desired MP3 filename (without .mp3):"
        inputMode={true}
        onClose={() => setFilenameDialogOpen(false)}
        onSubmit={handleFilenameSubmit}
      />
    </div>
  );
}

export default App;
