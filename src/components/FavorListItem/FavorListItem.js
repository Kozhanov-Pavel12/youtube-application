import './FavorListItem.css'

function FavorListItem(props) {
    return (
        <div className='elem'>
            <div>
                <span style={{fontWeight: 'bold'}}>Запрос:</span> {
                    props.value == undefined
                    ? props.item
                    : props.value
                }
            </div>

            <li>
                {props.reqTitle}
            <div>

                <button onClick={() => props.get(
                    props.value == undefined
                    ? props.item
                    : props.value
                )} className='link repeat'>
                    Повторить
                </button>

                <button className='link change' onClick={props.changeOpenBehavior}>
                    Изменить
                </button>

                <button onClick={() => props.removeItem(props.index)} className='link delete'>
                    Удалить
                </button>
            </div>
        </li>
        </div>
        
    )
}

export default FavorListItem;