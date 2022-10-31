import { Card } from "@mui/material";
import { DefaultText } from "../../styles/GlobalStyles";

const ProfileInfo = () => {
    return (
        <Card sx={{
            width: "100px",
            height: "40px",
            background: "linear-gradient(90deg, hsla(211, 66%, 87%, 1) 0%, hsla(348, 67%, 88%, 1) 50%, hsla(272, 26%, 72%, 1) 100%)",
            borderRadius: "10px",

            display: "flex",
            flexFlow: "column",
            zIndex: 4
        }}>
            <DefaultText color="black">Legend</DefaultText>
            <DefaultText color="black">300P</DefaultText>
        </Card>
    );
};

export { ProfileInfo };