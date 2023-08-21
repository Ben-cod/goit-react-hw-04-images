import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ webformatURL,
    largeImageURL,
    tags,
    onModalOpen }) => {

    return (

        <li className={css.galleryItem}>
            <img
                className={css.galleryItem_image}
                onClick={() => onModalOpen(largeImageURL)}
                src={webformatURL}
                alt={tags}
                largeimage={largeImageURL}

            />
        </li>


    )
}
