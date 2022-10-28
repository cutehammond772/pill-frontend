import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { Login, Logout } from "../../components/auth";
import * as config from "../../config";
import { useQueryResponse } from "../../utils/hooks/query_response";


const Home = () => {
    const response = useQueryResponse();
    const json = response.rawJsonString();
    
    return (
        <Container>
            <Header />
            <div style={{
                height: "1024px"
            }}>
                <h1>You can take Pill with no side effects,</h1>
                <h1>and get a useful knowledge.</h1>
                <h2>{!!json && json}</h2>

                <Login redirect={config.INDEX} provider="google">
                    Click to Sign in
                </Login>
                <Logout redirect="/">
                    Click to Logout
                </Logout>
            </div>
            <Footer />
        </Container>
    );
}

export { Home };