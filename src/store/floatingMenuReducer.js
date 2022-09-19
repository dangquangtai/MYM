import * as actionTypes from './actions';

export const initialState = {
  folder: false,
  document: false,
  detailDocument: false,
  accountDocument: false,
  mentorDocument: false,
  departmentDocument: false,
  batchDocument: false,
  podcastDocument: false,
  episodeDocument: false,
};

const floatingMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FLOATING_MENU_CHANGE: 
      return {
        ...state,
        folder: action.folder,
        document: action.document,
        detailDocument: action.detailDocument,
        accountDocument: action.accountDocument,
        mentorDocument: action.mentorDocument,
        departmentDocument: action.departmentDocument,
        batchDocument: action.batchDocument,
        podcastDocument: action.podcastDocument,
        episodeDocument: action.episodeDocument,
      };
    default:
      return state;
  }
};

export default floatingMenuReducer;
