import { Container } from "@mui/system";
import { Fragment } from "react";
import Banner from "universal-banner";
import FAQ from "./components/faq/faq";
import { NavBar } from "./components/navbar/navbar";
import NeedxDAI from "./components/need-xdai/need-xdai";
import { SendCard } from "./components/send-card/send-card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { useState } from "react";
import ReactGA from "react-ga";
import Donate from "./components/donate/donate";
import { Footer } from "./components/footer/footer";

export const useAnalyticsEventTracker = (category: string) => {
    const eventTracker = (action: string, label: string) => {
        ReactGA.event({ category, action, label });
    };
    return eventTracker;
};

function App() {
    const [openGetMoreFaq, setOpenGetMoreFaq] = useState<() => void>(
        () => () => null
    );
    const [network, setNetwork] = useState<string>("Gnosis Chain");

    const trackingId = "UA-237444060-2";

    ReactGA.initialize(trackingId);
    ReactGA.pageview("gnosisfaucet.com");

    return (
        <Fragment>
            <Banner />
            <Container
                maxWidth="xl"
                sx={{ marginBottom: "2em" }}
                data-testid="container"
            >
                <ToastContainer
                    position="top-right"
                    autoClose={50000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <NavBar />
                <NeedxDAI 
                    openGetMoreFaq={openGetMoreFaq}
                    network={network} 
                />
                <SendCard
                    network={network}
                    setNetwork={setNetwork}
                />
                <FAQ setOpenGetMoreFaq={setOpenGetMoreFaq} />
                <Donate />
            </Container>
            <Footer />
        </Fragment>
    );
}

export default App;
