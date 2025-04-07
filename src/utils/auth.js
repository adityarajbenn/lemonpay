// Check if token exists in localStorage
export const isAuthenticated = () => {
    return !!localStorage.getItem("userId");
  };
  
  // Logout function to clear token
  export const logout = () => {
    localStorage.removeItem("userId");
  };
  