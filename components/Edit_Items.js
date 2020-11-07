import EditableItemModel from "./EditableItemModel";
import axios from "axios";

export default class Edit_Items extends React.Component {
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
                    return ( <EditableItemModel image="true" thumbnailurl={data.thumbnailurl} innerurl={data.innerurl} title={data.title} description={data.description || ""} key={data.id}/> );
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
                        return ( <EditableItemModel websitegithub="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} key={data.id}/> );
                    }
                    else{
                        return ( <EditableItemModel website="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} key={data.id}/> );
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
            <div className="flex flex-center flex-column region-full">
                <div className="region-piece-1-2">
                    <div className="region-piece-1-3 flex flex-center">Images</div>
                    <div className="region-piece-2-3 flex flex-center flex-column">{this.state.imagecontent}</div>
                </div>
                <div className="region-piece-1-2">
                    <div className="region-piece-1-3 flex flex-center">Websites</div>
                    <div className="region-piece-2-3 flex flex-center flex-column">{this.state.webcontent}</div>
                </div>
            </div>
        );
    }
}