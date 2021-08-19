import './TernMovieItem.css'

function TernMovieItem(props) {
    return (
        <div className='cardItem'>
            <iframe width="350" height="190" src={props.elem.snippet.thumbnails.medium.url} frameBorder="0"></iframe>
            <div>
                <h4>{props.elem.snippet.title}</h4>
                {/* <p>{props.elem.snippet.description}</p> */}
                <div>
                    <a href={`https://www.youtube.com/watch?v=${props.elem.id.videoId}`}>Смотреть видео</a>
                </div>
            </div>
        </div>
    )
}

export default TernMovieItem;