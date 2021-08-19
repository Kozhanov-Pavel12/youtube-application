import React from 'react'
import './Navigation.css'
import logo from '../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends React.Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                        to={link.to} 
                        exact={link.exact} 
                        activeClassName='active'
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const links = [
            {to: '/', label: 'Авторизация', exact: true}
        ]

        if(this.props.isAuthenticated) {
            links.pop({to: '/', label: 'Авторизация', exact: true})
            links.push({to: '/search', label: 'Поиск', exact: false})
            links.push({to: '/favourites', label: 'Избранное', exact: false})
            links.push({to: '/logout', label: 'Выйти', exact: false})
        }

        return (
            <React.Fragment>

                <nav className='navigation'>
                    <div className="wrap">
                        <ul>

                            <img src={logo} alt={'logo'}/>

                            {
                                this.renderLinks(links)
                            }

                        </ul>
                    </div>
                    
                </nav>

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Navigation);