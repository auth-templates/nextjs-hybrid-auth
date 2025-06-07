import { toast, ToastOptions, TypeOptions } from 'react-toastify';

// Define a type for the updateOrCreateToast function parameters
interface UpdateOrCreateToastOptions extends ToastOptions {
  containerId: string;
  toastId: string;
  message: string;
  type: TypeOptions;
  options?: ToastOptions;
}

export function updateOrCreateToast({ containerId, toastId, message, options, type }: UpdateOrCreateToastOptions): void {
    if ( toast.isActive(toastId, containerId) ) {
        toast.update(toastId, {render: message, ...(options ? options : {}), type: type || 'info'});
    } else {
        toast(message, { toastId, containerId, ...(options ? options : {}), type: type || 'info'});
    }
};