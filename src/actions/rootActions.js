export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const REQUEST_ITEMS_SUCCESS = 'REQUEST_ITEMS_SUCCESS';
export const REQUEST_ITEMS_ERROR = 'REQUEST_ITEMS_ERROR';

const apiBase = 'https://cloud-api.yandex.net/v1';

export const requestItems = () => ({
    type: REQUEST_ITEMS
});

export const requestItemsSuccess = (folders, currentDir) => ({
    type: REQUEST_ITEMS_SUCCESS,
    payload: {
        folders,
        currentDir
    }
});

export const requestItemsError = payload => ({
    type: REQUEST_ITEMS_ERROR,
    payload
});

export const getItems = (path = '/') => dispatch => {
  const token = localStorage.getItem('accessToken');
  const url = `${apiBase}/disk/resources?path=${path}`;
  dispatch(requestItems());
  return fetch(url, {
    headers: {
      Authorization: `OAuth ${token}`
    }
  }).then(res => res.json())
  .then(
    res => {
      const newPath = path.replace(/^disk:/, '');
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
      dispatch(requestItemsSuccess(res._embedded.items, newPath));
    },
    err => dispatch(requestItemsError(err))
  );
}

export const navigate = () => ({
  type: navigate
});