import { toast } from "react-toastify";

export const AppURl = process.env.NEXT_PUBLIC_API_URL as string;

export const showToast = (message: string, type: "Err" | "Success") => {
  if (type === "Err") return toast.error(message, { autoClose: 3000 });
  else return toast.success(message, { autoClose: 1000 });
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "todo":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
