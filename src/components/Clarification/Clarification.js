import './Clarification.css'

function Clarification(props) {
    return (
        <div className='clarification'>
            <h4>Видео по запросу "{props.text}"</h4>
            <span>Найдено {props.amount}</span>
        </div>
        
    )
}

export default Clarification;