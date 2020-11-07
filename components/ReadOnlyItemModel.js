import Link from "next/link";
/*
    *   Prop list:
    *   id
    *   innerurl
    *   outerurl
    *   description
    *   title
    *   code
*/
export default class ReadOnlyItemModel extends React.Component {
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
            }
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
    }
    render() {
        if(this.props.websitegithub){
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
        else if(this.props.website){
            return (
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
            );
        }
        else if(this.props.image){
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
        else {
            return (
                <div className="item">
                    <div className="item-visual flex flex-center flex-column absolute">
                        <div>Item {this.props.id} has wrongly set props. Check item model and fix it.</div>
                    </div>
                </div>
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