import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import { Container, Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-js'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
    clientId: '1aa4d54f09144ff598b474f7145975d2',
});
export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingShow, setPlayingShow] = useState()

    function chooseShow(show){
        spotifyApi.getShowEpisodes(show.id).then(res => {
        //TODO map promise to be able to return the show description
            if(res.items.length != 0){
                console.log(res.items[0].uri)
                show.uri = res.items[0].uri
                setPlayingShow(show)
                setSearch('')
            }
        })
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return
        let cancel = false
        spotifyApi.searchShows(search).then(res => {
            if(cancel) return
            setSearchResults(res.shows.items.map(show => {
                // console.log(show);
                const smallestAlbumImage = show.images.reduce((smallest,image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                }, show.images[0])
                return{
                  description: show.description,
                  id: show.id,
                  name: show.name,
                  uri: show.uri,
                  albumURL: smallestAlbumImage.url
                }
            }))
        })
        console.log(searchResults)
        // spotifyApi.searchTracks(search).then(res => {
        //     if(cancel) return
        //     setSearchResults(res.tracks.items.map(track => {
        //         const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
        //             if(image.height < smallest.height) return image
        //             return smallest
        //         }, track.album.images[0])
        //         return{
        //           artist: track.artists[0].name,
        //           title: track.name,
        //           uri: track.uri,
        //           albumURL: smallestAlbumImage.url
        //         }
        //     }))
        // })
        return () => cancel = true
    }, [search, accessToken])
    return <Container className="d-flex flex-column py-2" style={{height: '100vh'}}>
        <Form.Control 
        type="search" 
        placeholder="Search Podcasts" 
        value={search} 
        onChange={e => setSearch(e.target.value)} />
        <div className="flex-grow-1 my-2" style={{overflowY: 'auto'}}>
            {searchResults.map(show => (
                <TrackSearchResult show={show} key={show.uri} chooseShow={chooseShow}/>
            ))}
        </div>
        <div><Player accessToken={accessToken} showUri={playingShow?.uri}/>
        </div>
        </Container>

}
