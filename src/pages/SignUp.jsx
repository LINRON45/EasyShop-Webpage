import React, { useState } from "react";
import AccountServices from "../services/Account-services";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';


function SignUp(){

    const [alert, setalert] = useState(false)
    const [message, setmessage] = useState('')
    const [type, settype] = useState('')
    const [passwordconfirm, setconfirm] = useState('')

    const [Account, setAccount] = useState({
        fname: "",
        lname: "",
        username:"",
        email:"",
        password:"",
        gender:"",
        DOB: ""
    })



    function handleChange(event){
        const {name, value} = event.target;

        setAccount(prevVal=>{
            return {
                ...prevVal,
                [name]:value
            }
        })
    }



    function confirmHandle(event){
        const confirm=event.target.value
        setconfirm(confirm)
    }

    async function CreateAcc(){
        const {fname, lname, username, email, password, DOB} =Account
        setalert(false)
        setmessage('')
        settype('')

        if(fname===''|| lname===''|| username===''|| email===''|| password===''|| DOB===''){
            console.log('incomplete')
            setalert(true)
            setmessage('Fill all required fields.')
            settype("info")
            return;
        }
        
        if(passwordconfirm!==Account.password){
            setalert(true)
            setmessage(`Password Confirmation doesn't match Password.`)
            settype("error")
            return
        }


        const usernameCheck = await AccountServices.getAccount(Account.username)
        if(usernameCheck!==null){
            setalert(true)
            setmessage(`Username is already taken.`)
            settype("error")
            return
        }

        try {
            await AccountServices.addAccount(Account.username, Account);
          } catch (err) {
              console.log(err)
            window.alert("Please check your internet connection and that all fields are appropriately filled!")
            setalert(true)
            setmessage('Error occurred!')
            settype("error")
            return;
          }
    }



    return(
        <div className="SignUp-page">
                <img className="SignUp-img" src="https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="signup-img"></img>

            <div className="SignUp">
            {alert && <Alert severity={type}>{message}</Alert>}
            <h2>Create an Account</h2>
            <p>It is free and easy.</p>
            <input type="text" onChange={handleChange} name="fname" placeholder="Enter First name" value={Account.fname} required/>
            <input type="text" onChange={handleChange} name="lname" placeholder="Enter Last name" value={Account.lname} required/>
            <input type="text" onChange={handleChange} name="username" placeholder="Enter Username" value={Account.username} required/>
            <input type="email" onChange={handleChange} name="email" placeholder="Enter email" value={Account.email}  required/>
            <input type="password" onChange={handleChange} name="password" placeholder="Enter new password" value={Account.password} required/>
            <input type="password" onChange={confirmHandle} name="confirm-password" placeholder="Confirm Password" value={passwordconfirm} required/>

            <label htmlFor="gender" >Gender:
            <select onChange={handleChange} name="gender" value={Account.gender} required>
                <option>None</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
            </label>

            
            <label htmlFor="DOB" required>Birthday</label>
            
            <input onChange={handleChange} name="DOB" type="date" value={Account.DOB} required/>
            <Button variant="contained" onClick={CreateAcc}>Sign Up</Button>
        </div>
        </div>
       
    )
}
export default SignUp;
