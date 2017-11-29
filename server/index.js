require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')


const app = express()

// Middleware

app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}) )
app.use( passport.initialize() )
app.use( passport.session() )

passport.use( new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function( accessToken, refreshToken, extraParams, profile, done ) {
    
    done( null, profile )
}) )

passport.serializeUser( function( profile, done ) {
    done( null, profile )
} )
passport.deserializeUser( function( profile, done ) {
    done( null, profile )
} )

// Endpoints

app.get( '/auth', passport.authenticate( 'auth0' ) )
app.get( '/auth/callback', passport.authenticate( 'auth0', {
    successRedirect: 'http://localhost:3000', // <-- this is where they will get redirected after succesfull login
    failureRedirect: '/auth'
}))






app.listen( process.env.SERVER_PORT, () => {
    console.log(`Listening on port: ${process.env.SERVER_PORT}`);
} )