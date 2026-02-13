export const signUpWithEmail = async (email, password, name) => {
  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required.' };
  }
  // TODO: Connect to backend
  localStorage.setItem('userToken', JSON.stringify({ email, name }));
  localStorage.setItem('isLoggedIn', 'true');
  return { success: true };
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }
  // TODO: Connect to backend
  localStorage.setItem('userToken', JSON.stringify({ email }));
  localStorage.setItem('isLoggedIn', 'true');
  return { success: true };
};

export const signInWithGoogle = async () => {
  // TODO: Connect to backend
  localStorage.setItem('userToken', JSON.stringify({ provider: 'google' }));
  localStorage.setItem('isLoggedIn', 'true');
  return { success: true };
};

export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getUserToken = () => {
  return localStorage.getItem('userToken');
};

export const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('isLoggedIn');
};
