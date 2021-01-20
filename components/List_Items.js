import ReadOnlyItemModel from "./ReadOnlyItemModel";
import axios from "axios";

export default class List_Items extends React.Component {
    constructor() {
        super();
        this.state = {  };
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: '/API/GetContent'
        })
        .then((response) => {
                let mapper = response.data.map((data) => {
                    if(data.type === "image") {
                        return ( <ReadOnlyItemModel UpdateContent={this.UpdateContent} image="true" thumbnailurl={"static/images/" + data.innerurl} innerurl={"static/images/" + data.outerurl} title={data.title} description={data.description || ""} id={data.id} key={data.id}/> );
                    }
                });
                let mapper2 = response.data.map((data) => {
                    if(data.type === "website"){
                        if(data.code){
                            return ( <ReadOnlyItemModel UpdateContent={this.UpdateContent} websitegithub="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} id={data.id} key={data.id}/> );
                        }
                        else{
                            return ( <ReadOnlyItemModel UpdateContent={this.UpdateContent} website="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} id={data.id} key={data.id}/> );
                        }
                    }
                });
                console.log(mapper);
                console.log(mapper2);
                this.setState({imagecontent: mapper});
                this.setState({webcontent: mapper2});
        })
        .catch((error) => {
            console.log(error.response);
        });
    }
    render() {
        return (
            <div className="flex flex-direction-column">
                <div className="region-1-2">
                    <div className="list flex flex-align-center flex-justify-center">Images</div>
                    <div className="list-content flex flex-align-center flex-justify-center flex-direction-column">{this.state.imagecontent}</div>
                </div>
                <div className="region-1-2">
                    <div className="list flex flex-align-center flex-justify-center">Websites</div>
                    <div className="list-content flex flex-align-center flex-justify-center flex-direction-column">{this.state.webcontent}</div>
                </div>
            </div>
        );
    }
}