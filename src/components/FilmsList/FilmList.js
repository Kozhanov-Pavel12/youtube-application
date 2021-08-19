import './FilmList.css'
import FilmCard from '../FilmCard/FilmCard'

function FilmList({data = []}) {
    return (
        <div>
            <div className='video-section'>
                {
                    data.map((elem, index) => {
                        return <FilmCard key={index} elem={elem} />
                    })   
                }
            </div>
        </div>
        
    )
}

export default FilmList;