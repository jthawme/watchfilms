import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { ToastProps } from "./common";
import { Toast } from "./index";

import styles from "./Toast.module.scss";
import { AnimatePresence } from "framer-motion";

interface ToastContextProps {
  addToast: (opts: Partial<ToastProps>) => number;
  removeToast: (id: string) => void;
}

interface ToastContainerProps {
  children: React.ReactNode;
}

const ToastContext = createContext<ToastContextProps>({
  addToast: () => -1,
  removeToast: () => {},
});

const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {
  const toastId = useRef(0);
  const currentToasts = useRef<ToastProps[]>([]);
  const [stateUpdate, setStateUpdate] = useState(0);

  const addToast = useCallback(
    (opts: Partial<ToastProps>) => {
      const next = toastId.current + 1;
      currentToasts.current = [
        ...currentToasts.current,
        {
          ...opts,
          message: opts.message || "",
          id: next,
        },
      ];

      toastId.current = next;

      setStateUpdate(Math.random() * 1000);

      return next;
    },
    [currentToasts]
  );

  const removeToast = useCallback(
    (id: any) => {
      const current = currentToasts.current.slice();
      current.splice(
        current.findIndex((c) => c.id === id),
        1
      );
      currentToasts.current = current;

      setStateUpdate(Math.random() * 1000);
    },
    [currentToasts]
  );

  const value = {
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div key={stateUpdate} className={styles.container}>
        <AnimatePresence>
          {currentToasts.current.map((toast) => (
            <Toast
              {...toast}
              key={toast.id}
              onDone={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const useToastContext = () => useContext(ToastContext);

export { useToastContext, ToastContainer };
