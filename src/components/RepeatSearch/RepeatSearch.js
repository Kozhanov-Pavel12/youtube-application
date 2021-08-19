import React from 'react'
import { Redirect } from 'react-router-dom'

class RepeatSearch extends React.Component {

    render() {
        return (
            <Redirect to={'/search'} />
        )
    }
}


export default RepeatSearch;