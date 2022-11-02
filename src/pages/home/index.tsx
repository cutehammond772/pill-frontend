import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { useAuth } from "../../utils/hooks/auth";

import { UserHome } from "./user";
import { GuestHome } from "./guest";

const HomePage = () => {
  const auth = useAuth();

  return (
    <Container>
      <Header/>
      {auth.authenticated ? <UserHome /> : <GuestHome />}
      <Footer />
    </Container>
  );
};

export { HomePage };
