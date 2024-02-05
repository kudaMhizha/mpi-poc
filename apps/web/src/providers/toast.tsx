import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from '@mpi-app/ui';
import {useToast} from '../hooks/useToast';

export const Toaster = () => {
  const {toasts} = useToast();

  return (
    <ToastProvider>
      {toasts.map(({id, icon, title, description, action, ...props}) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <div className="flex items-center gap-x-2">
                {icon}
                {title && <ToastTitle>{title}</ToastTitle>}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            {action}
            <ToastClose />
          </Toast>
        );
      })}

      <ToastViewport />
    </ToastProvider>
  );
};
