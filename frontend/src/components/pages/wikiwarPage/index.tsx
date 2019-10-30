import * as React from "react"

import {withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";

interface IWikiwarPageProps {
    classes:any,
}

const WikiwarPage = (props: IWikiwarPageProps) => {
    const {classes} = props;
    return (
        <div className={classes.wwar_Page}>Wikiwar Page</div>
    );
};

export default  withStyles(styles)(WikiwarPage);