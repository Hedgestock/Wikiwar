import * as React from "react"

import {withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";

interface INotFoundPageProps {
    classes:any,
}

const NotFoundPage = (props: INotFoundPageProps) => {
    const {classes} = props;
    return (
        <div className={classes.wwar_Page}>Error 404</div>
    );
};

export default  withStyles(styles)(NotFoundPage);