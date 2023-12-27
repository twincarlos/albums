import { csrfFetch } from './csrf';

const UPLOAD_PHOTOS = 'photos/UPLOAD_PHOTOS';
const GET_PHOTOS = 'photos/GET_PHOTOS';

const uploadPhotos = photos => {
  return {
    type: UPLOAD_PHOTOS,
    photos
  };
};
const getPhotos = photos => {
  return {
    type: GET_PHOTOS,
    photos
  };
};

export const uploadManyPhotos = ({ eventId, photosUrls }) => async dispatch => {
  const formData = new FormData();
  formData.append('eventId', eventId);
  photosUrls.forEach(file => {
    formData.append('files', file);
  });

  const response = await csrfFetch('/api/session', {
      method: "POST",
      headers: {
          "Content-Type": "multipart/form-data",
      },
      body: formData
  });

  const photos = await response.json();
  return dispatch(uploadPhotos(photos));
}
export const getManyPhotos = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const photos = await response.json();
  return dispatch(getPhotos(photos));
};

const initialState = { photos: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTOS:
    case GET_PHOTOS: {
      const newState = { ...state };
      action.photos.forEach(photo => newState.photos ? newState.photos[photo.id] = photo : newState.photos = { [photo.id]: photo });
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
