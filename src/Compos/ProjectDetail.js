import React , { Component } from 'react';
import firebase from 'firebase';
import database from '../Config/firebase-react-assignment.js';
const uuid = require('uuid');
export default class ProjectDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            detailarr : [],
            addCustomer : false,
            customers : []
        };
    }
    componentDidMount(){
        var result = database.ref(`Projects/${this.props.Uid}`);
        result.on('value',(snapshot)=>{
            var arr = this.state.detailarr;
            arr.push('Title : '+snapshot.val().Title);
            arr.push('Project Lead : '+snapshot.val().ProjectLead);
            arr.push('Company : '+snapshot.val().Company);
            arr.push('Project Id : '+snapshot.val().ProjectId);
            this.setState({ detailarr : arr });
            if(snapshot.val().Customers){
                var mainCustomers = snapshot.val().Customers;
                var customersfb = Object.values(mainCustomers);
                console.log(customersfb[0].Name);
            console.log(snapshot.val().Customers);
            var custarr = [];
            var customers = [];
            console.log(customersfb.length);
            for ( var i = 0 ; i < customersfb.length ; i++)
            { 
                custarr.push(customersfb[i].Name);
                custarr.push(customersfb[i].PhNo);
                custarr.push(customersfb[i].EmailId);
                custarr.push(customersfb[i].Address);
                customers.push(custarr);
            }
                
            
            
                this.setState({ customers : customers });
                console.log('i am customers');

            }
        });


    }
    addCustomerHandler = () =>{
        console.log('addcustomer handler called');
            this.setState({addCustomer:true,
                customers : ''
        });
        
    
    }
    submitHandler = () =>{
        console.log('i am submithandler');
        database.ref(`Projects/${this.props.Uid}/Customers/${uuid.v1()}`).set({
                        Name : this.refs.name.value,
                        PhNo : this.refs.phonenumber.value,
                        EmailId : this.refs.email.value,
                        Address : this.refs.address.value
        });
        console.log('to firebase..!!!');
        var result = database.ref(`Projects/${this.props.Uid}`);
        console.log('again from firebase...');
        result.on('value',(snapshot)=>{
            var arr = [];
            arr.push('Title : '+snapshot.val().Title);
            arr.push('Project Lead : '+snapshot.val().ProjectLead);
            arr.push('Company : '+snapshot.val().Company);
            arr.push('Project Id : '+snapshot.val().ProjectId);
            this.setState({ detailarr : arr });
        });
         var result = database.ref(`Projects/${this.props.Uid}/Customers`);
         result.on('value',(snapshot)=>{
            this.setState({customers : ''});
            console.log('making state null');
             var result = snapshot.val();
             var values = Object.values(result);
             console.log(values);
             console.log(values[0].Name);
             var subArr = [];
             var mainArr = [];
             console.log(values.length+'from submithandles values lenght')
             for ( var i = 0 ; i < values.length ; i++){
                subArr.push(values[i].Name);
                subArr.push(values[i].PhNo);
                subArr.push(values[i].EmailId);
                subArr.push(values[i].Address);
                mainArr.push(subArr);
             }
             this.setState({customers:mainArr});
         })
        this.setState({addCustomer : false});
        
    }
    render(){
        var display;
        var addCustomerButton = <button onClick={this.addCustomerHandler}> Add Customer</button>;
        var customerDetails;
        if(this.state.detailarr)
        {
            display = this.state.detailarr.map((item,i)=>{
                    return <p key={i} >{item}</p>
            });
        }
        if(this.state.addCustomer)
        {
            display = <div>
                <label>Name : </label>
                <input type="name" ref="name" /> <br/>
                <label>Phone Number : </label>
                <input type="text" ref="phonenumber" /> <br/>
                <label>Email : </label>
                <input type="email" ref="email" /> <br/>
                <label>Address : </label>
                <input type="text" ref="address" /> <br/>
            <input type="submit" value="Submit" onClick={this.submitHandler} />
                
            </div>;
            addCustomerButton = '';
        
        }
        if(this.state.customers){
            customerDetails = this.state.customers.map( out =>{
                return (
                    out.map((item,i)=>{
                        return <li key={i} >{item}</li>
                    })
                )
            })
        }
        return(
            <div>
               <h3>Project Details</h3> 
                {display}
               --------------- <br/>
                {customerDetails} 
                {addCustomerButton}
            </div>
        );
    }
}