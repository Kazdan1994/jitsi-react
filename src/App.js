import React, {useState} from 'react'
import Jitsi from 'react-jitsi'
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {withSnackbar} from "notistack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export const App = ({enqueueSnackbar}) => {
    const classes = useStyles();
    const [roomName, setRoomName] = useState('Ma conversation')
    const [displayName, setDisplayName] = useState('Arthur')
    const [password, setPassword] = useState('password')
    const [onCall, setOnCall] = useState(false)

    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            {onCall
                ? (
                    <Jitsi
                        roomName={roomName}
                        displayName={displayName}
                        password={password}
                        loadingComponent={CircularProgress}
                        onAPILoad={JitsiMeetAPI => enqueueSnackbar('API loaded : ' + JitsiMeetAPI.toString())}
                    />)
                : (
                    <>
                        <h1>Créer une Visioconférence</h1>
                        <form noValidate>
                            <TextField label='Nom de la conversation'
                                       value={roomName}
                                       margin="normal"
                                       required
                                       fullWidth
                                       autoFocus
                                       onChange={e => setRoomName(e.target.value)} variant="outlined"/>
                            <TextField label='Votre nom'
                                       margin="normal"
                                       required
                                       fullWidth
                                       value={displayName}
                                       onChange={e => setDisplayName(e.target.value)} variant="outlined"/>
                            <TextField label='Votre mot de passe'
                                       type='password'
                                       margin="normal"
                                       required
                                       fullWidth
                                       value={password}
                                       onChange={e => setPassword(e.target.value)} variant="outlined"/>
                            <Button variant="contained"
                                    color="secondary"
                                    onClick={() => setOnCall(true)}> Let&apos;s start!</Button>
                        </form>
                    </>)}
        </div>
    </Container>
}

export default withSnackbar(App);
