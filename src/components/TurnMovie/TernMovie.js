import TernMovieItem from "../TernMovieItem/TernMovieItem";
import './TernMovie.css'

function TernMovie({data = []}) {
    return (
        <div>
            <div className='video-list'>
                {
                    data.map((elem, index) => {
                        return <TernMovieItem key={index} elem={elem} />
                    })   
                }
            </div>
        </div>
    )
}

export default TernMovie;