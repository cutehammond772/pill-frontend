import { Header } from "../../layouts/header";
import { Footer } from "../../layouts/footer";
import { Container } from "../../layouts/container";

import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const NotFound = () => {
    return (
        <Container>
            <Header />
            <div style = {{ position: 'absolute', top: '30%' }}>
                <h1>Wrong Page.</h1>
                <Button variant="contained">
                    <Link to="/" className="text-white">Go to Home</Link>    
                </Button>
            </div>
            <Footer />
        </Container>
    );
};

export { NotFound };