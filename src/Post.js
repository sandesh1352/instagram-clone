import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"

function Post({ Username,caption,imageUrl}) {
    return (
        <div className="Post">
            <div className="Post__header">
                <Avatar
                    className="Post__avatar"
                    alt='sandyman'
                    src=" "
           />
            
           {/* header -> avatar + username*/} 
           
            <h3>{Username}</h3>
            </div>

           {/*image */}
            <img className="Post__image" src={imageUrl} alt=""/>
          
           {/*username + caption */}
           <h4 className="Post__text"><strong>{Username}</strong> {caption}</h4>
        </div>
    )
}

export default Post