import { firebaseAuth, googleProvider, twitterProvider } from './firebase';

class AuthService {
  login(provider) {
    const authProvider = this.getProvider(provider);

    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChanged(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        onUserChanged({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        onUserChanged(null);
      }
    });
  }

  getProvider(provider) {
    switch (provider) {
      case 'Google':
        return googleProvider;
      case 'Twitter':
        return twitterProvider;
      default:
        throw new Error(`unknown provide name : ${provider}`);
    }
  }
}

export default AuthService;
