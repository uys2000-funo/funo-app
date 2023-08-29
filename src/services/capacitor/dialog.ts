import { Dialog } from "@capacitor/dialog";

export const showAlert = function (
  title: string,
  message: string,
  buttonTitle = "Tamam"
) {
  return Dialog.alert({
    title: title,
    message: message,
    buttonTitle: buttonTitle,
  });
};

export const showPrompt = function (
  title: string,
  message: string,
  okButtonTitle = "Tamam",
  cancelButtonTitle = "İptal"
) {
  return Dialog.confirm({
    title: title,
    message: message,
    okButtonTitle: okButtonTitle,
    cancelButtonTitle: cancelButtonTitle,
  });
};

export const showConfirm = function (
  title: string,
  message: string,
  okButtonTitle = "Tamam",
  cancelButtonTitle = "İptal"
) {
  return Dialog.confirm({
    title: title,
    message: message,
    okButtonTitle: okButtonTitle,
    cancelButtonTitle: cancelButtonTitle,
  });
};
