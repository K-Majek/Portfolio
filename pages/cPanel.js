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
                    usernamemsg: `Username must be between 4 and 20 characters.`
                })
            }
            if(target.password.value.length < 8){ 
                this.setState({
                    passwordmsg: `Username must contain at least 8 characters.`
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
                <div className="flex flex-center">
                    <div className="sidepanel flex flex-column">
                        <div className="sidepanel-category flex flex-center" onClick={() => {this.swapDisplay(event, "1")}}>
                            ADD Items
                        </div>
                        <div className="sidepanel-category flex flex-center" onClick={() => {this.swapDisplay(event, "2")}}>
                            List Items
                        </div>
                        <div className="sidepanel-category flex flex-center" onClick={() => {this.swapDisplay(event, "3")}}>
                            Edit Items
                        </div>
                        <Link href="/">
                            <div className="sidepanel-category flex flex-center">
                                Go Back to site
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
                <div className="viewport flex flex center flex-column">
                    <div className="region-piece-1-10"><div className="flex flex-center">{this.state.message}</div></div>
                    <div className="region-piece-8-10">
                        <form id="loginform" className="flex flex-center flex-column region-full">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" />
                            <div>{this.state.usernamemsg}</div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" />
                            <div>{this.state.passwordmsg}</div>
                            <button type="submit" onClick={this.handleLogin}>Submit!</button>
                        </form>
                    </div>
                    <div className="region-piece-1-10"></div>
                </div>
            )
        }
    }
}

export default cPanel;