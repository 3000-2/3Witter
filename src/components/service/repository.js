import { firebaseDB } from "./firebase";

class Repository {
  saveTwit(uid, Twit) {
    firebaseDB.ref(`twits/${uid}/${Twit.time}`).set(Twit);
  }

  syncAllTwit(onUpdate) {
    const ref = firebaseDB.ref(`twits`);

    ref.on("value", (snapshot) => {
      const Twit = snapshot.val();
      Twit && onUpdate(Twit);
    });
    return () => ref.off();
  }

  deleteTwit(Twit) {
    firebaseDB.ref(`twits/${Twit.uid}/${Twit.time}`).remove();
  }

  saveFavorite(user, Twit) {
    firebaseDB
      .ref(`twits/${Twit.uid}/${Twit.time}/favor/${user.uid}`)
      .set(true);
  }

  deleteFavorite(user, Twit) {
    firebaseDB.ref(`twits/${Twit.uid}/${Twit.time}/favor/${user.uid}`).remove();
  }

  saveProfile(user) {
    firebaseDB.ref(`user/${user.uid}/profile`).set(user);
  }

  syncProfile(onUpdate) {
    const ref = firebaseDB.ref(`user/`);

    ref.on("value", (snapshot) => {
      const Profile = snapshot.val();
      Profile && onUpdate(Profile);
    });
    return () => ref.off();
  }

  setProfile(user, onUpdate) {
    const ref = firebaseDB.ref(`user/${user.uid}/profile`);

    ref.on("value", (snapshot) => {
      const Profile = snapshot.val();
      if (!Profile) onUpdate();
    });
    return () => ref.off();
  }
}

export default Repository;
