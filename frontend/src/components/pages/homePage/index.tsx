import * as React from "react"

import {withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";

interface IHomePageProps {
    classes:any,
}

const HomePage = (props: IHomePageProps) => {
    const {classes} = props;
    return (
        <div className={classes.wwar_Page}>Home page</div>
    );
};

export default  withStyles(styles)(HomePage);