import './Favourites.css'
import React from 'react'
import { useState } from 'react'
import List from '../../components/List/List'
import ChangeRequestParams from '../../components/ChangeRequestParams/ChangeRequestParams'

function Favourites(props) {

    const [isOpen, setIsOpen] = useState(false)
    const [videoAmount, setVideoAmount] = useState(25)
    const [title, setTitle] = useState(props.reqTitle)

    function get(element) {
        return props.getVideosRepeat(element, videoAmount)
    }

    function changeOpenBehavior() {
        setIsOpen(() => {
            return {
                isOpen: !isOpen
            }
        })
    }

    function formCloseHandler() {
        setIsOpen((prevState) => (
            prevState = false
        ))
    }

    function handleVideoAmount(event) {
        setVideoAmount((prevVideoAmount) => (
            prevVideoAmount = event.target.value
        ))
    }

    return (
        <div className='favourites'>
            <div className="wrap">

                <ChangeRequestParams
                    isOpen={isOpen}
                    onClose={formCloseHandler}
                    videoAmount={videoAmount}
                    onChange={handleVideoAmount}
                    title={title}
                    change={props.change}
                />

                <h1>Избранное</h1>
                <ul className='favor-list'>
                    { 
                        <List 
                            list={props.list} 
                            removeItem={ props.removeItem} 
                            get={get}
                            changeOpenBehavior={changeOpenBehavior}
                            reqTitle={props.reqTitle}
                            value={props.value}
                        />
                    }
                </ul>
            </div>
        </div>
    )
}

export default Favourites;