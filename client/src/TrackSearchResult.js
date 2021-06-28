import React from 'react'

export default function Tracksearchresult({show, chooseShow}) {
    function handlePlay(){
        chooseShow(show)
    }
    // console.log(show.uri)
    return (
        <div className="d-flex m-2 align-items-center" 
        style={{cursor: 'pointer'}}
        onClick={handlePlay}>
            <img src={show.albumURL} style={{height: '64px', width: '64px'}} />
            <div className="m1-3">
                <div>{show.name}</div>
                <div className="text-muted">{show.description}</div>
            </div>
        </div>
    )
}
