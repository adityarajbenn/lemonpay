// Check if token exists in localStorage
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  
  // Logout function to clear token
  export const logout = () => {
    localStorage.removeItem("token");
  };
  