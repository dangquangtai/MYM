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
  playlistDocument: false,
  batchDocument: false,
  voucherDocument: false,
  eventDocument: false,
  eventcategoryDocument: false,
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
        playlistDocument: action.playlistDocument,
        batchDocument: action.batchDocument,
        voucherDocument: action.voucherDocument,
        eventDocument: action.eventDocument,
        eventcategoryDocument: action.eventcategoryDocument,
      };
    default:
      return state;
  }
};

export default floatingMenuReducer;
