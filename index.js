const express = require('express');

const expressSession = require('express-session');

const cors = require('cors');

const helmet = require('helmet');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const knex = require('knex')(require('./knexfile.js').development);

const app = express();
const PORT = process.env.PORT || 5050;

require('dotenv').config();

app.use(express.json());

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);


app.use(passport.initialize());

app.use(passport.session());


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (_accessToken, _refreshToken, profile, done) => {
      
      console.log('GitHub profile:', profile);

      knex('users')
        .select('id')
        .where({ github_id: profile.id })
        .then(user => {
          if (user.length) {
            done(null, user[0]);
          } else {
            knex('users')
              .insert({
                github_id: profile.id,
                avatar_url: profile._json.avatar_url,
                username: profile.username
              })
              .then(userId => {
                done(null, { id: userId[0] });
              })
              .catch(err => {
                console.log('Error creating a user', err);
              });
          }
        })
        .catch(err => {
          console.log('Error fetching a user', err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('serializeUser (user object):', user);


  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log('deserializeUser (user id):', userId);

  
  knex('users')
    .where({ id: userId })
    .then(user => {
     
      console.log('req.user:', user[0]);

      done(null, user[0]);
    })
    .catch(err => {
      console.log('Error finding user', err);
    });
});



const authRoutes = require('./routes/auth');
const playDeadRoutes = require('./routes/play_dead_comments');
const rollOverRoutes = require('./routes/roll_over_comments');
const shakeRoutes = require('./routes/shake_comments');
const spinRoutes = require('./routes/spin_comments');
const standRoutes = require('./routes/stand_comments');
const tricksRoutes = require('./routes/tricksRoute')

app.use('/auth', authRoutes);
app.use('/play-dead', playDeadRoutes);
app.use('/roll-over', rollOverRoutes);
app.use('/shake', shakeRoutes);
app.use('/spin', spinRoutes);
app.use('/stand', standRoutes);
app.use('/tricks', tricksRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});