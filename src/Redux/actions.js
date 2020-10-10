



export const initialData = () => async(dispatch) => {
    const firstRes = await fetch('https://ipapi.co/json/');
    const firstData = await firstRes.json()
   
    dispatch({
        type: 'CURRENT_LOCATION',
        payload: firstData
    })

    const secRes = await fetch('https://api.covid19api.com/countries')
    const secData = await secRes.json()
    const countries = {}
    
    secData.forEach( country => {
        const newCountry = countries[country.ISO2] = {}
        newCountry['Slug'] = country.ISO2
        newCountry['Name'] = country.Country
    })

    dispatch({
        type: 'ADD_COUNTRIES',
        payload: countries
    })
    
    const queryObj = firstData.country
    // get virus stats for a country
    dispatch(getVirusData(queryObj))
    // get virus stats for the globe
    dispatch(getGlobal())
}

export const getVirusData = (info) => async(dispatch) => {

    
    const todayRes = await fetch(`https://corona.lmao.ninja/v2/countries/${info}?yesterday=false&strict=true&query`)
    const todayData = await todayRes.json()

    if ('message' in todayData) {
        return 
    }
   
    const todayObj = {
        cases: todayData.cases,
        deaths: todayData.deaths,
        todayCases: todayData.todayCases,
        todayDeaths: todayData.todayDeaths,
        population: todayData.population,
        casesPerOneMillion: todayData.casesPerOneMillion,
        deathsPerOneMillion: todayData.deathsPerOneMillion
    }

   dispatch({
        type: 'LOCATION_TODAY_VIRUS',
        payload: todayObj
    })

    const yestRes = await fetch(`https://corona.lmao.ninja/v2/countries/${info}?yesterday=true&strict=true&query`)
    const yestData = await yestRes.json()

    const yestObj = {
        cases: yestData.cases,
        deaths: yestData.deaths,
        todayCases: yestData.todayCases,
        todayDeaths: yestData.todayDeaths,
        casesPerOneMillion: todayData.casesPerOneMillion,
        deathsPerOneMillion: todayData.deathsPerOneMillion
    }

    dispatch({
        type: 'LOCATION_YEST_VIRUS',
        payload: yestObj
    }) 

    const finalObj = {
        country: info,
        virusToday: todayObj,
        virusYes: yestObj
    }

    dispatch({
        type: 'UPDATE_COUNTRY',
        payload: finalObj
    })


}

export const findCountry = ({lat, lng}) => async (dispatch) => {
    // function to only have 6 spots past decimal poing
    const updateLatLng = (ltLngNum) => {
        const numStr = ltLngNum.toString()
        const dotIndx = numStr.indexOf('.')
        const finalStr = numStr.slice(0,dotIndx+7)
        const finalFlt = parseFloat(finalStr)
        return finalFlt
    }
    const geoRes = await fetch(`/geocode/?lat=${updateLatLng(lat)}&long=${updateLatLng(lng)}`)
    const resData = await geoRes.json()
    
    // if a body of water break
    if (resData.results[0].components["_type"] === "body_of_water") {
        return
    }
    console.log(resData)
    const isoCountry = resData.results[0].components['ISO_3166-1_alpha-2']
    const name = resData.results[0].components.country

    const payload = {
        country_code: isoCountry,
        country_name: name,
        latitude: updateLatLng(lat),
        longitude: updateLatLng(lng)
    }

    // update current location with new lat/lon/coutnry
    dispatch({
        type: 'CURRENT_LOCATION',
        payload: payload
    })
    // get country stats
    dispatch(getVirusData(isoCountry))
}

const getGlobal = () => async(dispatch) => {
    
    const globalRes = await fetch(`https://corona.lmao.ninja/v2/all?yesterday`)
    const globalData = await globalRes.json()
    
    const globalObj = {
        cases: globalData.cases,
        casesPerMill: globalData.casesPerOneMillion,
        deathsPerMill: globalData.deathsPerOneMillion,
    }

   dispatch({
        type: 'GLOBAL_STATS',
        payload: globalObj
    })
}

