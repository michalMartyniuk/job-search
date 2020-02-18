import types from "./authTypes";
import firebase from "../../config/firebase";
import { setNotification } from "../app/appActions";

const db = firebase.firestore();
const auth = firebase.auth();

export const setUserKeySkills = value => ({
  type: types.SET_USER_KEY_SKILLS,
  value
});
export const setSignUpName = name => ({ type: types.SET_SIGNUP_NAME, name });
export const setSignUpEmail = email => ({
  type: types.SET_SIGNUP_EMAIL,
  email
});
export const setSignUpPassword = password => ({
  type: types.SET_SIGNUP_PASSWORD,
  password
});
export const set_logInName = name => ({ type: types.SET_LOGIN_NAME, name });
export const setLogInEmail = email => ({
  type: types.SET_LOGIN_EMAIL,
  email
});
export const setLogInPassword = password => ({
  type: types.SET_LOGIN_PASSWORD,
  password
});
export const setSignUpState = state => ({
  type: types.SET_SIGNUP_STATE,
  state
});
export const setLogInState = state => ({
  type: types.SET_LOGIN_STATE,
  state
});
export const signUpError = error => {
  return { type: types.SIGNUP_ERROR, error };
};
export const signUpErrorReset = () => {
  return { type: types.SIGNUP_ERROR_RESET };
};
export const logInError = error => {
  return { type: types.LOG_IN_ERROR, error };
};
export const logInErrorReset = () => {
  return { type: types.LOG_IN_ERROR_RESET };
};
export const setAccountType = accountType => {
  return { type: types.SET_ACCOUNT_TYPE, accountType };
};
export const setLogIn = user => {
  return dispatch => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const { accountType } = doc.data();
        const offers = [];
        const ivents = [];
        db.collection(`users/${auth.currentUser.uid}/offers`)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(offer =>
              offers.push({ id: offer.id, ...offer.data() })
            );
            db.collection(`users/${auth.currentUser.uid}/events`)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(ivent =>
                  ivents.push({ id: ivent.id, ...ivent.data() })
                );
                dispatch({
                  type: types.LOGIN,
                  user: { ...doc.data(), id: user.uid, offers, ivents }
                });
                dispatch(setAccountType(accountType));
                dispatch({ type: types.SIGNUP_ERROR_RESET });
                dispatch({ type: types.LOG_IN_ERROR_RESET });
              });
          });
      });
  };
};
export const authSignUp = (name, email, password, accountType) => {
  let accountData = { name, email, accountType };
  if (accountType === "employee") {
    accountData = {
      ...accountData,
      savedOffers: [],
      appliedOffers: [],
      savedIvents: [],
      appliedIvents: [],
      userKeySkills: {
        Word: false,
        Excel: false,
        PowerPoint: false
      }
    };
  } else if (accountType === "employer") {
    accountData = {
      ...accountData,
      closedOffers: [],
      closedIvents: []
    };
  }
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        db.collection("users")
          .doc(user.user.uid)
          .set(accountData)
          .then(() => {
            dispatch(
              setNotification(true, "Zostałeś pomyślnie zalogowany", "success")
            );
            dispatch(setLogIn(user.user));
          });
      })
      .catch(error => {
        dispatch(signUpError(error.message));
      });
  };
};
const checkAccountTypeMatch = (email, accountType) => {
  return db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(snapshot => {
      let match;
      snapshot.forEach(doc => {
        if (accountType === doc.data().accountType) {
          match = true;
          return true;
        }
        match = false;
      });
      return match;
    });
};

export const authLogIn = (email, password, accountType) => {
  return dispatch => {
    checkAccountTypeMatch(email, accountType).then(result => {
      if (!result) {
        return { type: "" };
      }
      auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          if (user) {
            dispatch(
              setNotification(true, "Zostałeś pomyślnie zalogowany", "success")
            );
            dispatch(setLogIn(user.user));
          } else {
            dispatch(logInError("Nie znaleziono użytkownika"));
          }
        })
        .catch(error => {
          dispatch(logInError(error.message));
        });
    });
  };
};
export const authLogOut = () => {
  return dispatch => {
    auth.signOut().then(() => {
      dispatch({ type: types.LOGOUT });
    });
  };
};

export const updateProfile = updateData => {
  return dispatch => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => console.log(doc.data()))
      // .then(() => {
    //     dispatch({ type: types.UPDATE_PROFILE });
    //   });
    // .set(accountData)
    // .then(() => {
    //   dispatch(
    //     setNotification(true, "Zostałeś pomyślnie zalogowany", "success")
    //   );
    //   dispatch(setLogIn(user.user));
    // });
  };
};
function createTimestamp() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const seconds = date.getSeconds().toString();
  return { year, month, day, hours, minutes, seconds };
}
export const addOffer = inputs => {
  const date = createTimestamp();
  const data = { ...inputs, date };
  return dispatch => {
    console.log("sldkfj");
    // Create offer with inputs data
    db.collection(`users/${auth.currentUser.uid}/offers`)
      .add(data)
      .then(doc => {
        // Get current user name from users collection
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then(user => user.data())
          // Save in variable "offer" created document id, owner id, owner name and offer data
          .then(userData => {
            doc.get().then(doc => {
              const offer = {
                id: doc.id,
                ownerId: auth.currentUser.uid,
                ownerName: userData.name,
                ...doc.data()
              };
              // Save offer in user offers collection
              db.collection(`users/${auth.currentUser.uid}/offers`)
                .doc(doc.id)
                .set(offer)
                .then(() => {
                  // Save offer in offers collection
                  db.collection("offers")
                    .doc(doc.id)
                    .set(offer)
                    .then(() => {
                      dispatch({ type: types.ADD_OFFER, offer });
                      // dispatch(
                      //     setNotification(
                      //       true,
                      //       "Twoja oferta została dodana",
                      //       "success"
                      //     )
                      // );
                    });
                });
            });
          });
      });
  };
};
export const applyToOffer = offerId => {
  return dispatch => {
    db.collection("offers")
      .doc(offerId)
      .get()
      .then(doc => {
        const offer = { id: offerId, ...doc.data() };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            appliedOffers: firebase.firestore.FieldValue.arrayUnion(offer)
          })
          .then(() => {
            dispatch({ type: types.APPLY_TO_OFFER, offer });
          });
      });
  };
};
export const saveOffer = offerId => {
  return dispatch => {
    db.collection("offers")
      .doc(offerId)
      .get()
      .then(doc => {
        const offer = { id: offerId, ...doc.data() };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            savedOffers: firebase.firestore.FieldValue.arrayUnion(offer)
          })
          .then(() => {
            dispatch({ type: types.SAVE_OFFER, offer });
          });
      });
  };
};
export const getOffer = offerId => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      db.collection(`users/${auth.currentUser.uid}/offers`)
        .doc(offerId)
        .get()
        .then(doc => {
          dispatch({ type: types.GET_OFFER, offer: doc.data() });
          resolve(doc.data());
        });
    });
  };
};
export const editOffer = inputs => {
  const date = createTimestamp();
  const offer = { ...inputs, date };
  return dispatch => {
    // Change offer with edited offer id in /offers to edited offer
    db.collection("offers")
      .doc(inputs.id)
      .set(offer)
      .then(() => {
        // Change offer to edited offer in user /offers
        db.collection(`users/${auth.currentUser.uid}/offers`)
          .doc(inputs.id)
          .set(offer)
          .then(() => {
            // Get updated user offers
            db.collection(`users/${auth.currentUser.uid}/offers`)
              .get()
              .then(snapshot => {
                const updatedOffers = snapshot.docs.map(doc => {
                  return doc.data();
                });
                console.log(updatedOffers);
              });
            // dispatch({ type: types.EDIT_OFFER });
          });
      });
  };
};
export const closeOffer = offerId => {
  // Add offer to closedOffers array
  return dispatch => {
    db.collection("offers")
      .doc(offerId)
      .get()
      .then(doc => {
        const offer = { id: offerId, ...doc.data() };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            closedOffers: firebase.firestore.FieldValue.arrayUnion(offer)
          })
          .then(() => {
            dispatch({ type: types.CLOSE_OFFER, offer });
            // Delete offer from offers
            db.collection("offers")
              .doc(offerId)
              .delete()
              .then(() => {
                // Delete offer from user/offers
                db.collection(`users/${auth.currentUser.uid}/offers`)
                  .doc(offerId)
                  .delete();
              });
          });
      });
  };
};

export const removeOffer = (offer, offerType) => {
  return dispatch => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        [offerType]: firebase.firestore.FieldValue.arrayRemove(offer)
      })
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then(doc => {
            const offers = doc.data()[offerType];
            dispatch({ type: types.REMOVE_OFFER, offerType, offers });
          });
      });
  };
};

export const reactivateOffer = offerId => {
  // Get offer from closed offers
  // Remove offer from closed offers
  // Add offer to offers and user offers
  return dispatch => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => {
        const data = doc.data();
        const offer = data.closedOffers.find(offer => offer.id === offerId);
        const closedOffers = data.closedOffers.filter(
          offer => offer.id !== offerId
        );
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({ closedOffers })
          .then(() => {
            db.collection("offers")
              .doc(offerId)
              .set(offer)
              .then(() => {
                db.collection(`users/${auth.currentUser.uid}/offers`)
                  .doc(offerId)
                  .set(offer)
                  .then(() => {
                    db.collection(`users/${auth.currentUser.uid}/offers`)
                      .get()
                      .then(snapshot => {
                        const offers = snapshot.docs.map(doc => {
                          const data = doc.data();
                          const { id } = doc;
                          return { ...data, id };
                        });
                        dispatch({
                          type: types.REACTIVATE_OFFER,
                          closedOffers,
                          offers
                        });
                      });
                  });
              });
          });
      });
  };
};
export const addIvent = inputs => {
  const date = createTimestamp();
  const data = { ...inputs, date };
  return dispatch => {
    console.log("sldkfj");
    // Create offer with inputs data
    db.collection(`users/${auth.currentUser.uid}/events`)
      .add(data)
      .then(doc => {
        // Get current user name from users collection
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then(user => user.data())
          // Save in variable "offer" created document id, owner id, owner name and offer data
          .then(userData => {
            doc.get().then(doc => {
              const ivent = {
                id: doc.id,
                ownerId: auth.currentUser.uid,
                ownerName: userData.name,
                ...doc.data()
              };
              // Save offer in user offers collection
              db.collection(`users/${auth.currentUser.uid}/events`)
                .doc(doc.id)
                .set(ivent)
                .then(() => {
                  // Save offer in offers collection
                  db.collection("events")
                    .doc(doc.id)
                    .set(ivent)
                    .then(() => {
                      dispatch({ type: types.ADD_IVENT, ivent });
                      // dispatch(
                      //     setNotification(
                      //       true,
                      //       "Twoja oferta została dodana",
                      //       "success"
                      //     )
                      // );
                    });
                });
            });
          });
      });
  };
};
export const applyToIvent = iventId => {
  return dispatch => {
    db.collection("events")
      .doc(iventId)
      .get()
      .then(doc => {
        const ivent = { id: iventId, ...doc.data() };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            appliedIvents: firebase.firestore.FieldValue.arrayUnion(ivent)
          })
          .then(() => {
            console.log(ivent);
            dispatch({ type: types.APPLY_TO_IVENT, ivent });
          });
      });
  };
};
export const saveIvent = iventId => {
  return dispatch => {
    db.collection("events")
      .doc(iventId)
      .get()
      .then(doc => {
        const ivent = {
          id: iventId,
          ...doc.data()
        };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            savedIvents: firebase.firestore.FieldValue.arrayUnion(ivent)
          })
          .then(() => {
            dispatch({ type: types.SAVE_IVENT, ivent });
          });
      });
  };
};

export const closeIvent = iventId => {
  // Add offer to closedIvents array
  return dispatch => {
    db.collection("events")
      .doc(iventId)
      .get()
      .then(doc => {
        const ivent = { id: iventId, ...doc.data() };
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            closedIvents: firebase.firestore.FieldValue.arrayUnion(ivent)
          })
          .then(() => {
            dispatch({ type: types.CLOSE_IVENT, ivent });
            // Delete offer from Ivents
            db.collection("events")
              .doc(iventId)
              .delete()
              .then(() => {
                // Delete offer from user/Ivents
                db.collection(`users/${auth.currentUser.uid}/events`)
                  .doc(iventId)
                  .delete();
              });
          });
      });
  };
};

export const removeIvent = (ivent, iventType) => {
  return dispatch => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        [iventType]: firebase.firestore.FieldValue.arrayRemove(ivent)
      })
      .then(() => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then(doc => {
            const ivents = doc.data()[iventType];
            dispatch({ type: types.REMOVE_IVENT, iventType, ivents });
          });
      });
  };
};

export const reactivateIvent = iventId => {
  // Get offer from closed ivents
  // Remove offer from closed ivents
  // Add offer to ivents and user ivents
  return dispatch => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(doc => {
        const data = doc.data();
        const ivent = data.closedIvents.find(ivent => ivent.id === iventId);
        const closedIvents = data.closedIvents.filter(
          ivent => ivent.id !== iventId
        );
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({ closedIvents })
          .then(() => {
            db.collection("events")
              .doc(iventId)
              .set(ivent)
              .then(() => {
                db.collection(`users/${auth.currentUser.uid}/events`)
                  .doc(iventId)
                  .set(ivent)
                  .then(() => {
                    db.collection(`users/${auth.currentUser.uid}/events`)
                      .get()
                      .then(snapshot => {
                        const ivents = snapshot.docs.map(doc => {
                          const data = doc.data();
                          const { id } = doc;
                          return { ...data, id };
                        });
                        dispatch({
                          type: types.REACTIVATE_IVENT,
                          closedIvents,
                          ivents
                        });
                      });
                  });
              });
          });
      });
  };
};
