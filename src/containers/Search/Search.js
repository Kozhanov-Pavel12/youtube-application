import React from 'react'
import Input from '../../components/UI/Input/Input'
import './Search.css'
import axios from 'axios'
import { API_KEY } from '../../config'
import FilmList from '../../components/FilmsList/FilmList'
import Clarification from '../../components/Clarification/Clarification'
import TernMovie from '../../components/TurnMovie/TernMovie'
import 'boxicons';
import SaveRequestForm from '../../components/SaveRequestForm/SaveRequestForm'

class Search extends React.Component {

    state = {
        isIconClicked: true,
        films: [],
        amount: 0,
        value: this.props.value,
        placeholder: 'Что хотите посмотреть?',
        saveRequest: false,
        savedVideoAmount: 25,
        newRequest: this.props.data,
        newAmount: this.props.amount,
        newValue: this.props.newValue,
        disapled: true,
    }

    submitForm(e){
        e.preventDefault()
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    getVideos = async () => {
        await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${this.state.value || 'cat'}&type=videos&key=${API_KEY}`).then(response => {
            const data = response.data.items
            const amount = response.data.pageInfo.resultsPerPage
            this.setState({films: data})
            this.setState({amount: amount})
            this.setState({
                newRequest: '',
                newAmount: 0,
                newValue: ''
            })
        })
    }

    formCloseHandler = () => {
        this.setState({ saveRequest: false })
    }

    handleChangeSavedVideo = event => {
        this.setState({savedVideoAmount: event.target.value});
    }

    render() {

        return (
            <div className='search-container'>

                <SaveRequestForm 
                    isOpen={this.state.saveRequest}
                    onClose={this.formCloseHandler}
                    request={this.state.value}
                    savedVideoAmount={this.state.savedVideoAmount}
                    onChange={this.handleChangeSavedVideo}
                    list={this.props.list}
                    addToFavor={this.props.addToFavor}
                    getVideos={this.getVideos}
                    disapled={this.state.disapled}
                />

                <div className="wrap">
                    <h1>Поиск видео</h1>
                <form className='search-box' onSubmit={e => this.submitForm(e)}>
                    <Input 
                        type={'search'} 
                        className='search'
                        placeholder={this.state.placeholder}
                        valid={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                    />

                    <i 
                        className='bx bx-heart btn-heart' 
                        onClick={() => this.setState({ saveRequest: !this.state.saveRequest })}
                    >   
                    </i>

                    <button 
                        className='button primaryBtn searchBtn' 
                        onClick={this.getVideos}
                    >
                        Найти
                    </button>
                </form>

                    <div className='add-elements'>
                        {
                            this.state.films.length && this.state.value.length
                            || this.state.newRequest.length
                            ? <Clarification text={this.state.value || this.state.newValue} amount={this.state.amount || this.state.newAmount}/> 
                            : null
                        }

                        {
                            this.state.films.length && this.state.value.length 
                            || this.state.newRequest.length
                            ?   <div className='icons'>
                                    <i className='bx bx-qr btn' onClick={() => this.setState({isIconClicked: true})}> </i>
                                    <i className='bx bx-menu btn' onClick={() => this.setState({isIconClicked: false})}> </i>
                                </div>
                            : null
                        }
                    </div>

                    {
                        this.state.isIconClicked
                        ? <FilmList data={
                            this.state.newRequest.length ? this.state.newRequest : this.state.films
                        }/>
                        :<TernMovie data={
                            this.state.newRequest.length ? this.state.newRequest : this.state.films
                        }/>
                    }
                

                </div>
                
                
            </div>
    )
}

}

export default Search;