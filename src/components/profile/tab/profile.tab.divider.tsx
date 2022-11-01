
import { ProfileTabDividerContent, ProfileTabDividerLine } from "./profile.tab.style";

const ProfileTabDivider = ({ title }: { title: string }) => {
  return (
    <ProfileTabDividerLine>
      <ProfileTabDividerContent>
        {title}
      </ProfileTabDividerContent>
    </ProfileTabDividerLine>
  );
};

export { ProfileTabDivider };
