import { ProfileTabTitleContent } from "./profile.tab.style";

const ProfileTabTitle = ({ title }: { title: string }) => {
    return (
        <ProfileTabTitleContent>
          {title}
        </ProfileTabTitleContent>
    )
};

export { ProfileTabTitle };