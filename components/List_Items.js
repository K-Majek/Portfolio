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
            url: '/API/GetImages'
        })
        .then((response) => {
                let mapper = response.data.map((data) => {
                    return ( <ReadOnlyItemModel image="true" thumbnailurl={data.thumbnailurl} innerurl={data.innerurl} title={data.title} description={data.description || ""} key={data.id}/> );
                });
                this.setState({imagecontent: mapper});
        })
        .catch((error) => {
            console.log(error.response);
        });
        axios({
            method: 'get',
            url: '/API/GetWebsites'
        })
        .then((response) => {
                let mapper = response.data.map((data) => {
                    if(data.code){
                        return ( <ReadOnlyItemModel websitegithub="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} key={data.id}/> );
                    }
                    else{
                        return ( <ReadOnlyItemModel website="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} key={data.id}/> );
                    }
                });
                this.setState({webcontent: mapper});
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