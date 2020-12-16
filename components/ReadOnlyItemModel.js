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
                backgroundColor: "black",
                objectFit: "cover"
            },
            websiteStyle: {
                background: `url("${this.props.innerurl}")`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "black",
                objectFit: "cover"
            }
        };
    }
    render() {
        if(this.props.websitegithub){
            return (
                <div className="item">
                    <div className="item-visual">
                        <img src={this.props.innerurl} className="item-thumbnail" style={this.state.websiteStyle}></img>
                        <p className="item-title">{this.props.title}</p>
                    </div>
                    <div className="item-details">
                        <p className="item-description">{this.props.description}</p>
                        <div className="item-links">
                            <Link href={`http://${this.props.outerurl}`}>
                                <a className="item-button" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Link</a>
                            </Link>
                            <Link href={`http://${this.props.code}`}>
                                <a className="item-button" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Code</a>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.props.website){
            return (
                <div className="item">
                    <div className="item-visual">
                        <img src={this.props.innerurl} className="item-thumbnail" style={this.state.websiteStyle}></img>
                        <p className="item-title">{this.props.title}</p>
                    </div>
                    <div className="item-details">
                        <p className="item-description">{this.props.description}</p>
                        <div className="item-links">
                            <Link href={`http://${this.props.outerurl}`}>
                                <a className="item-button" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Link</a>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.props.image){
            return (
                <div className="item">
                    <div className="item-visual">
                        <img src={this.props.thumbnailurl} className="item-thumbnail" style={this.state.imageStyle}></img>
                        <p className="item-title">{this.props.title}</p>
                    </div>
                    <div className="item-details">
                        <p className="item-description">{this.props.description}</p>
                        <div className="item-links">
                            <Link href={this.props.innerurl}>
                                <a className="item-button" onMouseEnter={this.hover} onMouseLeave={this.unhover} target="_blank" rel="noreferrer">Link</a>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="item">
                    <div className="item-visual">
                        <div>Item {this.props.id} has wrongly set props. Check item model and fix it.</div>
                    </div>
                </div>
            );
        }
    }
}