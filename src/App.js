import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Box, Grid, Container, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import GoogleMapReact from 'google-map-react';

import Emoji from './Components/emoji';
import EmojiRange from './Components/emojiRange';
import Table from './table';

import {initialData} from './Redux/actions';
import {findCountry} from './Redux/actions';


import './App.css';

function App() {
  
  const currentCountry = useSelector(state => state.currentLocation)
  const worldData =  useSelector(state => state.globalStats)
  const dispatch = useDispatch()
  const {name, lat, long, virusYes} = currentCountry

  useEffect(() => {
    dispatch(initialData())
  }, [])

  const getMapChange = ({lat, lng }) => {
    dispatch(findCountry({lat, lng}))
  }

 const prevVirusRef = useRef();
  useEffect(() => {
    prevVirusRef.current = virusYes;
  });

 const prevVirusYes = prevVirusRef.current;

 const theme = useTheme();
 const xsMatch = useMediaQuery(theme.breakpoints.up('xs'))
 const smMatch = useMediaQuery(theme.breakpoints.down('sm'))
 const pWidth = smMatch ? xsMatch ? 350 : 300 : 500
 const comWidth = smMatch ? xsMatch ? 350 : 250 : 400
 
 return (
    
   <Container >
      <Box mt={3} borderColor="primary.main" >
        <Typography variant='h2' align='center'>Coronavirus Emoji Score</Typography>
        <Typography variant='body1' align='center' color="textSecondary">Click on a Country, get the Emoji Score</Typography>
      </Box>
      <Box mt={2} mb={5} >
        <Grid 
          container
          direction="row"
          justify="space-around"
          my={2}
          >
          {(typeof lat == 'number') ? 
            <Box width={600} height={550} boxShadow={3} mb={2} >
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_MAP }}
                  defaultCenter={{lat: lat, lng: long }}
                  defaultZoom={4} 
                  onClick = {getMapChange}
                >
                  { prevVirusYes !== virusYes ?
                    < Emoji 
                      size={35}
                      country ={currentCountry}
                      world = {worldData}
                      lat={lat}
                      lng={long}
                    />
                    :
                    null
                  }     
                </GoogleMapReact>
            </Box>
            :
            null  
          } 
          <Box width={pWidth} display="flex" flexDirection = "column" alignItems="center">
            <Box >
              <Typography variant='h4' align='center'>{name}</Typography>
            </Box>
            <Box mt={1} mb={4}>
              { prevVirusYes !== virusYes ?
                < EmojiRange 
                  width={comWidth}
                  country= {currentCountry}
                  world = {worldData}
                />
                :
                null
              }
            </Box>
            <Box align="center" mt={0.5} width={"auto"} mb={4}>
              <Table width={comWidth}/>
            </Box>
          </Box>   
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
