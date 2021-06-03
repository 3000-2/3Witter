import { firebaseDB } from "./firebase";

class Repository {
  saveTwit(uid, Twit, today) {
    firebaseDB.ref(`twits/${uid}/${today}${Twit.time}`).set(Twit);
  }

  syncAllTwit(onUpdate) {
    const ref = firebaseDB.ref(`twits`);

    ref.on("value", (snapshot) => {
      const Twit = snapshot.val();
      Twit && onUpdate(Twit);
    });
    return () => ref.off();
  }

  saveProfile(user) {
    firebaseDB.ref(`user/${user.uid}/profile`).set(user);
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
