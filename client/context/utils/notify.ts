import { toast } from "react-toastify";

const types = ["success", "info", "warning", "error"];
type NotifyType = {
  type: "success" | "info" | "warning" | "error";
  message: string;
};

export const notify = ({ type, message }: NotifyType) => {
  toast(message, {
    type: type,
  });
};
