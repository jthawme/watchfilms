export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
}

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  id: any;
}
