import { Container } from "@mui/system";
import logo from "./footerLogo.png";
import twitter from "./twitter.svg";
import telegram from "./telegram.svg";
import "./footer.scss";
import { Grid, Typography, useMediaQuery } from "@mui/material";

export const Footer = () => {
    const isTablet = useMediaQuery("(min-width:768px)");

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <Container className="footer" maxWidth={false}>
            <div className="footer__container">
                <Grid container spacing={0}>
                    {isTablet ? (
                        <Grid item xs={2.6} className="footer__image-container">
                            <img src={logo} onClick={scrollToTop} className="footer__image" />
                        </Grid>
                    ) : (
                        <Grid item xs={12} className="footer__image-container">
                            <img src={logo} onClick={scrollToTop} className="footer__image" />
                        </Grid>
                    )}
                    <Grid item xs={isTablet ? 2.25 : 6} className={!isTablet ? "center-align" : ""}>
                        <Typography className="footer__content__title">
                            ORGANIZATION
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosis.io"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Gnosis Chain
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosis.builders/contact-us"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Contact Us
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://jobs.ashbyhq.com/f.actor"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Careers
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosis.builders/gnosis-builders-blog"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Builders Blog
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosis.builders/verify"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Verify
                            </a>
                        </Typography>
                    </Grid>
                    <Grid item xs={isTablet ? 2.25 : 6} className={!isTablet ? "center-align" : ""}>
                        <Typography className="footer__content__title">
                            TOOLS
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://gnosisfaucet.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                xDAI Faucet
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://buyxdai.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Buy xDAI
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://buyxdai.com/gno"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Buy GNO
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosismetrics.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Gnosis Metrics
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.validategnosis.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Validate Gnosis
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://mgno.validategnosis.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                mGNO Deposit
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://d14n.info/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                d14n
                            </a>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={isTablet ? 2.25 : 6}
                        className={!isTablet ? "top__margin center-align" : ""}
                    >
                        <Typography className="footer__content__title">
                            DIRECTORY
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.daosongnosis.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                DAO
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosisdefi.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                DeFi
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.nftsongnosis.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                NFT/Gaming
                            </a>
                        </Typography>
                        <Typography className="footer__content__text">
                            <a
                                href="https://www.gnosiswallets.com/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="footer__no-decoration"
                            >
                                Wallet Finder
                            </a>
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={isTablet ? 2.25 : 6}
                        className={!isTablet ? "top__margin center-align" : ""}
                    >
                        <Typography className="footer__content__title">
                            SOCIAL
                        </Typography>
                        <Grid
                            container
                            spacing={1}
                            className="footer__content__socials"
                        >
                            <Grid item xs={4}>
                                <a
                                    href="https://twitter.com/gnosisbuilders"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="footer__no-decoration"
                                >
                                    <img src={twitter} />
                                </a>
                            </Grid>
                            <Grid item xs={4}>
                                <a
                                    href="https://t.me/GnosisBuildersCommunity"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="footer__no-decoration"
                                >
                                    <img src={telegram} />
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}