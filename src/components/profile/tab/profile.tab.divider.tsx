
import { ProfileTabDividerContent } from "./profile.tab.style";

const ProfileTabDivider = ({ title }: { title: string }) => {
  return (
    <ProfileTabDividerContent>
        {title}
    </ProfileTabDividerContent>
  );
};

export { ProfileTabDivider };
