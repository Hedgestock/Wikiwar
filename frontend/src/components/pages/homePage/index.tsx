import * as React from "react"

import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";
import {formatTimer, getScores} from "../../../helpers";
import {wikipediaUrl} from "../../../../../env";

interface IHomePageProps {
    classes: any,
}

const HomePage = (props: IHomePageProps) => {
    const {classes} = props;

    const [scores, setScores] = React.useState([]);

    React.useEffect(() => {
        getScores(setScores); //Here we only update the current page because the random url should give us an actual name but a link can give us a redirect url
    }, []);

    return (
        <div className={classes.wwar_Page}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Leaderboard</TableCell>
                        <TableCell align="right">time</TableCell>
                        <TableCell align="right">date</TableCell>
                        <TableCell align="right">from</TableCell>
                        <TableCell align="right">to</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.map(score => (
                        <TableRow key={score.ID}>
                            <TableCell component="th" scope="row">{score.username}</TableCell>
                            <TableCell align="right">{formatTimer(score.endTime - score.startTime, true)}</TableCell>
                            <TableCell align="right">{new Date(score.endTime).toString()}</TableCell>
                            <TableCell align="right"><a href={`${wikipediaUrl}${score.startPage}`}>{score.startPage}</a></TableCell>
                            <TableCell align="right"><a href={`${wikipediaUrl}${score.goalPage}`}>{score.goalPage}</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default withStyles(styles)(HomePage);