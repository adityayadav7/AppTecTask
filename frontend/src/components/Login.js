import React, { Component } from 'react'
import InputField from './InputField';
import FormButton from './FormButton';
import FireBase from '../FireBase';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LoaderButton from './LoaderButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            load: false,
            showPass:false
        }

    }
    // handleChange(e){
    //        const value=e.target.value;
    //        this.setState({
    //            ...this.state,
    //            [e.target.name]:value
    //        }) 
    // }
    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangePassword(e) {
        this.setState({
            password: e.target.value
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
    onLogin(e) {
        e.preventDefault()
        this.setState({ load: true });
        FireBase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
            this.setState({ load: false })
            this.props.history.push('/dashboard')
        }).catch(err => {
            toast.notify("Incorrect E-mail/Password")
            this.setState({ load: false })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="login-con">
                    <div className="divider">
                        <div className="content">
                            <h2 className="wite-color">Welcome</h2>
                            <p className="wite-color">to online help center</p>
                            <div>
                                <ul className="list">
                                    {/* <li className="wite-color">
                                    <div className="flex"><CheckCircleIcon color='primary'/>Secure and reliable for users</div>
                                    </li> */}
                                    <div className="flex">

                                        <div className="list-content wite-color">
                                            <CheckCircleIcon color='primary' class="c-icon" />
                                            Secure and reliable for users
                                        </div>

                                    </div>
                                    <div className="flex">

                                        <div className="list-content wite-color"><CheckCircleIcon class="c-icon" color='primary' />Even your grandma can use</div>

                                    </div>
                                    <div className="flex">

                                        <div className="list-content wite-color"><CheckCircleIcon class="c-icon" color='primary' />Work 15% faster than others</div>

                                    </div>

                                </ul>
                            </div>
                        </div>
                        <form action="" className="form">
                            <div className="form-group">
                                <label>E-mail</label>
                                <InputField
                                    name="email"
                                    value={this.state.email}
                                    change={this.handleChangeEmail.bind(this)}
                                />
                                
                            </div>
                            <div className="form-group">
                                <lable>Password</lable>
                                <InputField
                                    type={this.state.showPass?"text":"password"}
                                    value={this.state.password}
                                    change={e => this.handleChangePassword(e)}
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
                            <div className="forget-pass"><Link className="btn">Forget Password? </Link></div>
                            <div className="btn">
                                {this.state.load?
                                 <LoaderButton load={this.state.load}/>
                                 :
                                 <FormButton
                                    //color='primary'
                                    click={e => this.onLogin(e)}
                                    label="Login"
                                >Login</FormButton>
                                }

                            </div>

                        </form>
                    </div>
                    <div className="contact-bg">
                        <div className="contact">
                    Dont have an account?<Link>Contact Us</Link>
                    </div>
                </div>
                </div>
                
            </div>
        )
    }
}

export default Login