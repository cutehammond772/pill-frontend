import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../../reducers";
import { confirmAuthentication, confirmLogout } from "../../reducers/auth";

const useAuthConfirm = () => {
    const dispatch = useDispatch();

    const authenticated = useSelector((state: RootState) => state.auth.authenticated);

    const authenticate = useCallback(() => dispatch(confirmAuthentication()), [dispatch]);
    const logout = useCallback(() => dispatch(confirmLogout()), [dispatch]);

    return { authenticated, authenticate, logout };
};

export { useAuthConfirm };