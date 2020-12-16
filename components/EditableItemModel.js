import Link from "next/link";
import axios from 'axios';
/*
    *   Prop list:
    *   id
    *   innerurl
    *   outerurl
    *   description
    *   title
    *   code
*/
export default class EditableItemModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            imageStyle: {
                background: `url("${this.props.thumbnailurl}")`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "black"
            },
            websiteStyle: {
                background: `url("${this.props.innerurl}")`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "black"
            },
            editmode: false,
            id: this.props.id || "",
            title: this.props.title || "",
            innerurl: this.props.innerurl || "",
            outerurl: this.props.outerurl || "",
            description: this.props.description || "",
            code: this.props.code || "",
            thumbnailurl: this.props.thumbnailurl || "",

        };
        this.handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        }
        this.edit = () => {
            let tmp = !this.state.editmode;
            this.setState({editmode: tmp});
        }
    }
    componentDidMount() {
        document.addEventListener("submit", (e) => {
            console.log(e.target);
        });
    }
    render() {
        if(!this.state.editmode && this.props.websitegithub){
            return (
                <div>
                    <div className="item">
                        <div className="item-visual">
                            <img src={this.state.innerurl} className="item-thumbnail" style={this.state.websiteStyle}></img>
                            <p className="item-title">{this.state.title}</p>
                        </div>
                        <div className="item-details">
                            <p className="item-description">{this.state.description}</p>
                            <div className="item-links">
                                <Link href={`http://${this.state.outerurl}`}>
                                    <a className="item-button" target="_blank" rel="noreferrer">Link</a>
                                </Link>
                                <Link href={`http://${this.state.code}`}>
                                    <a className="item-button" target="_blank" rel="noreferrer">Code</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="item-toggler" onClick={this.edit}>EDIT</button>
                </div>
            );
        }
        else if(this.state.editmode && this.props.websitegithub){
            return(
                <div className="item-edit">
                    <div>{this.state.id}</div>
                    <form className="edit-form">
                        <label htmlFor="title"></label>
                        <input className="edit-form-item formbutton auto" name="title" value={this.state.title} onChange={this.handleChange}/>
                        <label htmlFor="description"></label>
                        <input className="edit-form-item formbutton auto" name="description" value={this.state.description} onChange={this.handleChange}/>
                        <label htmlFor="innerurl"></label>
                        <input className="edit-form-item formbutton auto" name="innerurl" value={this.state.innerurl} onChange={this.handleChange}/>
                        <label htmlFor="outerurl"></label>
                        <input className="edit-form-item formbutton auto" name="outerurl" value={this.state.outerurl} onChange={this.handleChange}/>
                        <label htmlFor="code"></label>
                        <input className="edit-form-item formbutton auto" name="code" value={this.state.code} onChange={this.handleChange}/>
                        <input type="hidden" name="type" value="github" />
                        <input type="hidden" name="id" value={this.state.id} />
                        <button type="submit" onClick={this.props.UpdateContent} className="formbutton auto"/>
                        <button type="button" className="formbutton auto"/>
                    </form>  
                </div>
            );
        }
        else if(!this.state.editmode && this.props.website){
            return (
                <div>
                    <div className="item">
                        <div className="item-visual">
                            <img src={this.state.innerurl} className="item-thumbnail" style={this.state.websiteStyle}></img>
                            <p className="item-title">{this.state.title}</p>
                        </div>
                        <div className="item-details">
                            <p className="item-description">{this.state.description}</p>
                            <div className="item-links">
                                <Link href={`http://${this.state.outerurl}`}>
                                    <a className="item-button" target="_blank" rel="noreferrer">Link</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="item-toggler" onClick={this.edit}>EDIT</button>
                </div>
            );
        }
        else if(this.state.editmode && this.props.website){
            return(
                <div className="item-edit flex flex-center">
                    <form className="edit-form flex flex-center flex-column region-full">
                        <label htmlFor="title"></label>
                        <input className="edit-form-item formbutton auto" name="title" value={this.state.title} onChange={this.handleChange}/>
                        <label htmlFor="description"></label>
                        <input className="edit-form-item formbutton auto" name="description" value={this.state.description} onChange={this.handleChange}/>
                        <label htmlFor="innerurl"></label>
                        <input className="edit-form-item formbutton auto" name="innerurl" value={this.state.innerurl} onChange={this.handleChange}/>
                        <label htmlFor="outerurl"></label>
                        <input className="edit-form-item formbutton auto" name="outerurl" value={this.state.outerurl} onChange={this.handleChange}/>
                        <input type="hidden" name="type" value="website" />
                        <input type="hidden" name="id" value={this.state.id} />
                        <button type="submit" onClick={this.props.UpdateContent} className="formbutton auto">Update</button>
                        <button type="button" className="formbutton auto" onClick={this.edit}>Cancel</button>
                    </form>  
                </div>
            );
        }
        else if(!this.state.editmode && this.props.image){
            return (
                <div>
                    <div className="item">
                        <div className="item-visual">
                            <img src={this.state.thumbnailurl} className="item-thumbnail" style={this.state.imageStyle}></img>
                            <p className="item-title">{this.state.title}</p>
                        </div>
                        <div className="item-details">
                            <p className="item-description">{this.state.description}</p>
                            <div className="item-links">
                                <Link href={this.state.innerurl}>
                                    <a className="item-button" target="_blank" rel="noreferrer">Link</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="formbutton auto" onClick={this.edit}>Cancel</button>
                </div>
            );
        }
        else if(this.state.editmode && this.props.image){
            return(
                <div className="item-edit">
                    <form className="edit-form">
                        <label htmlFor="title"></label>
                        <input type="text" className="edit-form-item formbutton auto" name="title" value={this.state.title} onChange={this.handleChange}/>
                        <label htmlFor="description"></label>
                        <input type="text" className="edit-form-item formbutton auto" name="description" value={this.state.description} onChange={this.handleChange}/>
                        <label htmlFor="innerurl"></label>
                        <input type="text" className="edit-form-item formbutton auto" name="innerurl" value={this.state.innerurl} onChange={this.handleChange}/>
                        <label htmlFor="thumbnailurl"></label>
                        <input type="text" className="edit-form-item formbutton auto" name="thumbnailurl" value={this.state.outerurl} onChange={this.handleChange}/>
                        <input type="hidden" name="type" value="image" />
                        <input type="hidden" name="id" value={this.state.id} />
                        <button type="submit" onClick={this.props.UpdateContent} className="formbutton auto"/>
                        <button type="button" className="formbutton auto"/>
                    </form>  
                </div>
            );
        }
        else{
            return(
                <p>Element {this.state.id} has been crashed. Sorry.</p>
            );
        }
    }
}

/*
    props:
    * bool readonly (editable only in cpanel) ~!exploitable!~
    * image or website
    * if website - outer url
    * if image - link to HQ version
    * description
    * visible thumbnail
*/