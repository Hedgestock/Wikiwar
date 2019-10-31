import * as React from "react"

import {Button, withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";
import {connect} from "react-redux";
import {startTimer, stopTimer} from "../../../redux/action/timer";
import Timer from "./timer";

interface IWikiwarPageProps {
    timer: any, // FIXME
    dispatch: any,
    classes: any,
}

const WikiwarPage = (props: IWikiwarPageProps) => {

    const {classes, dispatch} = props;

    return (
        <div className={classes.wwar_Page}>
            <Timer></Timer>
        </div>
    );
};


function mapStateToProps(state: any) {
    return {
        timer: state.timer,
    };
}

const ConnectedWikiwarPage = connect(mapStateToProps)(WikiwarPage);

export default withStyles(styles)(ConnectedWikiwarPage);