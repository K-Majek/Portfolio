import EditableItemModel from "./EditableItemModel";
import axios from "axios";

export default class Edit_Items extends React.Component {
    constructor() {
        super();
        this.state = { 
            content: "main menu"
        };
        this.navigator = value => {
            this.setState({content: value});
        }
        this.UpdateContent = e => {
            e.preventDefault();
            const form = document.querySelector(".edit-form");
            const formData = new FormData(form);
            axios({
                method: "put",
                headers: { 'content-type': 'multipart/formdata' },
                url: '/API/UpdateContent',
                data: formData
            })
            .then((response) => { console.log(response) })
            .catch((error) => {console.log(error.data)})
        }
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: '/API/GetContent'
        })
        .then((response) => {
                let mapper = response.data.map((data) => {
                    if(data.type === "image") {
                        return ( <EditableItemModel UpdateContent={this.UpdateContent} image="true" thumbnailurl={"static/images/" + data.innerurl} innerurl={"static/images/" + data.outerurl} title={data.title} description={data.description || ""} id={data.id} key={data.id}/> );
                    }
                });
                let mapper2 = response.data.map((data) => {
                    if(data.type === "website"){
                        if(data.code){
                            return ( <EditableItemModel UpdateContent={this.UpdateContent} websitegithub="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} id={data.id} key={data.id}/> );
                        }
                        else{
                            return ( <EditableItemModel UpdateContent={this.UpdateContent} website="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} id={data.id} key={data.id}/> );
                        }
                    }
                });
                this.setState({imagecontent: mapper});
                this.setState({webcontent: mapper2});
        })
        .catch((error) => {
            console.log(error.response);
        });
    }
    render() {
        switch(this.state.content) {
            case "images":
                return (
                    <section className="edit-section">
                        <button className="formbutton custom" onClick={this.navigator.bind(this, "main menu")} >Go Back</button>
                        <p className="edit-section-title flex flex-justify-center">Images</p>
                        <div className="flex flex-align-center flex-direction-row">{this.state.imagecontent}</div>
                        <button className="formbutton custom" onClick={this.navigator.bind(this, "main menu")} >Go Back</button>
                    </section>
                );
            case "websites":
                return (
                    <section className="edit-section">
                        <button className="formbutton custom" onClick={this.navigator.bind(this, "main menu")} >Go Back</button>
                        <p className="edit-section-title flex flex-justify-center">Websites</p>
                        <div className="flex flex-align-center flex-direction-row">{this.state.webcontent}</div>
                        <button className="formbutton custom" onClick={this.navigator.bind(this, "main menu")} >Go Back</button>
                    </section>
                );
            default:
                return (
                    <section className="edit-section flex flex-direction-column">
                        <button className="formbutton custom" onClick={this.navigator.bind(this, "images")} >Images</button>
                        <button className="formbutton custom" onClick={this.navigator.bind(this, "websites")} >Websites</button>
                    </section>
                );
        }
        
    }
}