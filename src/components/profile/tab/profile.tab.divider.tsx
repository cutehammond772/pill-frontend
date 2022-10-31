
import { ProfileTabDividerContent, ProfileTabDividerLine } from "./profile.tab.style";

const ProfileTabDivider = ({ title }: { title: string }) => {
  return (
    <ProfileTabDividerLine>
      <ProfileTabDividerContent>
        Received Comment
      </ProfileTabDividerContent>
    </ProfileTabDividerLine>
  );
};

export { ProfileTabDivider };
