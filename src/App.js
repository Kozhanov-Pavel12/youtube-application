import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Auth from './containers/Authorization/Auth';
import Navigation from './components/Navigation/Navigation';
import Search from './containers/Search/Search';
import Favourites from './containers/Favourites/Favourites';
import Logout from './components/Logout/Logout';
import { connect } from 'react-redux';
import RepeatSearch from './components/RepeatSearch/RepeatSearch';
import axios from 'axios'
import { API_KEY } from './config'
import { autoLogin } from './store/actions/auth'

class App extends React.Component {

  state = {
    favorites: [],
    movies: [],
    newAmount: 0,
    newValue: '',
    newRequestAmount: 0,
    reqTitle: '',
    value: '',
  }

  componentDidMount() {
    this.props.autoLogin()
  }

  addToFavor = (e, newAmount, reqTitle, request) => {
    this.state.favorites.push(e)
    this.setState({newRequestAmount: newAmount})
    this.state.reqTitle = reqTitle
    this.state.value = request
    const i = this.state.favorites.indexOf(e)
    localStorage.setItem(this.state.favorites.indexOf(e), this.state.favorites[i])
  }

  change = (newAmount, reqTitle, request) => {
    this.setState({newRequestAmount: newAmount})
    this.state.reqTitle = reqTitle
    this.state.value = request
  }

  removeItem = index => {
    let newTaskList = [...this.state.favorites];
    newTaskList.splice(index, 1);
    this.setState({favorites: newTaskList})
    const a = this.state.favorites[index]
    localStorage.removeItem(a)
  }

  getVideosRepeat = (item, newRequestAmount) => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${newRequestAmount}&q=${item}&type=videos&key=${API_KEY}`).then(response => {
          const data = response.data.items
          const amount = response.data.pageInfo.resultsPerPage
          this.setState({movies: data})
          this.setState({newAmount: amount})
          this.setState({newValue: item})
    })
  }

  render() {
    
    let routes = (
      <Switch>
          <Route path='/' exact component={Auth}/>
          <Redirect to='/' />
        </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>

            <Route 
              path='/favourites'  
              render={() => 
                <Favourites 
                  list={this.state.favorites} 
                  getVideosRepeat={this.getVideosRepeat}
                  removeItem={this.removeItem}
                  newRequestAmount={this.state.newRequestAmount}
                  reqTitle={this.state.reqTitle}
                  value={this.state.value}
                  change={this.change}
                />}
            />

            <Route 
              path='/search' 
              render={() => <Search list={this.state.favorites} addToFavor={this.addToFavor} data={this.state.movies} amount={this.state.newAmount} newValue={this.state.newValue}/>}
            />
            <Route path='/logout' component={Logout}/>
            <Route path='/search' component={RepeatSearch}/>
            <Redirect to='/' />
            
        </Switch>
      )
    }

    

    return (
      <Layout>
        <Navigation/>
          {routes}
      </Layout>
    )
    
  }  
}

//определяем, авторизован пользователь или нет
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
