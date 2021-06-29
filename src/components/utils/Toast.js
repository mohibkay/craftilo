import Toastify from "toastify-js";

export const toast = (resource, msg) => {
  const message = `${resource} ${msg}`;
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "center",
    backgroundColor: "var(--primary-color)",
    stopOnFocus: true,
  }).showToast();
};
