import { Toolbar } from '@mui/material';
import './App.css';
import * as React from 'react';
import Header from './Header';
import Body from './Body';
import { useTheme } from '@emotion/react';


function App() {
    const [ searchedCity, setSearchedCity ] = React.useState('')
    const theme = useTheme()

    return (
        <div className="App" style={{backgroundColor: theme.palette.secondary.main}}>
            <Header searchedCity={searchedCity} setSearchedCity={setSearchedCity} />
            <Toolbar />
            <Body searchedCity={searchedCity} />
            <Toolbar sx={{height: '80vh'}} />
        </div>
    );
}

export default App;
