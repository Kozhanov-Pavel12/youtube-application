import React from 'react'
import './SaveRequestForm.css'
import Button from '../../components/UI/Button/Button'
import Select from '../UI/Select/Select'
import { useState } from 'react'

function SaveRequestForm(props) {

    const [reqTitle, setReqTitle] = useState('')

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
        props.addToFavor(props.request, props.savedVideoAmount, reqTitle)
        props.onClose()
    }


    function changeRequestTitle(event) {
        setReqTitle(event.target.value)
    }


    return (
            <div>
                <div>
                <form onSubmit={(e) => submitHandler(e)} className={cls.join(' ')}>

                <h3>Сохранить запрос</h3>

                        <div className='input'>
                            <label htmlFor="label">Запрос</label>
                            <input 
                                id="label" 
                                type="text" 
                                value={props.request} 
                                disabled={props.disapled} 
                                readOnly
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
                                autoComplete='off'
                                />
                        </div>

                        { select }

                        <div className='range-input'>
                            <input 
                                type="range" 
                                min="0" 
                                max="50" 
                                value={props.savedVideoAmount}
                                onChange={props.onChange}
                                disabled={props.disapled}
                            />
                            <div>
                                {props.savedVideoAmount}
                            </div>
                        </div>
                        

                        
                        <div className='save-buttons'>

                            <Button 
                                className='button primaryBtn no-save'
                                onClick={clickHandler} 
                            >
                                Не сохранять
                            </Button>

                            <Button 
                                className='button primaryBtn' 
                                onClick={saveRequestParams}
                            >
                                Сохранить
                            </Button>

                        </div>
                        

                    </form>
                </div>

            </div>
    )

}

export default SaveRequestForm;