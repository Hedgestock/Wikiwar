import * as React from "react"

import {Button, Typography, withStyles} from "@material-ui/core";

import Timer from "./timer";
import {styles} from "../../../../static/wikiwar-style";
import {apiUrl, wikipediaUrl} from "../../../../../env";
import {remoteStart, sseInit} from "../../../helpers";
import {IStartResponse} from "../../../../models/iStartResponse";
import {Input} from "@material-ui/core";

interface IWikiwarPageProps {
    graphPath: string[],
    setGraphPath: (pagename: any) => void,
    classes: any,
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
    const [username, setUsername] = React.useState("");

    const startGame = async (username: string) => {
        let init: IStartResponse = JSON.parse(await remoteStart(username));
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
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={() => startGame(username)}>Start</Button>
            <iframe className={classes.wwar_iframe} src={`${apiUrl}wiki/${startPage}`}/>
        </div>
    );
};


export default withStyles(styles)(WikiwarPage);