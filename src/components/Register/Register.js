import React from 'react';

//const serverURL = 'https://face-recognition-detection-api.herokuapp.com';
//const serverURL = 'http://localhost:3001';

class Register extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            registerEmail:'',
            registerPassword:'',
            registerName:''
        }
    }

    onNameChange = (event) => {
            this.setState({registerName:event.target.value});
    }
    onEmailChange = (event) => {
            this.setState({registerEmail:event.target.value});
    }
    onPasswordChange = (event) => {
            this.setState({registerPassword:event.target.value});
    }


    onSubmitRegister = () => {
        fetch('https://face-recognition-detection-api.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (true) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            }) 
    }

    render(){
        const { onRouteChange } = this.props;
        return(
            <article className="br5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
                                type="name" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={this.onSubmitRegister} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                    </div>
                    <div className="1h-copy mt3">
                        <p onClick={() => onRouteChange('signin')} href="#0" className="f6 link dim black db pointer">Sign in</p>
                    </div>
                </div>
            </main>
            </article>
        );
    }
}
export default Register;
