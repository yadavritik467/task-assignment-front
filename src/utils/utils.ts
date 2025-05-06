import { toast } from "react-toastify";

export const AppURl = "http://localhost:4500";

export const showToast = (message: string, type: "Err" | "Success") => {
  if (type === "Err") return toast.error(message, { autoClose: 3000 });
  else return toast.success(message, { autoClose: 1000 });
};
