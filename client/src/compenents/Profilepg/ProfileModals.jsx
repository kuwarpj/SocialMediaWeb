import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

import './ProfileModals.css'
function ProfileModals({ modalOpened, setModalOpened, data}) {
    const theme = useMantineTheme();
    const {password, ...other} = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setCoverImage] = useState(null)

    const dispatch = useDispatch()
    const params = useParams()

    const {user} = useSelector((state)=> state.AuthReducer.authData)
 const handleChange = (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value})
 }

 const onProfileImageChange =(event)=>{
    console.log(event.target.name);
    if(event.target.files && event.target.files[0]){
        let img = event.target.files[0];
         setProfileImage(img);
    }
 }
 const onCoverImageChange =(event)=>{
    console.log(event.target.name);
    if(event.target.files && event.target.files[0]){
        let img = event.target.files[0];
        setCoverImage(img)
    }
 }
 const handleUpdate =(e)=>{
e.preventDefault()
let userData = formData;
if(profileImage){
    const data = new FormData()
    const fileName = Date.now() + profileImage.name;
    data.append("name", fileName)
    data.append("file", profileImage)
    userData.profilePic = fileName;
    try {
        dispatch(uploadImage(data))
    } catch (error) {
        console.log(error)
    }
}
if(coverImage){
    const data = new FormData()
    const fileName = Date.now() + coverImage.name;
    data.append("name", fileName)
    data.append("file", coverImage)
    userData.coverPic = fileName;
    try {
        dispatch(uploadImage(data))
    } catch (error) {
        console.log(error)
    }
}
dispatch(updateUser(params.id, userData))
setModalOpened(false)
 }
    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <div className="modalform">
                <form className='infoForm'>
                    <h3>Your Info</h3><br></br>

                    <div className='form-input'>
                        <input className='inpt' type="text" name='firstname' placeholder="First Name" onChange={handleChange} value ={formData.firstname}/>
                    </div>
                    <div className='form-input'>
                        <input className='inpt' type="text" name='lastname' placeholder="Last Name" onChange={handleChange} value ={formData.lastname} />
                    </div>
                    <div className='form-input'>
                        <input className='inpt' type="text" name='about' placeholder="About" onChange={handleChange} value ={formData.about}/ >
                    </div>

                    <div className='form-input'>
                        <input className='inpt' type="text" name='workAt' placeholder="Work at" onChange={handleChange} value ={formData.workAt} />
                    </div>
                    <div className='form-input'>
                        <input className='inpt' type="text" name='livesin' placeholder="Live In" onChange={handleChange} value ={formData.livesin} />
                    </div>
                    <div className='form-input'>
                        <input className='inpt' type="text" name='relationship' placeholder="Status" onChange={handleChange} value ={formData.relationship} />
                    </div>
                   


                    <div className='profile-img'>
                      
                        <input type="file" name='profilePic'  onChange={onProfileImageChange}/>
                        <span className='spn'>Choose Profile</span> 
                        <label class='label' data-js-label>{profileImage===null?"No file selected":profileImage.name}</label>
                        
                        </div>
                        <div className='profile-img'>
                        <input type="file" name='coverPic' onChange={onCoverImageChange}/>
                        <span className='spn'>Choose Cover</span>
                        <label class='label' data-js-label>{coverImage===null?"No file selected":coverImage.name}</label>
                    </div>


                    <button className='modal-btn' onClick={handleUpdate}>Update</button>




                </form>
            </div>
        </Modal>
    );
}

export default ProfileModals