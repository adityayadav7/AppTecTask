import React, { PureComponent } from 'react'
import InputField from './InputField';
import FormButton from './FormButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import toast from 'toasted-notes'; 
import 'toasted-notes/src/styles.css';
import FireBase from '../FireBase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class Dashboard extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            fname: '',
            lname: '',
            username: '',
            password: '',
            confirmPass: '',
            err: '',
            errPass:'',
            userData: [],
            showPass:false

        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    
    componentDidMount() {
        this.getData();
    }
    getData() {
        axios.get('https://us-central1-second-3f5af.cloudfunctions.net/api/getData').then(res => {
            this.setState({
                userData: res.data
            })

        }).catch(err => {
            console.log(err)
        })
    }
    onSubmit(e) {
        e.preventDefault()
        let UserData = {
            firstname: this.state.fname,
            lastname: this.state.lname,
            username: this.state.username,
            password: this.state.password,
            ConfirmPassword: this.state.confirmPass
        }
        if(this.state.fname===''||this.state.lname===''|| this.state.username===''|| this.state.password===''|| this.state.confirmPass===''){
            toast.notify("Please fill required field")
        }
        else{
            if(this.state.password===this.state.confirmPass){
        
           FireBase.auth().createUserWithEmailAndPassword(this.state.username,this.state.password)
           .then(res=>{
               console.log("account created")
               axios.post('https://us-central1-second-3f5af.cloudfunctions.net/api/add', UserData)
            .then(result => {
                this.setState({ err: result })
                this.getData();
            }).catch(err => {
                console.log(err);
            })
           }).catch(err => {
            console.log(err);
        })
    }else{
        this.setState({
            errPass:"Password not matches"
        })
    }
        }
    }
    reset(e) {
        e.preventDefault()
        this.setState({
            fname: '',
            lname: '',
            username: '',
            password: '',
            confirmPass: ''
        })
    }
    delete(e, id) {
        e.preventDefault()
        axios.delete('https://us-central1-second-3f5af.cloudfunctions.net/api/delete/data/' + id)
            .then(res => {
                console.log('deleted data')
                this.getData();
            }).catch(err => {
                console.log(err);
            })
    }
    handleEye(e){
        if(this.state.showPass===false){
         this.setState({
             showPass:true
         })
        }
        else{
         this.setState({
             showPass:false
         })
        }
     }

    render() {
        return (
            <div >
                <div className="container" >
                    <div className='form-container'>
                        <form className="form">
                            <div className="form-group">
                                <label>First Name</label>
                                <InputField
                                    id="fname"
                                    type="text"
                                    value={this.state.fname}
                                    change={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <InputField
                                    id="lname"
                                    type="text"
                                    value={this.state.lname}
                                    change={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <InputField
                                    id="username"
                                    type="text"
                                    value={this.state.username}
                                    change={this.onChange.bind(this)}
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <InputField
                                    id="password"
                                    type={this.state.showPass?"text":"password"}
                                    value={this.state.password}
                                    change={this.onChange.bind(this)}
                                />
                                {this.state.showPass?
                                 <i className="eye" 
                                 onClick={e=>this.handleEye(e)}
                               >
                                   <VisibilityOffIcon/>
                               </i>
                               :
                               <i className="eye" 
                                  onClick={e=>this.handleEye(e)}
                                >
                                    <VisibilityIcon/>
                                </i>
                                }
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <InputField
                                    id="confirmPass"
                                    type={this.state.showPass?"text":"password"}
                                    value={this.state.confirmPass}
                                    change={this.onChange.bind(this)}
                                />
                                {this.state.showPass?
                                 <i className="eye" 
                                 onClick={e=>this.handleEye(e)}
                               >
                                   <VisibilityOffIcon/>
                               </i>
                               :
                               <i className="eye" 
                                  onClick={e=>this.handleEye(e)}
                                >
                                    <VisibilityIcon/>
                                </i>
                                }
                                <div className="warning">{this.state.errPass}</div>
                            </div>
                            <div >
                                <div className="btn-clear">
                                    <FormButton
                                        label='Clear'
                                        click={e => this.reset(e)}
                                    />
                                </div>
                                <div className="btn">
                                    <FormButton
                                        label="Submit"
                                        click={e => this.onSubmit(e)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='form-container' >
                        <h2>Table</h2>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableHead>
                                <TableBody>
                                    {this.state.userData.map((data, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{data.FirstName}</TableCell>
                                        <TableCell>{data.LastName}</TableCell>
                                        <TableCell>{data.Username}</TableCell>
                                                <TableCell>
                                                    <FormButton
                                                        label='Delete'
                                                        click={e=>this.delete(e,data.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard