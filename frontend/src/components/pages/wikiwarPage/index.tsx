import * as React from "react"

import {Button, Typography, withStyles} from "@material-ui/core";

import Timer from "./timer";
import {styles} from "../../../../static/wikiwar-style";
import {apiUrl, wikipediaUrl} from "../../../../../env";
import {getRandomPageName, remoteStart, sseInit} from "../../../helpers";

interface IWikiwarPageProps {
    graphPath: string[],
    setGraphPath: (pagename: any) => void,
    classes: any,
}

interface IStartResponse {
    startPage: string,
    goalPage: string,
}

const WikiwarPage = (props: IWikiwarPageProps) => {

    React.useEffect(() => {
        sseInit(setCurrentPage); //Here we only update the current page because the random url should give us an actual name but a link can give us a redirect url
    }, []);

    const {classes} = props;

    const timerRef = React.useRef();
    const [startPage, setStartPage] = React.useState(null);
    const [goalPage, setGoalPage] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(null);

    const startGame = async () => {
        let init : IStartResponse = JSON.parse(await remoteStart());
        setStartPage(init.startPage);
        setCurrentPage(init.startPage);
        setGoalPage(init.goalPage);
        // @ts-ignore FIXME
        timerRef.current.start();
    };

    if (currentPage && currentPage === goalPage) {
        // @ts-ignore FIXME
        timerRef.current.stop();
    }

    return (
        <div className={classes.wwar_page}>
            <Timer ref={timerRef}/>
            <Typography>s: <a href={`${wikipediaUrl}${startPage}`} target="_blank">{startPage}</a></Typography>
            <Typography>c: {currentPage}</Typography>
            <Typography>g: <a href={`${wikipediaUrl}${goalPage}`} target="_blank">{goalPage}</a></Typography>
            <Button onClick={startGame}>Start</Button>
            <iframe className={classes.wwar_iframe} src={`${apiUrl}wiki/${startPage}`}/>
        </div>
    );
};


export default withStyles(styles)(WikiwarPage);