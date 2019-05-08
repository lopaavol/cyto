import { connect } from 'react-redux';
import axios from 'axios';
import { SidebarDrawer } from '../pages/images';
import { createImageAction } from '../reducers/classifier';
import {
  addCategoryAction,
  createCategoryAction
} from '../reducers/classifier';
import { updateSpinnerSpinningAction } from '../reducers/settings';
import { Dispatch } from 'redux';
import { Classifier } from '../types';

const loadDemoProject = (demo: string) => {
  return (dispatch: any) => {
    return axios
      .get(
        ' https://raw.githubusercontent.com/cytoai/cyto/master/src/demos/' +
          demo +
          '.cyto'
      )
      .then(result => {
        dispatch(updateSpinnerSpinningAction());
        dispatch(createImageAction(result.data.images));
        dispatch(addCategoryAction(result.data.categories));
      })
      .catch(function(error) {
        alert(error);
      });
  };
};

type State = {
  classifier: Classifier;
};

const mapStateToProps = (state: State) => {
  return {
    images: state.classifier.images,
    categories: state.classifier.categories
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateStore: (data: { images: any; categories: any }) => {
      dispatch(createImageAction(data.images));
      dispatch(addCategoryAction(data.categories));
    },
    createCategory: (identfier: any, color: any, description: any) => {
      const category = {
        color: color,
        description: description,
        identifier: identfier,
        index: null,
        visible: true
      };
      dispatch(createCategoryAction(category));
    },
    loadDemoProject: (demo: string) => {
      dispatch(createImageAction({}));
      dispatch(updateSpinnerSpinningAction());
      // dispatch(loadDemoProject(demo));
    }
  };
};

const ConnectedSidebarDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarDrawer);

export default ConnectedSidebarDrawer;