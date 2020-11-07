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
            title: "",
            innerurl: "",
            outerurl: "",
            description: "",
            code: "",
            thumbnailurl: "",

        };
         this.show = (e) => {
            if(e.target.classList.contains("item-hide")){e.target.classList.remove("item-hide")};
            if(e.target.classList.contains("item-details")){e.target.classList.add("item-show");};
            
        }
        this.hide = (e) => {
            if(e.target.classList.contains("item-show")){e.target.classList.remove("item-show")};
            if(e.target.classList.contains("item-details")){e.target.classList.add("item-hide");};
        }
        this.unhover = (e) => {
            if(!e.target.classList.contains("unhover")) { e.target.classList.add("unhover"); }
        }
        this.hover = (e) => {
            if(e.target.classList.contains("unhover")) { e.target.classList.remove("unhover"); }
        }
        this.handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        }
        this.update = (data) => {
            e.preventDefault();
            //axios
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
                <div className="item">
                    <div className="item-visual flex flex-center flex-column absolute">
                        <div className="item-thumbnail region-piece-3-4" style={this.state.websiteStyle}></div>
                        <div className="item-title region-piece-1-4 flex flex-center">{this.props.title}</div>
                    </div>
                    <div className="item-details flex-center flex-column region-full" onMouseEnter={this.show} onMouseLeave={this.hide}>
                        <div className="item-description flex flex-center region-piece-2-3">{this.props.description}</div>
                        <div className="item-links flex flex-center flex-row region-piece-1-3">
                            <Link href={`http://${this.props.outerurl}`}>
                                <a className="item-button flex flex-center pointer" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Link</a>
                            </Link>
                            <Link href={`http://${this.props.code}`}>
                                <a className="item-button flex flex-center pointer" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Code</a>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.state.editmode && this.props.websitegithub){
            return(
                <div className="item-edit">
                    <div>{this.props.id}</div>
                    <form className="edit-form">
                        <label htmlFor="title"></label>
                        <input className="edit-form-item" name="title" value={this.state.title || this.props.title} onChange={this.handleChange}/>
                        <label htmlFor="description"></label>
                        <input className="edit-form-item" name="description" value={this.state.description || this.props.description} onChange={this.handleChange}/>
                        <label htmlFor="innerurl"></label>
                        <input className="edit-form-item" name="innerurl" value={this.state.innerurl || this.props.innerurl} onChange={this.handleChange}/>
                        <label htmlFor="outerurl"></label>
                        <input className="edit-form-item" name="outerurl" value={this.state.outerurl || this.props.outerurl} onChange={this.handleChange}/>
                        <label htmlFor="code"></label>
                        <input className="edit-form-item" name="code" value={this.state.code || this.props.code} onChange={this.handleChange}/>
                        <button type="submit" />
                        <button type="button" />
                    </form>  
                </div>
            );
        }
        else if(!this.state.editmode && this.props.website){
            return (
                <div>
                    <div className="item">
                        <div className="item-visual flex flex-center flex-column absolute">
                            <div className="item-thumbnail region-piece-3-4" style={this.state.websiteStyle}></div>
                            <div className="item-title region-piece-1-4 flex flex-center">{this.props.title}</div>
                        </div>
                        <div className="item-details hidden flex-center flex-column" onMouseEnter={this.show} onMouseLeave={this.hide}>
                            <div className="item-description flex flex-center region-piece-2-3">{this.props.description}</div>
                            <div className="item-links flex flex-center flex-row region-piece-1-3">
                                <Link href={`http://${this.props.outerurl}`}>
                                    <a className="item-button flex flex-center pointer" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Link</a>
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
                    <div>{this.props.id}</div>
                    <form className="edit-form flex flex-center flex-column region-full">
                        <label htmlFor="title"></label>
                        <input className="edit-form-item" name="title" value={this.state.title || this.props.title} onChange={this.handleChange}/>
                        <label htmlFor="description"></label>
                        <input className="edit-form-item" name="description" value={this.state.description || this.props.description} onChange={this.handleChange}/>
                        <label htmlFor="innerurl"></label>
                        <input className="edit-form-item" name="innerurl" value={this.state.innerurl || this.props.innerurl} onChange={this.handleChange}/>
                        <label htmlFor="outerurl"></label>
                        <input className="edit-form-item" name="outerurl" value={this.state.outerurl || this.props.outerurl} onChange={this.handleChange}/>
                        <button type="submit" className="top-margin-l">Update</button>
                        <button type="button" onClick={this.edit}>Cancel</button>
                    </form>  
                </div>
            );
        }
        else if(!this.state.editmode && this.props.image){
            return (
                <div className="item">
                    <div className="item-visual flex flex-center flex-column absolute">
                        <div className="item-thumbnail region-piece-3-4" style={this.state.imageStyle}></div>
                        <div className="item-title region-piece-1-4 flex flex-center">{this.props.title}</div>
                    </div>
                    <div className="item-details hidden flex-center flex-column" onMouseEnter={this.show} onMouseLeave={this.hide}>
                        <div className="item-description flex flex-center region-piece-2-3">{this.props.description}</div>
                        <div className="item-links flex flex-center flex-row region-piece-1-3">
                            <Link href={this.props.innerurl}>
                                <a className="item-button flex flex-center pointer" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Link</a>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.state.editmode && this.props.image){
            return(
                <div className="item-edit">
                    <div>{this.props.id}</div>
                    <form className="edit-form">
                        <label htmlFor="title"></label>
                        <input className="edit-form-item" name="title" value={this.state.title || this.props.title} onChange={this.handleChange}/>
                        <label htmlFor="description"></label>
                        <input className="edit-form-item" name="description" value={this.state.description || this.props.description} onChange={this.handleChange}/>
                        <label htmlFor="innerurl"></label>
                        <input className="edit-form-item" name="innerurl" value={this.state.innerurl || this.props.innerurl} onChange={this.handleChange}/>
                        <label htmlFor="thumbnailurl"></label>
                        <input className="edit-form-item" name="thumbnailurl" value={this.state.outerurl || this.props.outerurl} onChange={this.handleChange}/>
                        <button type="submit" />
                        <button type="button" />
                    </form>  
                </div>
            );
        }
        else{
            return(
                <div>Element {this.props.id} has been crashed. Sorry.</div>
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