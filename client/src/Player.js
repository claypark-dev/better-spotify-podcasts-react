import React, { useState,useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';


export default function Player({accessToken,showUri}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [showUri])
    console.log('this is in player' + showUri)
    if(!accessToken) return null
    return (
        <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        callback={state => {
            if (!state.isPlaying) setPlay(false)
        }}
        uris={showUri ? [showUri] : []}
        play={play}
        />
    )
}
