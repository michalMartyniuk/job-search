import types from "./authTypes";
import firebase from "../../config/firebase";
import {
  setNotification,
  toggleUpdateProfile,
  setOffers,
  setIvents
} from "../app/appActions";

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

async function getDoc(collection, id) {
  const doc = await db.collection(collection).doc(id);
  return doc;
}
export const setLogIn = user => {
  return async dispatch => {
    const userDoc = await getDoc("users", user.uid);
    const userData = await userDoc.get().then(snapshot => snapshot.data());
    const offersSnapshot = await userDoc.collection("offers").get();
    const eventsSnapshot = await userDoc.collection("events").get();
    const { accountType } = userData;
    const offers = [];
    const ivents = [];

    offersSnapshot.forEach(offer =>
      offers.push({ id: offer.id, ...offer.data() })
    );
    eventsSnapshot.forEach(ivent =>
      ivents.push({ id: ivent.id, ...ivent.data() })
    );
    dispatch({
      type: types.LOGIN,
      user: {
        ...userData,
        id: user.uid,
        offers,
        ivents
      }
    });
    dispatch(setAccountType(accountType));
    dispatch({ type: types.SIGNUP_ERROR_RESET });
    dispatch({ type: types.LOG_IN_ERROR_RESET });
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
  return async dispatch => {
    const account = await auth.createUserWithEmailAndPassword(email, password);
    const userDoc = await getDoc("users", account.user.uid);
    await userDoc.set(accountData);
    dispatch(setNotification(true, "Zostałeś pomyślnie zalogowany", "success"));
    dispatch(setLogIn(account.user));
  };
};
const checkAccountTypeMatch = async (email, accountType) => {
  const account = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  let match;
  account.forEach(doc => {
    if (accountType === doc.data().accountType) {
      match = true;
      return true;
    }
    match = false;
  });
  return match;
};

export const authLogIn = (email, password, accountType) => {
  return async dispatch => {
    const accountName = accountType === "employer" ? "klienta" : "użytkownika";
    const accountMatch = await checkAccountTypeMatch(email, accountType);
    if (!accountMatch) {
      dispatch(
        setNotification(true, `Nie znaleziono konta ${accountName}`, "error")
      );
      return;
    }
    const user = await auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        if (err.code === "auth/wrong-password") {
          dispatch(setNotification(true, `Nieprawidłowe hasło`, "error"));
        }
        setNotification(true, `Nie znaleziono konta ${accountName}`, "error");
      });
    if (user) {
      dispatch(setLogIn(user.user));
      dispatch(
        setNotification(true, "Zostałeś pomyślnie zalogowany", "success")
      );
    }
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
  return async dispatch => {
    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    const userData = await userDoc.get().then(snapshot => snapshot.data());
    const userUpdated = {
      ...userData,
      userKeySkills: {
        ...updateData
      }
    };
    await userDoc.set(userUpdated);
    dispatch({ type: types.UPDATE_PROFILE });
    dispatch(
      setNotification(true, "Twój profil został zaktualizowany", "success")
    );
    dispatch(toggleUpdateProfile());
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

  return async dispatch => {
    const userDoc = await getDoc("users", auth.currentUser.uid);
    const userOffers = await userDoc.collection("offers");
    const newOffer = await (await userOffers.add(data)).get();
    const userData = await userDoc.get().then(snapshot => snapshot.data());
    const offer = {
      id: newOffer.id,
      ownerId: auth.currentUser.uid,
      ownerName: userData.name,
      appliedCount: 0,
      ...newOffer.data()
    };
    // Save offer in user offers collection
    await userOffers.doc(newOffer.id).set(offer);
    // Save offer in offers collection
    const globalNewOffer = await getDoc("offers", newOffer.id);
    globalNewOffer.set(offer);
    dispatch({ type: types.ADD_OFFER, offer });
    dispatch(setNotification(true, "Twoja oferta została dodana", "success"));
  };
};
async function checkIfApplied(id, type) {
  const userDoc = await db.collection("users").doc(auth.currentUser.uid);
  const userData = await userDoc.get().then(snapshot => snapshot.data());
  let matchArray = [];
  if (type === "offer") {
    matchArray = userData.appliedOffers.filter(offer => offer.id === id);
  } else if (type === "ivent") {
    matchArray = userData.appliedIvents.filter(ivent => ivent.id === id);
  }
  return !!matchArray.length;
}
export const applyToOffer = offerId => {
  return async dispatch => {
    const alreadyApplied = await checkIfApplied(offerId, "offer");
    if (alreadyApplied) {
      dispatch(setNotification(true, "Aplikowałeś już na tę ofertę", "info"));
      return;
    }
    const offerDoc = await getDoc("offers", offerId);
    await offerDoc.update({
      appliedCount: firebase.firestore.FieldValue.increment(1)
    });
    const offerData = await offerDoc.get().then(snapshot => snapshot.data());

    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    await userDoc.update({
      appliedOffers: firebase.firestore.FieldValue.arrayUnion(offerData)
    });

    const offer = offerData;
    dispatch({ type: types.APPLY_TO_OFFER, offer });
    dispatch(setNotification(true, "Aplikowałeś ofertę", "success"));
    dispatch(setOffers());
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
            dispatch(setNotification(true, "Zapisałeś ofertę", "success"));
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
              });
            // dispatch({ type: types.EDIT_OFFER });
          });
      });
  };
};
export const closeOffer = offerId => {
  // Add offer to closedIvents array
  return async dispatch => {
    const offerDoc = await db.collection("offers").doc(offerId);
    const offerData = await offerDoc.get().then(snapshot => snapshot.data());
    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    await userDoc.update({
      closedOffers: firebase.firestore.FieldValue.arrayUnion(offerData)
    });
    const offer = offerData;
    // Delete ivent from events collection
    await offerDoc.delete();
    // Delete offer from user/events collection
    await userDoc
      .collection("offers")
      .doc(offerId)
      .delete();

    dispatch({ type: types.CLOSE_OFFER, offer });
  };
};

export const removeOffer = (offer, offerType) => {
  return async dispatch => {
    if (offerType === "appliedOffers") {
      const globalOfferDoc = await db.collection("offers").doc(offer.id);
      await globalOfferDoc.update({
        appliedCount: firebase.firestore.FieldValue.increment(-1)
      });
    }
    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    await userDoc.update({
      [offerType]: firebase.firestore.FieldValue.arrayRemove(offer)
    });
    const userData = await userDoc.get().then(snapshot => snapshot.data());
    const offers = await userData[offerType];
    dispatch({ type: types.REMOVE_OFFER, offerType, offers });
    dispatch(setOffers());
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

  return async dispatch => {
    const userDoc = await getDoc("users", auth.currentUser.uid);
    const userIvents = await userDoc.collection("events");
    const newIvent = await (await userIvents.add(data)).get();
    const userData = await userDoc.get().then(snapshot => snapshot.data());
    const ivent = {
      id: newIvent.id,
      ownerId: auth.currentUser.uid,
      ownerName: userData.name,
      appliedCount: 0,
      ...newIvent.data()
    };
    // Save offer in user offers collection
    await userIvents.doc(newIvent.id).set(ivent);
    // Save offer in offers collection
    const globalNewIvent = await getDoc("events", newIvent.id);
    globalNewIvent.set(ivent);
    dispatch({ type: types.ADD_IVENT, ivent });
    dispatch(
      setNotification(true, "Twoje wydarzenie zostało dodana", "success")
    );
  };
};
export const applyToIvent = iventId => {
  return async dispatch => {
    const alreadyApplied = await checkIfApplied(iventId, "ivent");
    if (alreadyApplied) {
      dispatch(
        setNotification(true, "Aplikowałeś już na to wydarzenie", "info")
      );
      return;
    }
    const iventDoc = await getDoc("events", iventId);
    await iventDoc.update({
      appliedCount: firebase.firestore.FieldValue.increment(1)
    });
    const iventData = await iventDoc.get().then(snapshot => snapshot.data());

    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    await userDoc.update({
      appliedIvents: firebase.firestore.FieldValue.arrayUnion(iventData)
    });
    const ivent = iventData;
    dispatch({ type: types.APPLY_TO_IVENT, ivent });
    dispatch(setNotification(true, "Aplikowałeś wydarzenie", "success"));
    dispatch(setIvents());
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
            dispatch(setNotification(true, "Zapisałeś wydarzenie", "success"));
          });
      });
  };
};

export const closeIvent = iventId => {
  // Add offer to closedIvents array
  return async dispatch => {
    const iventDoc = await db.collection("events").doc(iventId);
    const iventData = await iventDoc.get().then(snapshot => snapshot.data());
    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    await userDoc.update({
      closedIvents: firebase.firestore.FieldValue.arrayUnion(iventData)
    });
    const ivent = iventData;
    // Delete ivent from events collection
    await iventDoc.delete();
    // Delete offer from user/events collection
    await userDoc
      .collection("events")
      .doc(iventId)
      .delete();

    dispatch({ type: types.CLOSE_IVENT, ivent });
  };
};
export const removeIvent = (ivent, iventType) => {
  return async dispatch => {
    if (iventType === "appliedIvents") {
      const globalIventDoc = await db.collection("events").doc(ivent.id);
      await globalIventDoc.update({
        appliedCount: firebase.firestore.FieldValue.increment(-1)
      });
    }
    const userDoc = await db.collection("users").doc(auth.currentUser.uid);
    await userDoc.update({
      [iventType]: firebase.firestore.FieldValue.arrayRemove(ivent)
    });
    const userData = await userDoc.get().then(snapshot => snapshot.data());
    const ivents = await userData[iventType];
    dispatch({ type: types.REMOVE_IVENT, iventType, ivents });
    dispatch(setIvents());
  };
};
export const reactivateIvent = iventId => {
  // Get offer from closed ivents
  // Remove offer from closed ivents
  // Add offer to ivents and user ivents
  return async dispatch => {
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
