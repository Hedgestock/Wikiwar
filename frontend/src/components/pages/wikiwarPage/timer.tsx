import * as React from "react";
import {connect} from "react-redux";
import {Button, withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";
import {startTimer, stopTimer} from "../../../redux/action/timer";

interface ITimerProps {
    timer: any, // FIXME
    dispatch: any,
    classes: any,
}

const Timer = (props: ITimerProps) => {
    const {classes, dispatch, timer} = props;

    const formatTimer = (time: number): string => {
        let s = Math.floor(time / 1000);
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);

        return `${`0${(h % 60)}`.slice(-2)}:${`0${(m % 60)}`.slice(-2)}:${`0${(s % 60)}`.slice(-2)}:${(time % 1000)}`;
    };

    const [time, setTime] = React.useState(formatTimer(0));

    const handleStart = (): void => {
        const now = new Date().getTime();
        dispatch(startTimer(now, window.setInterval(()=> setTime(formatTimer(new Date().getTime() - now)))), 100);
    };

    return (
        <>
            <div>{timer.startTime}</div>
            <div>{timer.stopTime}</div>
            <div>{timer.stopTime - timer.startTime}</div>
            <div>{time}</div>
            <div>interval : {timer.interval}</div>

            <Button onClick={handleStart}> Start </ Button>
            <Button onClick={() => dispatch(stopTimer(new Date().getTime()))}> Stop </ Button>
        </>
    );
};

function mapStateToProps(state: any) {
    return {
        timer: state.timer,
    };
}

const ConnectedTimer = connect(mapStateToProps)(Timer);

export default withStyles(styles)(ConnectedTimer);