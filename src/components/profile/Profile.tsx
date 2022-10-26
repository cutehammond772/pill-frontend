import request from '../../utils/request';
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import * as config from '../../config';

interface ProfileData {
    displayName: string,
    image?: React.ReactNode
};

interface UserProfile {
    userName: string,
    profileUrl: string
};

/** 프로파일을 불러오는 중일 때 사용되는 임시 프로파일이다. */
const LOADING_PROFILE: ProfileData = {
    displayName: 'Loding Profile...'
};

/** 아직 로그인이 안된 상태일 때 이 프로파일을 사용한다. */
const GUEST_PROFILE: ProfileData = {
    displayName: 'Guest',
    image: (
        <svg height="46" width="46">
            <circle cx="23" cy="23" r="22" stroke="white" strokeWidth="2" fillOpacity="0"/>
            <text className="noselect" x="17" y="30" fill="white">?</text>
        </svg>
    )
};

const getUserProfile: (profile: UserProfile) => ProfileData = (profile: UserProfile) => {
    return {
        displayName: profile.userName,
        image: (
            <img className="pill-profile" src={profile.profileUrl} width="46" height="46" alt={profile.userName}/>
        )
    }
};

const Profile = () => {
    // profile 변수가 동적으로 관리된다. axios.get()를 이용해 profile을 불러온다.
    const [profile, setProfile] = useState<ProfileData>(LOADING_PROFILE);

    // <Profile> Component가 렌더링되는 시점에 호출된다. JQuery의 $(document).ready()와 유사하다.
    useEffect(() => {
        const update = async () => {
            try {
                const { axios, authenticated } = await request();
                if (!!axios && authenticated) {
                    const response = await axios.get(`/${config.API_ROUTE}/user/profile`);
                    // response는 무조건 userName, profileUrl 프로퍼티가 담긴 JSON 데이터여야 한다.
                    const user: UserProfile = response.data as UserProfile;
                    setProfile(!user ? GUEST_PROFILE : getUserProfile(user));

                    console.log('[Profile] Fetched Profile successfully.');
                } else {
                    throw new Error();
                }
            } catch (e) {
                console.log('[Profile] Failed loading profile.');
                setProfile(GUEST_PROFILE);
            }
        };

        update();
    }, []);

    // ProfileSpec 관련 설정
    const ref = useRef<HTMLDivElement>(null);
    const [toggle, setToggle] = useState(false);

    // toggle 값이 바뀔 때마다 ProfileSpec의 css 값이 바뀐다.
    // 프로파일이 로딩 중일 때는 모든 입력을 막는다.
    useEffect(() => {
        if (profile !== LOADING_PROFILE && !!ref.current) {
            ref.current.style.display = toggle ? 'flex' : 'none';
        } else {
            // 로딩 중일 때는 toggle 값을 false로 고정시킨다.
            setToggle(false);
        }
    }, [profile, toggle]);

    // state 변경 함수는 람다식으로 한번 감싸주어야 한다.
    return (
        <div className='position-relative'>
            <Tooltip title={profile.displayName}>
                <div onMouseUp={() => setToggle(!toggle)}>
                    { !profile.image ? GUEST_PROFILE.image : profile.image }
                </div>
            </Tooltip>
        </div>
    );
};

export default Profile;