import React,{Component} from 'react';
import firebase from 'firebase';
import database from '../Config/firebase-react-assignment.js';
import Project from './Project.js';
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            SignUpFlag : false,
            errmessage :'',
            toProject : false
        };
    }
    LogInHandler = (e) =>{
        if(!this.refs.email.value || !this.refs.password.value)
            alert("Please Enter Details...!!!");
        else {
            const email = this.refs.email.value;
            const password = this.refs.password.value;
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email,password);
             promise
              .catch(e =>{
                console.log(e.message);
                this.setState({errmessage : e.message});
             });
             promise
                .then(
                    this.setState({
                    toProject:true,             
                    })
                );
                 
        }
    }
    SignUpHandler = () =>{
        this.setState({SignUpFlag : true,
            errmessage : ''
        })
    }
    submitHandler = (e) =>{
        if(!this.refs.name.value || !this.refs.nickname.value || !this.refs.regemail.value
             || !this.refs.regpassword.value )
         {
              alert("Please Enter Details...!!!");
             e.preventDefault();
            }
            else if(this.refs.name.value && this.refs.nickname.value && this.refs.regemail.value
                && this.refs.regpassword.value ){
                    const name = this.refs.name.value;
                    const nickname = this.refs.nickname.value;
                    const regemail = this.refs.regemail.value;
                    const regpassword = this.refs.regpassword.value;
                    const auth = firebase.auth();
                     const promise = auth.createUserWithEmailAndPassword(regemail,regpassword);
                     promise
                      .then( result =>{
                          console.log(result.user)
                          console.log(result.user.email);
                        database.ref('Users/'+result.user.uid).set({
                            Name : name , 
                            NickName : nickname,
                            EmailId : regemail,
                        }); 
                      });
                    promise
                      .catch( e =>{
                         // console.log('catch-->'+e.message);
                      });
                   
                      
                      alert("Registered Successfully...!!!");
                }
               
    }
   
    render(){
        var display;
        var toProject = <Project />;
        if(this.state.SignUpFlag === false )
        {
            display =  <div><br/> <br/> <br/> <br/>
            LogIn / SignUp <br/> <br/>
         <label>Username : </label>
         <input type="email" ref="email" /> <br/> <br/>
         <label>Password : </label>
         <input type="password" ref="password" /> <br/> <br/>
         <button  onClick={ this.LogInHandler}>LogIn</button> {" "} 
         <button onClick={this.SignUpHandler}>SignUp</button>
         </div>
            
        }
        
       else  {
            display = <div>
                <br/> <br/> <br/>
                <form onSubmit={this.submitHandler}>
                    <h5> User Registration Form </h5>
                    <label> Name : </label>
                    <input type="text" ref="name" /> <br/>
                    <label> Nick Name : </label>
                    <input type="text" ref="nickname" /> <br/>
                    <label> Email-Id : </label>
                    <input type="email" ref="regemail" /> <br/>
                    <label> Password : </label>
                    <input type="password" ref="regpassword" /> <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        }
        if(this.state.toProject === true)
        {
            display = <Project/>;

        }        
        return(
        
            <div>
       { display }  <br/>
               {this.state.errmessage}
            </div>
            
        );
    }
}