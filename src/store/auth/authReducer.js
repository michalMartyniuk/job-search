import types from "./authTypes";

const initialState = {
  signUpName: "",
  signUpEmail: "",
  signUpPassword: "",
  logInName: "",
  logInEmail: "",
  logInPassword: "",
  user: {
    id: null,
    accountType: "",
    name: "",
    email: "",
    offers: [],
    savedOffers: [],
    appliedOffers: [],
    closedOffers: [],

    ivents: [],
    savedIvents: [],
    appliedIvents: [],
    closedIvents: [],

    userKeySkills: {
      Word: false,
      Excel: false,
      PowerPoint: false
    },
    userDescription: null
  },
  loggedIn: false,
  logInError: false,
  signUpError: false,
  accountType: "",
  editedOffer: null,
  editedIvent: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SIGNUP_STATE:
      return {
        ...state,
        signUp_state: action.state
      };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.error
      };
    case types.SIGNUP_ERROR_RESET:
      return {
        ...state,
        signUpError: false
      };
    case types.SET_LOGIN_STATE:
      return {
        ...state,
        logInState: action.state
      };
    case types.LOG_IN_ERROR:
      return {
        ...state,
        logInError: action.error
      };
    case types.LOG_IN_ERROR_RESET:
      return {
        ...state,
        logInError: false
      };
    case types.SET_SIGNUP_NAME:
      return {
        ...state,
        signUpName: action.name
      };
    case types.SET_SIGNUP_EMAIL:
      return {
        ...state,
        signUpEmail: action.email
      };
    case types.SET_SIGNUP_PASSWORD:
      return {
        ...state,
        signUpPassword: action.password
      };
    case types.SET_LOGIN_NAME:
      return {
        ...state,
        logInName: action.name
      };
    case types.SET_LOGIN_EMAIL:
      return {
        ...state,
        logInEmail: action.email
      };
    case types.SET_LOGIN_PASSWORD:
      return {
        ...state,
        logInPassword: action.password
      };
    case types.LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        signUpName: "",
        signUpEmail: "",
        signUpPassword: "",
        logInName: "",
        logInEmail: "",
        logInPassword: ""
      };
    case types.SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: action.accountType
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        employer: false,
        employee: false,
        user: null
      };
    case types.GET_OFFER:
      return {
        ...state,
        editedOffer: action.offer
      };
    case types.GET_IVENT:
      return {
        ...state,
        editedIvent: action.ivent
      };
    case types.ADD_OFFER:
      return {
        ...state,
        user: {
          ...state.user,
          offers: [...state.user.offers, action.offer]
        }
      };
    case types.UPDATE_USER:
      return {
        ...state,
        user: action.updatedUser
      };
    case types.EDIT_OFFER:
      return {
        ...state,
        user: action.updatedUser
      };
    case types.APPLY_TO_OFFER:
      return {
        ...state,
        user: {
          ...state.user,
          appliedOffers: [...state.user.appliedOffers, action.offer]
        }
      };
    case types.SAVE_OFFER:
      return {
        ...state,
        user: {
          ...state.user,
          savedOffers: [...state.user.savedOffers, action.offer]
        }
      };

    case types.CLOSE_OFFER:
      const offers = state.user.offers.filter(
        offer => offer.id !== action.offer.id
      );
      return {
        ...state,
        user: {
          ...state.user,
          offers,
          closedOffers: [...state.user.closedOffers, action.offer]
        }
      };
    case types.CLOSE_IVENT:
      const ivents = state.user.ivents.filter(
        ivent => ivent.id !== action.ivent.id
      );
      return {
        ...state,
        user: {
          ...state.user,
          ivents,
          closedIvents: [...state.user.closedIvents, action.ivent]
        }
      };
    case types.REMOVE_OFFER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.offerType]: action.offers
        }
      };
    case types.REACTIVATE_OFFER:
      return {
        ...state,
        user: {
          ...state.user,
          offers: action.offers,
          closedOffers: action.closedOffers
        }
      };
    case types.ADD_IVENT:
      return {
        ...state,
        user: {
          ...state.user,
          ivents: [...state.user.ivents, action.ivent]
        }
      };
    case types.EDIT_IVENT:
      return {
        ...state,
        user: {
          ...state.user,
          ivents: [...state.user.ivents, action.ivent]
        }
      };
    case types.APPLY_TO_IVENT:
      return {
        ...state,
        user: {
          ...state.user,
          appliedIvents: [...state.user.appliedIvents, action.ivent]
        }
      };
    case types.SAVE_IVENT:
      return {
        ...state,
        user: {
          ...state.user,
          savedIvents: [...state.user.savedIvents, action.ivent]
        }
      };
    case types.REMOVE_IVENT:
      return {
        ...state,
        user: {
          ...state.user,
          [action.iventType]: action.ivents
        }
      };
    case types.REACTIVATE_IVENT:
      return {
        ...state,
        user: {
          ...state.user,
          ivents: action.ivents,
          closedIvents: action.closedIvents
        }
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.updateData
        }
      };
    case types.SET_USER_KEY_SKILLS:
      return {
        ...state,
        user: {
          ...state.user,
          userKeySkills: {
            ...state.user.userKeySkills,
            [action.value]: !state.user.userKeySkills[action.value]
          }
        }
      };
    case types.SET_USER_DESCRIPTION:
      return {
        ...state,
        user: {
          ...state.user,
          description: action.description
        }
      };
    default:
      return state;
  }
}
