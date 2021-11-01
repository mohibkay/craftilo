// @ts-ignore
import Toastify from "toastify-js";

export const toast = (resource: string, msg = "") => {
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

export const darkToast = (resource: string, msg = "") => {
  const message = `${resource} ${msg}`;
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    offset: {
      y: "3rem",
      x: "",
    },
    backgroundColor: "var(--dark)",
    stopOnFocus: true,
  }).showToast();
};
