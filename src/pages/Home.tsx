import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Login, Logout } from "../components/auth/AuthComponents";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import queryString from "query-string";
import * as config from "../config";

const Home = () => {
    const { search } = useLocation();
    const { response } = queryString.parse(search);

    let jsonValue: string;
    if (!response) {
        jsonValue = "{}";
    } else {
        console.log(response);
        jsonValue = Buffer.from(response as string, 'base64').toString('utf8');
    }

    return (
        <Container>
            <Header />
            <div className="p-index-banner">
                <h1>You can take Pill with no side effects,</h1>
                <h1>and get a useful knowledge.</h1>
                <h2>{jsonValue}</h2>

                <Login redirect={config.INDEX} className="btn btn-outline-info btn-lg" provider="google">
                    Click to Sign in
                </Login>
                <Logout className="btn btn-outline-info btn-lg" redirect="/">
                    Click to Logout
                </Logout>
            </div>
            <Footer />
        </Container>
    );
}

export default Home;