import * as React from "react";

import {Typography, withStyles} from "@material-ui/core";

import {styles} from "../../../../static/wikiwar-style";

interface ITimerProps {
    classes: any,
}

const Timer = React.forwardRef((props: ITimerProps, ref) => {
        const {classes} = props;

        const formatTimer = (time: number, full = false): string => {
            let s = Math.floor(time / 1000);
            let m = Math.floor(s / 60);
            let h = Math.floor(m / 60);

            return (full ?
                    `${`0${(h % 60)}`.slice(-2)}:${`0${(m % 60)}`.slice(-2)}:${`0${(s % 60)}`.slice(-2)}:${(time % 1000)}`
                    :
                    `${`0${(h % 60)}`.slice(-2)}:${`0${(m % 60)}`.slice(-2)}:${`0${(s % 60)}`.slice(-2)}`
            );
        };

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