import React, {Component} from 'react';
import{ Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/auth';

class Navbar extends Component{
    logout = e =>{
        e.preventDefault();
        this.props.logout();
    }
    render(){
        return(
            <div className='nav-navbar'>
                <div>
                    <Link to='/' className='nav-title'><i className='fas fa-film '></i> <span className='nav-text-mobile'>The Movie App</span><span className='nav-logo-mobile'>TMA</span></Link>
                </div>
                {this.props.currentUser.isAuthenticated ? (
                    <div>
                        <Link to={`/user/${this.props.currentUser.user.id}`} className='nav-userButton'><i className="far fa-user"></i> <span className='nav-text-mobile'>Profile</span></Link>
                        <Link to={`/users/${this.props.currentUser.user.id}/reviews/new`} className='nav-button'><span className='nav-text-mobile'>Create Review</span> <i className="fas fa-plus"></i></Link>
                        <button className='nav-logout' onClick={this.logout}><i className="fas fa-sign-out-alt"></i></button>
                    </div>
                ): (
                    <div>
                        <Link to='/signup' className='nav-text'>Sign up</Link>
                        <Link to='/signin' className='nav-text nav-login'>Log in</Link>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {logout})(Navbar);