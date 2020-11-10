import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';

class Portfolio extends React.Component {
    constructor() {
        super();
        this.state = {
            websites: {

            },
            graphics: {

            }
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: '/API/GetContent'
        })
        .then((response) => {
                let mapper = response.data.map((data) => {
                    if(data.type == "website") { return ( <img src={data.URL} key={data.id} alt="website"/> ) }
                });
                this.setState({webcontent: mapper});
              }, (error) => {
                console.log(error);
              }
        );
        let supervisor = document.querySelector(".lazy-loader");
        supervisor.classList.add("displaycontent");
        let nav = document.querySelectorAll('.navbar-item[element-value]:not([element-value="/portfolio"])');
        for(let i = 0; i < nav.length; i++){
        nav[i].addEventListener("click", () => {
            let supervisor = document.querySelector(".lazy-loader");
            if(supervisor.classList.contains("displaycontent"))supervisor.classList.remove("displaycontent");
            if(!supervisor.classList.contains("enter-loading"))supervisor.classList.add("enter-loading");
        });
        }
        let footer = document.querySelectorAll('.footer-link[element-value]:not([element-value="/portfolio"])');
        for(let i = 0; i < nav.length; i++){
        footer[i].addEventListener("click", () => {
            let supervisor = document.querySelector(".lazy-loader");
            if(supervisor.classList.contains("displaycontent"))supervisor.classList.remove("displaycontent");
            if(!supervisor.classList.contains("enter-loading"))supervisor.classList.add("enter-loading");
        });
        }
    }
    render() {
        return (
            <div className="portfolio">
                <div className="lazy-loader fixed flex-center">
                    <div>L</div>
                    <div>o</div>
                    <div>a</div>
                    <div>d</div>
                    <div>i</div>
                    <div>n</div>
                    <div>g</div>
                    <div>.</div>
                    <div>.</div>
                    <div>.</div>
                </div>
                <div className="region1-top">
                    <Navbar/>
                </div>
                <div className="region1-mid flex flex-center">
                    <h1>Poniżej znajdują się strony internetowe, projekty stron oraz inne prace graficzne</h1>
                </div>
                <div className="region1-bot"></div>
                <div className="region2-top flex flex-center">
                    <h1>Ostatnie strony WWW</h1>
                </div>
                <div className="region2-mid flex flex-center flex-wrap">
                    {this.state.webcontent}
                </div>
                <div className="region2-bot"></div>
                <div className="region3-top flex flex-center">
                    <h1>Ostatnie grafiki</h1>
                </div>
                <div className="region3-mid">{}</div>
                <div className="region3-bot"></div>
                <Footer/>
            </div>
        );
    }
}

export default Portfolio;

/*
    how to play with this:
    1) get all the items from the database; it must have name, url, type and category columns
    2) sort everything by their category then order it by date (id is as Date.now so it's good method)
    3) map everything to the components with a link to the image alone on click or the link to the github/hosted site:
*/