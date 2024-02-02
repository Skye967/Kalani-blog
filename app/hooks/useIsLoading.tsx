const UseIsLoading = (bool: boolean) => {
  localStorage.setItem("isLoading", bool.toString());
  window.dispatchEvent(new Event("storage"));
};

export default UseIsLoading;
