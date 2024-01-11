import { fetchImages } from '../api/query';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Section } from './Appi.styled';
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = largeImageURL => {
    setLargeImage(largeImageURL);
  };

  const closeModal = () => {
    setLargeImage('');
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...response.hits]);

        setTotalPages(Math.ceil(response.totalHits / 12));
        setLargeImage(response.hits.largeImageURL);
      } catch (error) {
        setError({ error: error.response.data });
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);
  return (
    <Section>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery images={images} onOpen={openModal} />
      )}

      {error && <h1>{error}</h1>}
      {largeImage && <Modal largeImg={largeImage} onClose={closeModal} />}
      {images.length !== 0 && page < totalPages && (
        <Button onClick={handleLoadMore} />
      )}
      <ToastContainer autoClose={1000} />
    </Section>
  );
};
