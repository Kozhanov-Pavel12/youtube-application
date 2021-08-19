import './List.css'
import FavorListItem from '../FavorListItem/FavorListItem';


function List(props) {

    return (
        <div>
            {
                props.list.map((item, index) => (
                    localStorage.getItem(index)
                    ? <FavorListItem 
                        key={index}
                        index={index} 
                        item={item || localStorage.getItem(index)} 
                        removeItem={props.removeItem} 
                        get={props.get}
                        changeOpenBehavior={props.changeOpenBehavior}
                        reqTitle={props.reqTitle}
                        value={props.value}
                        />
                    : null
                ))
            }
        </div>
    )
}

export default List;