import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import "./faq.scss";
import { useState, useEffect, useRef } from "react";
import { useAnalyticsEventTracker } from "../../App";
import { higherAmount, lowerAmount } from "../../constants";

type FAQProps = {
    setOpenGetMoreFaq: (x: () => void) => void;
};

const FAQ = ({ setOpenGetMoreFaq }: FAQProps) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const eventTracker = useAnalyticsEventTracker("FAQ");

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            eventTracker(panel, newExpanded ? "Open" : "Close");
            setExpanded(newExpanded ? panel : false);
        };

    const getMoreFaqRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setOpenGetMoreFaq(() => () => {
            setExpanded("hcigmx");
            if (getMoreFaqRef.current !== null) {
                getMoreFaqRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                });
            }
        });
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography
                fontFamily="GT-Planar"
                fontSize="35px"
                align="center"
                marginTop="1.5em"
            >
                FAQ
            </Typography>
            <Accordion
                className="faq__accordion"
                expanded={expanded === "wiaf"}
                onChange={handleChange("wiaf")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        What is a faucet
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        <span>
                            A crypto faucet is a tool that distributes small
                            amounts of tokens to perform transactions on a
                            blockchain network. The Gnosis Chain xDAI faucet
                            distributes xDAI to new users so that they may have
                            enough gas to complete a few transactions and
                            interact with applications on Gnosis Chain.
                        </span>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "wix"}
                onChange={handleChange("wix")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        What is xDAI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        xDai tokens are transactional tokens on the Gnosis Chain
                        and also used to pay for execution of smart contracts
                        and gas fees. For more information regarding xDAI, visit
                        the{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://docs.gnosischain.com/"
                        >
                            {" "}
                            Gnosis Chain documentation.
                        </a>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "fuc"}
                onChange={handleChange("fuc")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        Faucet usage conditions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        component={"span"}
                        variant={"body2"}
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        Users who wish to obtain {lowerAmount} xDAI from the
                        Gnosis Chain faucet must have solved the captcha
                        verification. Users who wish to obtain {higherAmount}{" "}
                        xDAI must complete the previous steps in addition to
                        sending a verification Tweet. Smart contract developers
                        looking for more xDAI to deploy contracts can obtain
                        0.01 xDAI from the faucet by verifying their contract
                        ABI.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "hcigmx"}
                onChange={handleChange("hcigmx")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                    ref={getMoreFaqRef}
                >
                    <Typography
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        How can I get more xDAI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        id="need-more"
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        Visit{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://buyxdai.com/"
                        >
                            buyxdai.com
                        </a>{" "}
                        to purchase xDAI with fiat or to swap with crypto. If
                        you already own DAI on another EVM compatible chain,
                        visit{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://buyxdai.com/"
                        >
                            buyxdai.com
                        </a>{" "}
                        to bridge and convert your DAI to xDAI on Gnosis Chain.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "hciacc"}
                onChange={handleChange("hciacc")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        Chiado Testnet Details
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        <ul>
                            <li>Network ID: 10200</li>
                            <li>RPC: https://rpc.chiadochain.net</li>
                            <li>
                                Explorer: https://blockscout.chiadochain.net
                            </li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default FAQ;
