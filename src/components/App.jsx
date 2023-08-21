import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMore } from "./LoadMore/LoadeMore";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/modal";
import { fetchImages } from "./api";
import { Loader } from "./Loader/Loader";

import { Notify } from 'notiflix';



export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.fetchGallery(this.state.query, this.state.page)
    }
  }
  async fetchGallery (query, page) {
    try {
      this.setState({ loading: true });
      const response = await fetchImages(query, page)
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response],
          showBtn: response.length >= 12,
        }
      })
      if (response.length === 0) {
        Notify.failure('No found!')
      }
    } catch (error) {
      console.error('API Error', error)
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  changeQuery = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    })
    
  }
    
 


  onModalOpen = url => {
    this.setState({ showModal: true, largeImageURL: url, })
  }

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '', })
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
  }

  render() {
    const { images, isLoading, showBtn, showModal, largeImageURL } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.changeQuery} />
        <ImageGallery images={images} onModalOpen={this.onModalOpen} />


        {showBtn && <LoadMore onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}

        {showModal && <Modal
          largeImageURL={largeImageURL}
          onModalClose={this.onModalClose} />}
      </div>
    );
  }

};
