import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import logo from './logo-nobg.png'
import * as React from 'react';


function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 10,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        // sx: trigger ? {margin: 'auto', width: '100%', marginTop: '10px'} : {},
        // position: trigger ? 'static' : 'fixed'
    });
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary.main, 0.75),
    '&:hover': {
      backgroundColor: alpha(theme.palette.secondary.main, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: '15px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.primary.main,
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const Header = ({ searchedCity, setSearchedCity }) => {
    // const [ searchedCity, setSearchedCity ] = React.useState('')

    return (
        <ElevationScroll>
            <AppBar>
                <Toolbar>
                    {/* <Icon> */}
                        <img height='40px' src={logo} alt='Logo' />
                    {/* </Icon> */}
                    <Typography variant="h6" component="div" marginLeft='10px' display={{ xs: 'none', sm: 'flex' }}>
                        Finland Weather App
                    </Typography>
                    <Box flexGrow={1}></Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search city…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchedCity}
                            onChange={e => setSearchedCity(e.target.value)}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}

export default Header