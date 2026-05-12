import API from './api';
import { store } from './app/store';
import { adminLogout, userLogout } from './features/auth/authSlice';
import Swal from 'sweetalert2';

let attached = false;

export const attach401Interceptor = () => {
  if (attached) return;
  attached = true;

  API.interceptors.response.use(
    (res) => res,
    async (err) => {
      const status = err?.response?.status;
      if (!status) return Promise.reject(err);

      if (status === 401) {
        const clientType = err?.config?.headers?.['x-client-type'];


        await Swal.fire({
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        // Dispatch logout action based on client type
        switch (clientType) {
          case 'admin':
            store.dispatch(adminLogout());
            break;
          case 'teacher':
            // No teacherLogout action available, handle accordingly if needed
            break;
          case 'user':
            store.dispatch(userLogout());
            break;
          default:
            store.dispatch(adminLogout());
            // No teacherLogout action available, handle accordingly if needed
            store.dispatch(userLogout());
        }

        window.location.reload();
      }

      return Promise.reject(err);
    }
  );
};
