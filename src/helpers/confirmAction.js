import alertConfirm, { alert } from "react-alert-confirm";
import "react-alert-confirm/dist/index.css";

export default async function confirmAction(title, content) {
  const [isOk, action] = await alertConfirm({
    title: title,
    content: content,
    type: "confirm",
    lang: "en",
    okText: "OK",
    cancelText: "Cancel",
  });

  return isOk;
}
