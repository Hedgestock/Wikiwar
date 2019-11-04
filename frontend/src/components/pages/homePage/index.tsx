import * as React from "react"

import {Table, TableBody, TableCell, TableHead, TableRow, withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";

interface IScore {
    startTime: number,
    endTime: number,
    startPage: string,
    goalPage: string,
    graph: string[],
    ID: string,
}
interface IHomePageProps {
    classes: any,
}

const HomePage = (props: IHomePageProps) => {
    const {classes} = props;

    let scores: IScore[] = [{"startTime":1572865542174,"endTime":1572865583304,"graph":["Newton_House_Museum","Historic_house_museum","International_Council_of_Museums","Health_Research_Board"],startPage:"Newton_House_Museum","goalPage":"Health_Research_Board","ID":"Zokodm_5sD24g-rASGBWzV8SpesKO4ZL"},{startPage:"Sidney_Sussex_College","startTime":1572865542174,"endTime":1572865583304,"graph":["Sidney_Sussex_College,_Cambridge","University_of_Cambridge","Cambridge","Cambridge,_Massachusetts","United_States","1896_in_the_United_States"],"goalPage":"1896_in_the_United_States","ID":"Zokodm_5sD24g-rASGBWzV8SpesKO4ZL"}];
    return (
        <div className={classes.wwar_Page}>Home page
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Leaderboard</TableCell>
                        <TableCell align="right">start</TableCell>
                        <TableCell align="right">end</TableCell>
                        <TableCell align="right">graph</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scores.map(score => (
                        <TableRow key={score.ID}>
                            <TableCell component="th" scope="row">
                                {score.ID}
                            </TableCell>
                            <TableCell align="right">{score.startTime}</TableCell>
                            <TableCell align="right">{score.endTime}</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default withStyles(styles)(HomePage);