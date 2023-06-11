import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, {useState, useEffect} from "react";

function MainRadio () {
    const [stations, setStations] = useState();
    const [stationFilter, setStationFilter] = useState('all');

    useEffect(() => {
        setupApi(stationFilter).then(data => {
            setStations(data)
        });
    },[stationFilter]);

    const setupApi = async() => {
        const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');
        const stations = await api.searchStations({
            language: 'english',
            tag: 'all',
            limit: 1,
        });
        return stations;
    }
    console.log(stations);


    return (
        <div>
            {stations && stations.map((station, index) => {
                return (
                    <AudioPlayer
                        className="player"
                        src={station.urlResolved}
                        showJumpControls={false}
                        layout='stacked'
                        customProgressBarSection={[]}
                        customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                        autoPlayAfterSrcChange={false}
                    />
                )
            })}
        </div>
    )
}

export default MainRadio