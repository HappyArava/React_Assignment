import React,{Component} from 'react';
import firebase from 'firebase';
import database from '../Config/firebase-react-assignment.js';
import ProjectDetail from './ProjectDetail.js';
// import createHistory from 'history/createBrowserHistory';   
// const history = createHistory();

const uuid=require('uuid');
export default class Project extends Component{
    constructor(props){
        super(props);
        this.state={
            addProject : false,
            fetchTitle : [],
            projectDetailFlag : false,
            projectDetailTitle : '',
            projectDetailUidArr : [],
            detailUid : ''
           
        };
    }

    componentDidMount(){
        var result = database.ref('Projects/');
        result.on('value',(snapshot)=>{
            if(snapshot.val()){
                var arr = this.state.fetchTitle;
                var arruid = this.state.projectDetailUidArr;
                var keys = Object.keys(snapshot.val());
                var values = Object.values(snapshot.val());
                for( var i = 0 ; i < values.length ; i++ )
                 {   
                     arr.push(values[i].Title);
                     arruid.push(keys[i]);
                    }
                this.setState({fetchTitle:arr,
                    fetchlen : values.length,
                    projectDetailUidArr : arruid
                });
            }
            else console.log('not exist');
        });
    }
    addProjectHandler = () =>{
        this.setState({addProject:true
        });
     }
     submitHandler = () =>{
        const title = this.refs.title.value;
        const projectlead = this.refs.projectlead.value;
        const company = this.refs.company.value;
        const projectid = this.refs.projectid.value;
        database.ref('Projects/'+uuid.v1()).set({
            Title : title,
            ProjectLead : projectlead,
            Company : company,
            ProjectId : projectid
        });
        var result = database.ref('Projects/');;
        result.on('value',(snapshot)=>{
            var arr = [];
            var values = Object.values(snapshot.val());
            var arruid = [];
            var keys = Object.keys(snapshot());
                for( var i = 0 ; i < values.length ; i+=2 )
                 {   
                      arr.push(values[i].Title); 
                        arruid.push(keys[i]);
                }
            this.setState({
                        addProject:false,
                        fetchTitle : arr,
                        projectDetailUidArr : arruid
                    });
                
        });
    }
    projectDetailHandler = (item,i) =>{
        // console.log('i am detial'+item+'   '+this.state.projectDetailUidArr[i]);
        this.setState({projectDetailFlag:true,
            projectDetailTitle : item,
            detailUid : this.state.projectDetailUidArr[i]
        
        });
    }
    logOutHandler = () =>{
        console.log('i am logging out...!!!');
        firebase.auth().signOut();
        // history.push("/");
    }
   
    render(){
        var display;
        var addProjectbutton = <button onClick={this.addProjectHandler}>Add Project</button>;
        var title;
       
        if(this.state.addProject)
        {
             title =  <h3> Project Registration Form </h3>;                
             display = 
             <div>
                 <form onSubmit={this.submitHandler}>
                <label>Title : </label>
                <input type="text" ref="title" /> <br/>
                <label>Project Lead : </label>
                <input type="text" ref="projectlead" /> <br/>
                <label>Company : </label>
                <input type="text" ref="company" /> <br/>
                <label>Project Id : </label>
                <input type="text" ref="projectid" /> <br/>
            <input type="submit" value="Submit" />
                </form>
             </div>;
             addProjectbutton = '';
        }
        else{
            
            title =  <h3> Project List</h3>
            display = 
            
            this.state.fetchTitle.map((item,i)=>{
                        return <p key={i} onClick={()=>{this.projectDetailHandler(item,i)}} >{item} {i}</p>
            });
            addProjectbutton = <button onClick={this.addProjectHandler}>Add Project</button>;
            
        }  
        if(this.state.projectDetailFlag === true){
            display = < ProjectDetail Title={this.state.projectDetailTitle} Uid ={this.state.detailUid}/>;      
            addProjectbutton = '';
            title = '';
        }
            
        return(            
            <div>
            <br/> <br/>
               <br/>
                { title }
                {display}
            ------------------------ <br/>
                {addProjectbutton} <br/>
                <button onClick={this.logOutHandler}>LogOut</button>
            </div>
        );
    }
}
