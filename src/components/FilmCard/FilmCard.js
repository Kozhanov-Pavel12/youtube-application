import './FilmCard.css'

function FilmCard(props) {
    return (
            <div className='card'>
                <iframe width="350" height="190" src={props.elem.snippet.thumbnails.medium.url} frameBorder="0"></iframe>
                <h5>{props.elem.snippet.title}</h5>
                <div>
                    <a href={`https://www.youtube.com/watch?v=${props.elem.id.videoId}`}>Смотреть видео</a>
                </div>
            </div>
    )
}

export default FilmCard;