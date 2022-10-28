import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../../reducers";
import { updateProfile, removeProfile } from "../../reducers/profile";
import { ProfileData } from "../../../components/profile/profile.type";

const useProfile = () => {
    const dispatch = useDispatch();

    // 현재 프로파일 반환
    const data = useSelector((state: RootState) => state.profile);

    // 프로파일 업데이트(= 등록) -> 프로파일 값이 없으면 remove
    const update = useCallback((profile?: ProfileData) => dispatch(!!profile ? updateProfile(profile) : removeProfile()), [dispatch]);

    // 프로파일 삭제 -> Guest Profile로 변경
    const remove = useCallback(() => dispatch(removeProfile()), [dispatch]);

    return { data, update, remove };
}

export { useProfile };