import { Component } from 'react';
import css from './Searchbar.module.css'


export class Searchbar extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const query = e.target.search.value;



        this.props.onSubmit(query);
    };
    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css.buttonLabel}></span>
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        name="search"
                        autoComplete="off"
                        autoFocus={true}
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }

};

