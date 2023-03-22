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
  voucherDocument: false,
  eventDocument: false,
  eventcategoryDocument: false,
  mentorListDocument: false,
  partnerDocument: false,
  partnerCategoryDocument: false,
  cardBatchDocument: false,
  cardDocument: false,
  processDeptDocument: false,
  processUserDocument: false,
  processrolecode: '',
  fileDocument: false,
  fileCategoryDocument: false,
  fileTypeDocument: false,
  notificationCategoryDocument: false,
  notificationMessageDocument: false,
  counsellingPriceDocument: false,
  broadcastDocument: false,
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
        voucherDocument: action.voucherDocument,
        eventDocument: action.eventDocument,
        eventcategoryDocument: action.eventcategoryDocument,
        mentorListDocument: action.mentorListDocument,
        partnerDocument: action.partnerDocument,
        partnerCategoryDocument: action.partnerCategoryDocument,
        cardBatchDocument: action.cardBatchDocument,
        cardDocument: action.cardDocument,
        processDeptDocument: action.processDeptDocument,
        processUserDocument: action.processUserDocument,
        processrolecode: action.processrolecode,
        fileDocument: action.fileDocument,
        fileCategoryDocument: action.fileCategoryDocument,
        fileTypeDocument: action.fileTypeDocument,
        notificationCategoryDocument: action.notificationCategoryDocument,
        notificationMessageDocument: action.notificationMessageDocument,
        counsellingPriceDocument: action.counsellingPriceDocument,
        broadcastDocument: action.broadcastDocument,
        newsDocument: action.newsDocument,
        landingPageDocument: action.landingPageDocument,
        newsCategoryDocument: action.newsCategoryDocument,
        bannerDocument: action.bannerDocument,
        bannerListDocument: action.bannerListDocument,
        newsListDocument: action.newsListDocument,
        counsellingCategoryDocument: action.counsellingCategoryDocument,
        qnaDocument: action.qnaDocument,
      };
    default:
      return state;
  }
};

export default floatingMenuReducer;
