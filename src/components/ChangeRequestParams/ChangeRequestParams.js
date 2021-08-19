import React from 'react'
import './ChangeRequestParams.css'
import Button from '../../components/UI/Button/Button'
import Select from '../UI/Select/Select'
import { useState } from 'react'

function ChangeRequestParams(props) {

    const [reqTitle, setReqTitle] = useState(props.title)
    const [request, setRequest] = useState('запрос')

    const cls = ['save-form']

    if(!props.isOpen) {
        cls.push('close')
    }

    function submitHandler(e) {
        e.preventDefault()
    }

    function clickHandler() {
        props.onClose()
    }

    function changeRequestTitle(event) {
        setReqTitle(event.target.value)
    }

    function changeRequest(event) {
        setRequest(event.target.value)
    }

    const select = <Select 
            label='Сортировать по'
            options={[
                {text: 'без сортировки', value: ''},
                {text: 'рейтингу', value: 'rating'},
                {text: 'алфавиту', value: 'title'},
                {text: 'количеству просмотров', value: 'viewCount'},
                {text: 'дате', value: 'date'}
            ]}
        />

    function saveRequestParams() {
        props.change(props.savedVideoAmount, reqTitle, request)
        props.onClose()
    }


    return (
            <div>
                <div>
                <form onSubmit={(e) => submitHandler(e)} className={cls.join(' ')}>

                <h3>Изменить параметры запроса</h3>

                        <div className='input'>
                            <label htmlFor="label">Запрос</label>
                            <input 
                                id="label" 
                                type="text"
                                value={request}
                                onChange={changeRequest}
                            />
                        </div>
                        
                        <div className='input'>
                            <label htmlFor="title">*Название</label>
                            <input 
                                id="title" 
                                type="text" 
                                placeholder='Укажите название' 
                                value={reqTitle}
                                onChange={changeRequestTitle}
                            />
                        </div>

                        { select }

                        <div className='range-input'>
                            <input 
                                type="range" 
                                min="0" 
                                max="50" 
                                value={props.videoAmount}
                                onChange={props.onChange}
                            />
                            <div>
                                {props.videoAmount}
                            </div>
                        </div>
                        

                        
                        <div className='save-buttons'>

                            <Button 
                                className='button primaryBtn no-save'
                                onClick={clickHandler} 
                            >
                                Не изменять
                            </Button>

                            <Button 
                                className='button primaryBtn' 
                                onClick={saveRequestParams}
                            >
                                Изменить
                            </Button>

                        </div>
                        

                    </form>
                </div>

            </div>
    )

}

export default ChangeRequestParams;