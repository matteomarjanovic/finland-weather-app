import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import CityCard from "./CityCard"
import RenderIfVisible from "react-render-if-visible"

function containsSubstring(mainString, subString) {
    // Escape special characters in the substring
    const escapedSubString = subString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Create a regular expression with the escaped substring and 'i' flag for case insensitivity
    const regex = new RegExp(escapedSubString, 'i');
    // Test if the substring exists in the main string
    return regex.test(mainString);
}

const Body = ({ searchedCity }) => {
    const [ cities, setCities ] = useState([])

    async function getCities() {
        const cities = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/cities`,
            { method: 'GET' }
        ).then((response) => response.json())
        
        setCities(cities)
    }

    useEffect(() => {
        getCities()
    }, [])


    return (
        <Container>
            {cities.map((city, idx) => {
                if (containsSubstring(city.name, searchedCity)) {
                    return (
                        <RenderIfVisible key={idx} defaultHeight={100} visibleOffset={200} stayRendered={true} >
                            <CityCard cityName={city.name} />
                        </RenderIfVisible>
                    )
                } else { return null }
            })}
        </Container>
    )

}

export default Body