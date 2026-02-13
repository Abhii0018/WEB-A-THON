export const signUpWithEmail = async (email, password, name) => {
  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required.' };
  }
  return { success: true };
};

export const signInWithEmail = async (email, password) => {
  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }
  return { success: true };
};

export const signInWithGoogle = async () => {
  return { success: true };
};
