import { loginSuccess, adminLogout } from "../context/AuthContext";
import API from "../api";

export const restoreAdminSession = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin_token"));

  if (!token) {
    dispatch(adminLogout());
    return;
  }

  try {
    const res = await API.get("/admin/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user, allowedModules } = res.data.data;

    dispatch(
      loginSuccess({
        user,
        token,
        allowedModules: allowedModules || [],
      })
    );

  } catch (error) {
    dispatch(adminLogout());
  }
};
