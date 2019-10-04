import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import CardMedia from '@material-ui/core/CardMedia';

import { getIMDBTitleInfo, getIMDBRatings } from './imdb.js';
import { getTheMovieDBImageURL, getArtworkFromTheMovieDB, getCreditsFromTheMovieDB } from './themoviedb.js';

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "95%",
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  listMain: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  title: {
    textAlign: "center",
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },

  card: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
    height: 300
  },
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50,
  },
});

class MovieDetails extends Component {
    constructor() {
      super();
      this.state = {
        id:"",

        // FROM IMDB TITLE INFO
        originalTitle: getIMDBTitleInfo,
        primaryTitle:"Helllo ",
        runtimeMinutes: "Todo ",
        tconst: "",
        genres: "Todo ",
        titleType: "Todo ",
        endYear: "Todo ",
        startYear: "Todo ",

        // FROM IMDB RATINGS INFO
        averageRating: getIMDBRatings,
        numVotes:"Todo ",

        // FROM THEMOVIEDB DATA
        overview:"Todo ",
        poster:"https://via.placeholder.com/200x300",
        artWorkId: "",
        artWorkObject:[],
        cast:[{name:"Todo ", character:"Todo", profilePic:"https://via.placeholder.com/100x100"}],
        crew:[],
      }
    }

    render() {
      // The movie ID and tconst are passed as part of the URL, so they are stored in this.props.match.params
      const id = this.props.match.params.id;
      const classes = this.props.classes;
      if (!id) {
        return <div>Sorry, but the Movie was not found</div>
      }
      return (
        <div>
        <AppBar position="static">
            <Typography className={classes.title} variant="h5" color="inherit" noWrap>
              Movies Search
            </Typography>
        </AppBar>
        <main className={classes.main}>
          <CssBaseline />
          <Card className={classes.card}>
            <CardMedia
              component="img"
              className={classes.cover}
              image={this.state.poster}
              title={this.state.primaryTitle}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h4" variant="h4">
                  {this.state.primaryTitle}  ({this.state.startYear})
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Genre(s): {this.state.genres}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Type: {this.state.titleType}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Ratings: {this.state.averageRating} ({this.state.numVotes})
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Runtime : {this.state.runtimeMinutes} Minutes
                </Typography>
                <Typography component="p">
                  {this.state.overview}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to='/'><Button size="small">Back</Button></Link>
              </CardActions>
            </div>
          </Card>
        </main>

        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h5" variant="h5">
                    Cast Member(s)
            </Typography>
            <List className={classes.list}>
              {this.state.cast.map((castMember) => {
                const profilePic = castMember.profile_path ? getTheMovieDBImageURL(castMember.profile_path) : castMember.profilePic;
                return (
                  <ListItem>
                    <Avatar alt={castMember.name} src={profilePic} className={classes.bigAvatar}>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText primary={castMember.name} secondary={castMember.character} />
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </main>
      </div>
      );
    }

    componentDidMount() {
      // The movie ID and tconst are passed as part of the URL, so they are stored in this.props.match.params
      const {id, tconst} = this.props.match.params;
      this.setState({
        id: id,
        tconst: tconst
      });
      getIMDBTitleInfo(id, (titleInfo) => {
        this.setState({

          originalTitle: titleInfo.originalTitle,
          /* Todo2: like the line above, update the other movie
             attributes listed under the // FROM IMDB TITLE INFO
             in the MovieDetails constructor above, and in the
             documentation for getIMDBTitleInfo
          */
          // FROM IMDB TITLE INFO
          originalTitle: "primaryTitle",
          primaryTitle:"Todo ",
          runtimeMinutes: "Todo ",
          tconst: "",
          genres: "Todo ",
          titleType: "Todo ",
          endYear: "Todo ",
          startYear: "Todo ",
        });
      });
      getIMDBRatings(tconst, (ratingSearches) => {
        this.setState({
          /* Todo2:
          Assign Movie Rating and number of votes received from Firebase,
          as listed in the // FROM IMDB RATINGS INFO section in
          the MovieDetails constructor above.  The data is in fields of
          the same name in the ratingSearches variable, as described
          in the documentation of getIMDBRatings
          */
          // FROM IMDB RATINGS INFO
          averageRating: getIMDBRatings,
          numVotes:"Todo ",

          /*// FROM THEMOVIEDB DATA
          overview:"Todo ",
          poster:"https://via.placeholder.com/200x300",
          artWorkId: "",
          artWorkObject:[],
          cast:[{name:"Todo ", character:"Todo", profilePic:"https://via.placeholder.com/100x100"}],
          crew:[],*/
        });
      });

    getArtworkFromTheMovieDB(tconst).then(res => {
      const artWork = res.data.movie_results;
      this.setState({ artWorkObject : artWork });
      if(this.state.artWorkObject && this.state.artWorkObject.length > 0){
        this.setState({
          poster: getTheMovieDBImageURL(this.state.artWorkObject[0].poster_path),
          overview: this.state.artWorkObject[0].overview,
          artWorkId: this.state.artWorkObject[0].id,
        });
      }
    }).then(res => {
      getCreditsFromTheMovieDB(this.state.artWorkId).then(res => {
        const castAndCrew = res.data;
        /* Todo3: add a this.setState call to update the crew and cast properties, from the
           castAndCrew variable holding the request result
        */
        this.setState({
          castAndCrew: this.state.name.overview,
        });

      });
    });
  }

}

MovieDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieDetails);
