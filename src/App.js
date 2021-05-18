import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser) {
        //user logged in...
        console.log(authUser)
        setUser(authUser)

      }else{
        //user loged out...
        setUser(null)
      }
    })
    return() => {
      // perform cleanup action before
      unsubscribe()
    }
  },[user, Username])

  //useEffect -> runs a piece of code based on specification
  useEffect(() => {
    //this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      //every time a new post is added, this code fire
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
   
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName:Username
      })
    })
    .catch((error) => alert(error.message))

  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
                alt=""
              />
              <input
                placeholder="Username"
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </center>
          </form>
        </div>
      </Modal>

      {/* Header */}

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>LogOut</Button>
        ):(
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        )}
        

        <h1>Hello Sandyman lets build instagram clone</h1>
      </div>

      {posts.map(({ id, post }) => {
        return (
          <Post
            key={id}
            Username={post.Username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}

      <Post
        Username="Soham"
        caption="NIce work"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6j7ZSQJLVfD2lWH-ROppwFphUeDOdm1Bqg&usqp=CAU"
      />

      {/* Posts */}
    </div>
  );
}

export default App;
