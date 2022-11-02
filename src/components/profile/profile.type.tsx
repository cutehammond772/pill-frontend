interface ProfileData {
  displayName: string;
  profileUrl?: string;
  userName?: string;
}

/** 프로파일을 불러오는 중일 때 사용되는 임시 프로파일이다. */
const LOADING_PROFILE: ProfileData = {
  displayName: "Loding Profile",
};

/** 아직 로그인이 안된 상태일 때 이 프로파일을 사용한다. */
const GUEST_PROFILE: ProfileData = {
  displayName: "Guest",
};

const DefaultProfile = {
  LOADING: LOADING_PROFILE,
  GUEST: GUEST_PROFILE,
} as const;

interface AvatarProps {
  profile?: ProfileData;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export { type ProfileData, type AvatarProps, DefaultProfile };
