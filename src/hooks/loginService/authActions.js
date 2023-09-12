
export const loginn = (user) => {
  return {
    type: 'LOGIN',
    payload: user,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
