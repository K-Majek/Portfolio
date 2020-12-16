import Link from 'next/link';
import axios from 'axios';
import Add_Items from "../components/Add_Items";
import List_Items from '../components/List_Items';
import Edit_Items from '../components/Edit_Items';
class cPanel extends React.Component {
    constructor() {
        super();
        this.state = {  
            isloggedin: false,
            currentDisplay: "1"
        };
        this.swapDisplay = (e, key) => {
            this.setState({currentDisplay: key});
        }
        this.handleImageUpload = (e) => {
            e.preventDefault();
            let form = document.getElementById("uploadimage");
            let formdata = new FormData(form);
            axios({
                method: 'post',
                url: '/API/SendImage',
                data: formdata,
                headers: {'Content-Type': 'multipart/form-data' }
                })
                .then((response) => {
                    console.log(response);
                    this.setState({message: response.data});
                    form.reset();
                })
                .catch(error => {
                    console.log(error.response);
                    this.setState({message: error.response.data});
                });
        }
        this.handleWebsiteUpload = (e) => {
            e.preventDefault();
            let form = document.getElementById("uploadwebsite");
            let formdata = new FormData(form);
            axios({
                method: 'post',
                url: '/API/SendWebsite',
                data: formdata,
                headers: {'Content-Type': 'multipart/form-data' }
                })
                .then((response) => {
                    console.log(response);
                    this.setState({message: response.data});
                    form.reset();
                  }, (error) => {
                    console.log(error.response);
            });
        }
        this.utf8_to_b64 = ( str ) => {
            return window.btoa(encodeURIComponent(escape( str )));
        }
        this.b64_to_utf8 = ( str ) => {
            return unescape(decodeURIComponent(window.atob( str )));
        }
        this.handleLogin = (e) => {
            e.preventDefault();
            let self = this;
            let target = document.getElementById("loginform");
            let formData = new FormData(target);
            if(target.username.value.length < 4){ 
                this.setState({
                    usernamemsg: `username must be between 4 and 20 characters`
                })
            }
            if(target.password.value.length < 8){ 
                this.setState({
                    passwordmsg: `password must contain at least 8 characters`
                })
            }
            if(target.password.value.length >= 8 && target.username.value.length >= 4){
                axios({
                    method: 'post',
                    url: '/API/Login',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((response) => {
                    if(response.status === 200){
                        self.setState({
                            message: response.data
                        });

                        sessionStorage.setItem("username", self.utf8_to_b64(target.username.value));
                        sessionStorage.setItem("password", self.utf8_to_b64(target.password.value));
                        setTimeout(() => {
                            self.setState({
                                isloggedin: true
                            });
                        }, 1500);
                        
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                    target.reset();
                    self.setState({
                        message: error.response.data
                    });
                });
            }

        }
    }
    componentDidMount(){
        if("username" in sessionStorage && "password" in sessionStorage){
            let usernameB64 = sessionStorage.getItem("username");
            let passwordB64 = sessionStorage.getItem("password");
            let username = this.b64_to_utf8(usernameB64);
            let password = this.b64_to_utf8(passwordB64);
            let formData = new FormData();
            let self = this;
            formData.append("username", username);
            formData.append("password", password);
            axios({
                method: 'post',
                url: '/API/Login',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            .then((response) => {
                if(response.status === 200){
                    self.setState({
                        message: response.data,
                        isloggedin: true
                    });
                }
            })
            .catch((error) => {
                console.log(error.response);
                self.setState({
                    message: "Session has been expired. Log In again."
                });
            });

        }
    }
    render() {
        if(this.state.isloggedin){
            return (
                <div className="cPanel">
                    <div className="sidepanel flex flex-direction-column">
                        <div className="sidepanel-category flex flex-align-center flex-justify-center" onClick={() => {this.swapDisplay(event, "1")}}>
                            <p>ADD Items</p>
                        </div>
                        <div className="sidepanel-category flex flex-align-center flex-justify-center" onClick={() => {this.swapDisplay(event, "2")}}>
                            <p>List Items</p>
                        </div>
                        <div className="sidepanel-category flex flex-align-center flex-justify-center" onClick={() => {this.swapDisplay(event, "3")}}>
                            <p>Edit Items</p>
                        </div>
                        <Link href="/">
                            <div className="sidepanel-category flex flex-align-center flex-justify-center">
                                <p>Go back to site</p>
                            </div>
                        </Link>
                    </div>
                    <div className="displaypanel margin-auto flex-column scroll">
                        
                        {
                            (() => {
                                switch (this.state.currentDisplay) {
                                    case "1":
                                        return ( <Add_Items handleImageUpload={this.handleImageUpload} handleWebsiteUpload={this.handleWebsiteUpload} />)
                                    case "2":
                                        return ( <List_Items />)
                                    case "3":
                                        return ( <Edit_Items />)
                                    default:
                                        return ( <div>An error has been occured. Please refresh the browser.</div>)
                                }
                            })()
                        }

                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="panel flex flex center flex-column">
                    <p>{this.state.message}</p>
                    <form id="loginform" className="flex flex-center flex-column region-full">
                        <label htmlFor="username">Username</label>
                        <input id="loginform-username" type="text" name="username" autoComplete="off" />
                        <p>{this.state.usernamemsg}</p>
                        <label htmlFor="password">Password</label>
                        <input id="loginform-password" type="password" name="password" autoComplete="off" />
                        <p>{this.state.passwordmsg}</p>
                        <button id="loginform-button" type="submit" onClick={this.handleLogin}>Submit!</button>
                    </form>
                </div>
            )
        }
    }
}

export default cPanel;