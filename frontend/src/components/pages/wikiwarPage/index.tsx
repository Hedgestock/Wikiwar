import * as React from "react"

import {Button, Typography, withStyles} from "@material-ui/core";

import Timer from "./timer";
import {styles} from "../../../../static/wikiwar-style";
import {apiUrl} from "../../../../../env";
import {getRandomPageName, sseInit} from "../../../helpers";

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

    const startGame = async () => {
        let pageName: string = await getRandomPageName();
        setStartPage(pageName);
        console.log("start", startPage);
        setCurrentPage(pageName);
        console.log("current", currentPage);
        pageName = await getRandomPageName();
        setGoalPage(pageName);
        // @ts-ignore
        timerRef.current.start();
    };

    return (
        <div className={classes.wwar_page}>
            <Timer ref={timerRef}/>
            <Typography>s: {startPage}</Typography>
            <Typography>c: {currentPage}</Typography>
            <Typography>g: {goalPage}</Typography>
            <Button onClick={startGame}>Click</Button>
            <iframe className={classes.wwar_iframe} src={`${apiUrl}wiki/${startPage}`}/>
        </div>
    );
};


export default withStyles(styles)(WikiwarPage);