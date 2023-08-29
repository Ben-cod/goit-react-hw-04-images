import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadeMore';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/modal';
import { fetchImages } from './api';
import { Loader } from './Loader/Loader';

import { Notify } from 'notiflix';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [largeImageURL, setlargeImageURL] = useState('');

  useEffect(() => {
    const fetchGalleryData = async () => {
      if (query !== '') {
        try {
          setIsLoading(true);
          const response = await fetchImages(query, page);

          if (response.length === 0) {
            Notify.failure('No found!');
          }

          setImages(prevState => [...prevState, ...response]);
          setShowBtn(response.length >= 12);
        } catch (error) {
          console.error('API Error', error);
          setImages(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchGalleryData(query, page);
  }, [query, page]);

  const changeQuery = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const onModalOpen = url => {
    setShowModal(true);
    setlargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setlargeImageURL('');
  };

  const handleLoadMore = () => setPage(prevState => prevState + 1);

  return (
    <div>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery images={images} onModalOpen={onModalOpen} />

      {showBtn && <LoadMore onClick={handleLoadMore} />}
      {isLoading && <Loader />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};
