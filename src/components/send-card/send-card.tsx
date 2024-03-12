import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextareaAutosize,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container } from "@mui/system";
import axios from "axios";
import { ChangeEvent, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useAnalyticsEventTracker } from "../../App";
import {
    CHIADO,
    GNOSIS,
    GNO_CHIADO,
    higherAmount,
    lowerAmount,
    NETWORKS,
    OPTIMISM_GNOSIS,
    smartContractAmount,
} from "../../constants";
import { verifyABI } from "../../utils";
import Loading from "../loading";
import "./send-card.scss";

type SetNetworkProps = {
    network: string;
    setNetwork: (value: string) => void;
};

export const SendCard = ({ network, setNetwork }: SetNetworkProps) => {
    const gnosisExplorer = process.env.REACT_APP_EXPLORER_URL as string;
    const chiadoExplorer = process.env.REACT_APP_CHIADO_EXPLORE_URL as string;
    const optimismExplorer = process.env
        .REACT_APP_OPTIMISM_EXPLORE_URL as string;

    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");
    const [hash, setHash] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [tweetUrl, setTweetUrl] = useState<string>("");
    const [smartContractABI, setSmartContractABI] = useState<string>("");
    const [amount, setAmount] = useState<string>(lowerAmount.toString());
    const [randomAmount, setRandomAmount] = useState<number>(0);
    const [tweetText, setTweetText] = useState<string>("");
    const [explorerUrl, setExplorerUrl] = useState<string>(gnosisExplorer);

    const eventTracker = useAnalyticsEventTracker("Send Card");

    const serverUrl = process.env.REACT_APP_BACKEND_URL as string;
    const siteKey = process.env.REACT_APP_HCAPTCHA_SITE_KEY as string;

    const handleNetworkChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNetwork(value);
        eventTracker("Network Change", value);
        if (value === GNOSIS) {
            setCaptchaVerified(false);
            setExplorerUrl(gnosisExplorer);
        } else if (value === CHIADO) {
            setCaptchaVerified(false);
            setExplorerUrl(chiadoExplorer);
        } else if (value === OPTIMISM_GNOSIS) {
            setCaptchaVerified(false);
            setExplorerUrl(optimismExplorer);
        } else if (value === GNO_CHIADO) {
            setCaptchaVerified(false);
            setExplorerUrl(chiadoExplorer);
        }
    };

    const handleWalletAddressChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setWalletAddress(event.target.value);
    };

    const handleTweetUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTweetUrl(event.target.value);
    };

    const handleSmartContractABIChange = (
        event: ChangeEvent<HTMLTextAreaElement>
    ) => {
        setSmartContractABI(event.target.value);
    };

    const handleAmountChange = (
        event: React.MouseEvent<HTMLElement>,
        newAmount: string
    ) => {
        if (newAmount !== null) {
            setAmount(newAmount);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onVerifyCaptcha = (_token: string) => {
        setCaptchaVerified(true);
        setCaptchaToken(_token);
    };

    const paste = (setFunction: (text: string) => void) => {
        navigator.clipboard.readText().then((clipboard) => {
            setFunction(clipboard);
        });
    };

    const sendRequest = async () => {
        eventTracker("Send Request", smartContractABI);
        let _amount = amount;

        if (_amount === smartContractAmount.toString()) {
            try {
                verifyABI(smartContractABI);
            } catch (error) {
                if (error !== null || error !== undefined) {
                    toast("Unable to verify ABI: " + error);
                    return;
                }
            }
        }

        if (network === "Gnosis Chain") {
            if (amount === higherAmount.toString() && tweetUrl.length <= 0) {
                toast.error("Please provide a tweet URL.");
                return;
            }

            if (amount === higherAmount.toString() && tweetUrl.length > 0) {
                if (!tweetUrl.includes("https://twitter.com/")) {
                    toast.error("Please provide a valid tweet URL.");
                    return;
                } else {
                    _amount = (+amount + randomAmount).toFixed(5);
                }
            }
        }

        if (walletAddress.length <= 0) {
            toast.error("Please provide a wallet address.");
            return;
        }

        const url = `${serverUrl}/request-token`;
        try {
            setShowLoading(true);
            const req = {
                walletAddress,
                network,
                tweetUrl,
                amount: _amount,
                smartContractABI,
                captchaToken,
            };

            axios
                .post(url, req)
                .then((response) => {
                    setShowLoading(false);
                    if (response.data.status === "success") {
                        setHash(response.data.data);
                        setWalletAddress("");
                        setTweetUrl("");
                        setSmartContractABI("");
                        setAmount(lowerAmount.toString());
                        setCaptchaVerified(
                            network === "Chiado Testnet" ? true : false
                        );
                        toast(
                            "xDAI sent to your wallet address. Hash: " +
                                response.data.data
                        );
                    } else {
                        toast("Error sending xDAI, please try again");
                    }
                })
                .catch((error) => {
                    setShowLoading(false);
                    toast.error(error.response.data.data.error);
                });

            eventTracker("Send Request", JSON.stringify(req));
        } catch (error) {
            setShowLoading(false);
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const isTabletOrMobile = useMediaQuery("(max-width:960px)");

    const tweetPlaceholder = process.env.REACT_APP_TWEET_TEXT as string;

    const getTweetText = (): string => {
        if (tweetText.length > 0) {
            return tweetText;
        } else {
            const _randomAmount = Math.random() / 1000;
            setRandomAmount(_randomAmount);
            const amount = (+higherAmount + _randomAmount).toFixed(5);
            const _tweetText = tweetPlaceholder.replace("AMOUNT", amount);
            setTweetText(
                `${_tweetText}\n\nBy @gnosisbuilders\n📍 gnosis.builders`
            );
            return _tweetText;
        }
    };

    const showCaptcha = () => {
        return (
            <Fragment>
                <Grid item xs={12}>
                    <Typography
                        color="white"
                        variant="body1"
                        fontFamily="GT-Planar"
                        fontSize="20px"
                    >
                        Verify
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <HCaptcha
                        size={isTabletOrMobile ? "compact" : "normal"}
                        sitekey={siteKey}
                        onVerify={onVerifyCaptcha}
                    />
                </Grid>
            </Fragment>
        );
    };

    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent className="send-card__green-area">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                color="white"
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
                                Network
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="send-card__element"
                                id="network"
                                name="network"
                                select
                                fullWidth
                                value={network}
                                onChange={handleNetworkChange}
                            >
                                {NETWORKS.map(({ key, name }) => (
                                    <MenuItem key={key} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                color="white"
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
                                Wallet
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleWalletAddressChange}
                                value={walletAddress}
                                className="send-card__element"
                                id="wallet-address"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            onClick={() =>
                                                paste(setWalletAddress)
                                            }
                                            className="send-card__text-button"
                                            variant="outlined"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Paste
                                        </Button>
                                    ),
                                }}
                            />
                        </Grid>
                        {network === OPTIMISM_GNOSIS && showCaptcha()}
                        {network === GNO_CHIADO && showCaptcha()}
                        {network === CHIADO && showCaptcha()}
                        {network === GNOSIS && (
                            <>
                                <Grid item xs={12}>
                                    <Typography
                                        color="white"
                                        variant="body1"
                                        fontFamily="GT-Planar"
                                        fontSize="20px"
                                    >
                                        Request Amount
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ToggleButtonGroup
                                        className="send-card__element send-card__toggle-group"
                                        value={amount}
                                        exclusive
                                        onChange={handleAmountChange}
                                    >
                                        <ToggleButton
                                            value={lowerAmount.toString()}
                                        >
                                            {lowerAmount} xDAI
                                        </ToggleButton>
                                        <ToggleButton
                                            value={higherAmount.toString()}
                                        >
                                            {higherAmount} xDAI
                                        </ToggleButton>
                                        <ToggleButton
                                            value={smartContractAmount.toString()}
                                        >
                                            {smartContractAmount} xDAI
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                                {amount === higherAmount.toString() && (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="white"
                                                variant="body1"
                                                fontFamily="GT-Planar"
                                                fontSize="17px"
                                            >
                                                Post the below text in a tweet
                                                and provide a link to the tweet
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className="send-card__element"
                                                value={getTweetText()}
                                                id="tweet-text"
                                                name="tweet-text"
                                                fullWidth
                                                multiline
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="white"
                                                variant="body1"
                                                fontFamily="GT-Planar"
                                                fontSize="20px"
                                            >
                                                Link to tweet
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={handleTweetUrlChange}
                                                value={tweetUrl}
                                                className="send-card__element"
                                                id="wallet-address"
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <Button
                                                            onClick={() =>
                                                                paste(
                                                                    setTweetUrl
                                                                )
                                                            }
                                                            className="send-card__text-button"
                                                            variant="outlined"
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            Paste
                                                        </Button>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </>
                                )}
                                {amount === smartContractAmount.toString() && (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="yellow"
                                                variant="caption"
                                                fontFamily="GT-Planar-Regular"
                                                fontSize="12px"
                                            >
                                                This tier is only available for
                                                smart contract developers who
                                                need a little extra xDAI to
                                                deploy their contracts. Please
                                                paste your contract ABI below to
                                                get {smartContractAmount} xDAI.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography
                                                color="white"
                                                variant="body1"
                                                fontFamily="GT-Planar"
                                                fontSize="20px"
                                            >
                                                Smart Contract ABI
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextareaAutosize
                                                minRows={25}
                                                maxRows={25}
                                                onChange={
                                                    handleSmartContractABIChange
                                                }
                                                value={smartContractABI}
                                                className="send-card__textarea"
                                                id="smart-contract-abi"
                                                inputMode="text"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="flex-end"
                                            >
                                                <Button
                                                    onClick={() =>
                                                        paste(
                                                            setSmartContractABI
                                                        )
                                                    }
                                                    className="send-card__white-button"
                                                    variant="outlined"
                                                    sx={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Paste
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </>
                                )}
                                {showCaptcha()}
                            </>
                        )}
                        {hash !== undefined && hash.length > 0 && (
                            <Grid item xs={12}>
                                <Typography
                                    color="white"
                                    variant="body1"
                                    fontWeight={"bold"}
                                >
                                    <a
                                        style={{ color: "white" }}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        href={`${explorerUrl}/${hash}`}
                                    >
                                        View Transaction
                                    </a>
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                disabled={!captchaVerified}
                                className="send-card__white-button"
                                fullWidth
                                variant="outlined"
                                onClick={() => sendRequest()}
                            >
                                {network === GNOSIS && "Request xDAI"}
                                {network === CHIADO && "Request Chiado xDAI"}
                                {network === GNO_CHIADO &&
                                    "Request GNO on Chiado"}
                                {network === OPTIMISM_GNOSIS &&
                                    "Request Optimism on Gnosis"}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Loading open={showLoading} />
        </Container>
    );
};
