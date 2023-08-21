import css from './LoadeMore.module.css'


export const LoadMore = ({ onClick }) => {

    return (
        <div className={css.loadeWrap}>
            <button
                type='button'
                className={css.loadeButton}
                onClick={onClick}>Loade more</button>
        </div>
    )
}