import * as React from "react"
import {Button, Input, Modal, withStyles} from "@material-ui/core";
import {styles} from "../../../../static/wikiwar-style";

interface IStartModalProps {
    startGame: (username: string) => void,
    classes: any,
}

const StartModal = (props: IStartModalProps) => {
    const {classes, startGame} = props;

    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState("");

    return (<>
            <Button onClick={() => setOpen(true)}>Start</Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={classes.wwar_startModal}>
                    <Input type="text" value={username} placeholder="Username"
                           onChange={(e) => setUsername(e.target.value)}/>
                    <Button onClick={() => {
                        setOpen(false);
                        startGame(username);
                    }}>Start</Button>
                </div>

            </Modal>

        </>
    );
};

export default withStyles(styles)(StartModal);