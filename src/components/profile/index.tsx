import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import * as config from '../../config';
import request from '../../utils/request';

import { ProfileData } from './profile.type';
import { ProfileAvatar } from "./profile.component.avatar";
import { ProfileInfo } from "./profile.component.info";
import { ProfileTab } from "./profile.component.tab";

import { useProfile } from '../../utils/hooks/profile';
import { INITIAL_STATE } from '../../utils/reducers/profile/reducer.profile.type';

const Profile = () => {
    const profile = useProfile();

    // 현재는 첫 로드 (새로고침, 리다이렉트) 때에만 프로필을 업데이트하도록 구현했다. 이후 로직 수정이 필요하다.
    useEffect(() => {
        const init = async () => {
            try {
                const { axios, authenticated } = await request();

                if (!!axios && authenticated) {
                    const response = await axios.get(`/${config.API_ROUTE}/${config.API_USER_PROFILE}`);

                    // response는 무조건 userName, profileUrl 프로퍼티가 담긴 JSON 데이터여야 한다.
                    const user: ProfileData = response.data as ProfileData;
                    profile.update(user);

                    console.log('[Profile] Fetched Profile successfully.');
                } else {
                    throw new Error();
                }
            } catch (e) {
                console.log('[Profile] Failed loading profile.');
                profile.remove();
            }
        };

        if (profile.data === INITIAL_STATE)
            init();
    }, [profile]);

    // state 변경 함수는 람다식으로 한번 감싸주어야 한다.
    return (
    <Box>
        <ProfileAvatar/>
    </Box>
    );
};

export default Profile;