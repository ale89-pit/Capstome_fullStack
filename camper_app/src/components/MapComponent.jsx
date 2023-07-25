
import {
    MapContainer,
    TileLayer,
    useMap,

} from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'

import { useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'
import { useParams } from 'react-router-dom'

const MapComponent = ({ address, nameFacility }) => {
    const params = useParams();
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [loadCord, setLoadCord] = useState(false);
    console.log(address)
    console.log(params.id)
    const provincia = address.comune.provincename.name === "Verbania" ? "Verbano-Cusio-Ossola" : address.comune.provincename.name
    const API_GEOCODING_ADDRESS = `https://nominatim.openstreetmap.org/search?q=${address.streetNumber + ' ' + address.street + ' ' + address.comune.name + ' ' + provincia + ''}&format=json&polygon_geojson=1&addressdetails=1`



    const geocodingAddress = async () => {
        try {
            let responese = await fetch(API_GEOCODING_ADDRESS, {
                method: "POST",
                redirect: "follow"
            })
            if (responese.ok) {
                let data = await responese.json()
                console.log(data[0].lat)
                console.log(data[0].lon)

                setLat(data[0].lat)
                setLon(data[0].lon)
                if (data[0].lat !== null && data[0].lon !== null) {
                    setLoadCord(true)
                }
            }
        } catch (error) {

        }
    }

    const customIcon = new Icon({
        iconUrl: "https://img.icons8.com/?size=512&id=13800&format=png",
        iconSize: [30, 30],
    })

    useEffect(() => {

        geocodingAddress()

    }, [])
    useEffect(() => {
        geocodingAddress()

    }, [params.id, address])

    return (
        <>
            {loadCord && lat && lon && <MapContainer
                key={[lat, lon]}
                center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} icon={customIcon}>
                    <Popup>
                        {address.street + ' ' + address.streetNumber + ', ' + address.comune.name + ', ' + nameFacility}
                    </Popup>
                </Marker>
            </MapContainer>}
        </>
    )
}

export default MapComponent
