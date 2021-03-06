import React, { useState, useEffect } from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUsers } from "../../redux/actions/profileAction";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarContainer: {
    marginTop: 100,
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    width: "50%",
    justifyContent: "space-around",
  },
  left: {
    display: "flex",
    width: "30%",
    justifyContent: "space-around",
  },
  fontSize: {
    fontSize: "1rem",
  },
  bold: {
    fontWeight: "bold",
  },
  followersDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  right: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
  },
  right2: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
  toggleButtonGroup: {
    marginTop: 100,
    width: "70%",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  displayDiv: {
    padding: "2%",
  },
}));
const Info = ({  id }) => {
  const {  auth, profile } = useSelector(state => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState({
    avatar: null,
    fullname: "Sarvh User",
    username: "sarvhuser",
    followers: -1,
    following: -1,
    self: false,
    load: false
  });
  useEffect(() => {
    console.log("use effect ran in info")
    if (auth.user.username === id) {
      setValues({
        ...values,
        avatar: auth.user.avatar,
        fullname: auth.user.fullname,
        username: auth.user.username,
        followers: auth.user.followers.length,
        following: auth.user.following.length,
        self: true,
        load: true
      });
      console.log(values);
    } else{
      try{

        setValues({
          ...values,
          avatar: profile.users[0].avatar,
          fullname: profile.users[0].fullname,
          username: profile.users[0].username,
          followers: profile.users[0].followers.length,
          following: profile.users[0].following.length,
          self: false,
          load: true,
        });
      } catch (err) {
        console.log(err)
      }
    }
}, [auth, profile.users, dispatch, id]);
    return (
      // <div></div>
      <div>
        <div className={classes.avatarContainer}>
          <div className={classes.left}>
            <Avatar
              src={values.avatar}
              alt="profile image"
              className={classes.large}
            />
            <div className={classes.userInfo}>
              <Typography className={classes.bold}>
                {values.fullname}
              </Typography>
              <Typography color="textSecondary" className={classes.fontSize}>
                {values.username}
              </Typography>
              <StarOutlinedIcon />
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.right2}>
              <div className={classes.followersDiv}>
                <Typography className={classes.bold}>{values.followers}</Typography>
                <Typography>Followers</Typography>
              </div>
              <div className={classes.followersDiv}>
                <Typography className={classes.bold}>{values.following}</Typography>
                <Typography gutterBottom>Following</Typography>
              </div>
            </div>
            {!values.self && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                className={classes.fontSize}
              >
                Follow
              </Button>
            )}
  
            {values.self && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                className={classes.fontSize}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    );
};

export default Info;
