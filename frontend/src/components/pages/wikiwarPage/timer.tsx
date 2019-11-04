import * as React from "react";

import {Typography, withStyles} from "@material-ui/core";

import {styles} from "../../../../static/wikiwar-style";
import {formatTimer} from "../../../helpers";

interface ITimerProps {
    classes: any,
}

const Timer = React.forwardRef((props: ITimerProps, ref) => {

        const [time, setTime] = React.useState(formatTimer(0));
        const [startTime, setStartTime] = React.useState(0);
        const [interval, setTimerInterval] = React.useState(-1);

        React.useImperativeHandle(ref, () => ({
            start(): void {
                if (interval >= 0) {
                    clearInterval(interval);
                }
                const now = new Date().getTime();
                setStartTime(now);
                setTimerInterval(window.setInterval(() => setTime(formatTimer(new Date().getTime() - now)), 1));
            },
            stop(): void {
                if (interval >= 0) {
                    clearInterval(interval);
                }
                setTime(formatTimer(new Date().getTime() - startTime, true));
            }
        }));

        return (
            <Typography>{time}</Typography>
        );
    })
;


export default withStyles(styles)(Timer);