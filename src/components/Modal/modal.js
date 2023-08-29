import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onModalClose, largeImageURL, tag }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);
  const handleKeyOut = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };
  return (
    <div className={css.Overlay} onClick={handleKeyOut}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tag} />
      </div>
    </div>
  );
};
