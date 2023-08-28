import css from './Modal.module.css';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === 27 || e.currentTarget === e.target) {
      return onModalClose();
    }
  };

  render() {
    const { largeImageURL, tag } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleKeyDown}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tag} />
        </div>
      </div>
    );
  }
}
