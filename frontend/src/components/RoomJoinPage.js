import React, {Component} from 'react'
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Link} from "react-router-dom";
export default class RoomJoinPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: "",
        };
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleJoinButtonPressed = this.handleJoinButtonPressed.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value,
        })
    }

    render() {
        return <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component={"h4"} variant={"h4"}>
                    Join a room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        error={this.state.error!=""}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.handleTextFieldChange}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color={"primary"} variant={"contained"} onClick={this.handleJoinButtonPressed}>
                    Join a Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color={"secondary"} variant={"contained"} to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    }

    handleJoinButtonPressed(e) {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode,
            }),
        };
        fetch("/api/join-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.props.history.push(`/room/${this.state.roomCode}`);
                } else {
                    this.setState({error: "Room not found."});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}