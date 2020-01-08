import React from 'react';
import CreateForm from './CreateForm';
import ReviewPage from '../components/ReviewPage';
import Catalogue from './Catalogue';
import AuthForm from './AuthForm';
import Profile from '../components/Profile';
import withAuth from '../hocs/withAuth';
import {authUser} from '../store/actions/auth';
import {Switch, Route, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import AllReviews from './AllReviews';


const Main = props => {
  const {errors, removeError, authUser, currentUser} = props;
    return (
      <div className="container">
        <Switch>
          <Route exact path='/' render={props => <Catalogue
          errors={errors}
          removeError={removeError}
          currentUser={currentUser}
          {...props}/>}
          />
          <Route exact path='/allreviews' render={props => <AllReviews {...props}/>}/>
          <Route path="/users/:id/reviews/new" component={withAuth(CreateForm)}/>
          <Route exact path='/signin' render={props => {
            return(
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText='Log in'
                heading='Welcome Back.'
                {...props}
              />
            );
          }}
          />
          <Route exact path='/signup' render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText='Sign up'
                heading='Movie reviews. All of them.'
                {...props}
              />
            );
          }}
          />
          <Route exact path='/user/:id' render={props => <Profile {...props}/>}/>
          <Route exact path='/users/:id/reviews/:id' render={props => <ReviewPage
            removeError={removeError}
            errors={errors} {...props}/>}
          />
          <Route path='/users/:id/reviews/:id/edit' render={props => <CreateForm Edit {...props}/>}/>
        </Switch>
      </div>
    );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}
  
export default withRouter(
    connect(mapStateToProps, {authUser, removeError })(Main)
  );;