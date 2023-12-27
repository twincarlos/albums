import { useEffect, useState } from 'react';
import { uploadManyPhotos, getManyPhotos } from './store/session';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [photosUrls, setPhotosUrls] = useState(null);
  const dispatch = useDispatch();
  const photos = useSelector(state => state.sessionReducer.photos);

  const handleFileChange = e => {
    const files = e.target.files;
    setPhotosUrls(Object.values(files));
  };

  const handleUpload = e => {
    e.preventDefault();
    if (photosUrls) {
      dispatch(uploadManyPhotos({ eventId: 1, photosUrls }));
    }
  };

  useEffect(() => {
    dispatch(getManyPhotos());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="photosUrls" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {
        photos ? Object.values(photos).map(photo => <img key={photo.id} src={photo.photoURL} />) : <p>Loading...</p>
      }
    </div>
  );
};

export default App;