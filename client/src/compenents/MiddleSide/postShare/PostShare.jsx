import React, { useState, useRef } from 'react'
import "./PostShare.css"
import profileImg from "../../../img/profileImg.jpg"
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../../actions/UploadAction'

const PostShare = () => {
    const loading = useSelector((state)=>state.postReducer.uploading)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.AuthReducer.authData)
    const [image, setImage] = useState(null);
    const postRef = useRef();
    // const desc = useRef()
    const [desc, setDesc] = useState("");
    const onImageChange = (eve) => {
        if (eve.target.files && eve.target.files[0]) {
            let img = eve.target.files[0];

            setImage( img) 
        }
    }
const reset = ()=>{
    setImage(null)
    // desc.current.value =""
    setDesc("");
}
const handleChange = (e)=>{
    setDesc(e.target.value);
}
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            // desc: desc.current.value,
            desc: desc
        }


        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            console.log(newPost)

            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset()
    }
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className='PostShare'>
            <img className='postShareImg' src={user.profilePic ? serverPublic + user.profilePic : serverPublic +"defaultProfile.png"} alt="Image" />
            <div>
                <input type="text" placeholder="Write SomeThings" onChange={handleChange} value={desc}
                ></input>
                <div className="postOptions">
                    <div className="options"
                        onClick={() => postRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className="options">
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="options">
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="options">
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className='button ps-button' onClick={handleSubmit} disabled={image===null && desc===""}>
                        {loading ? "Uploading" : " Post"}
                    </button>
                    <div style={{ display: "none" }}>
                        <input type="file" name="myPost" ref={postRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className='previewPost'>
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />

                    </div>
                )}
            </div>


        </div>
    )
}

export default PostShare