import { connect } from 'react-redux';
import {
  addImagesAction,
  updateImageCategoryAction,
  updateImageProbability
} from '../actions/images';
import Images from '../components/Images/Images';

const mapStateToProps = state => {
  return {
    images: state.images.images,
    categories: state.categories,
    imageByteStrings: state.images.imageByteStrings,
    zoomLevel: state.settings.zoomLevel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addImagesAction: image => {
      dispatch(addImagesAction(image));
    },
    updateImageCategory: (identifier, category) => {
      dispatch(updateImageCategoryAction(identifier, category));
      dispatch(updateImageProbability(identifier, null));
    }
  };
};

const ConnectedImages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);

export default ConnectedImages;