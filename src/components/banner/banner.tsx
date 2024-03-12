import { AppBar, Toolbar, Typography } from "@mui/material";
import "./banner.scss";

export const Banner: React.FC = () => {
    return (
        <div className="banner__root">
            <AppBar color="transparent" position="static">
                <Toolbar id="back-to-top-anchor">
                    <Typography className="banner__title">
                        <p>
                            Celebrate the New Year with the{" "}
                            <b> Gnosis Builders 2023 NFT! </b> Minting{" "}
                            <a
                                href="https://nft.gnosis.builders/"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {" "}
                                now live
                            </a>
                            .
                        </p>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};