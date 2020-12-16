import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import ReadOnlyItemModel from "../components/ReadOnlyItemModel";

class Portfolio extends React.Component {
    constructor() {
        super();
        this.state = {
            sliderCount: 0,
            currentWidth: 0
        }
        this.move = direction => {
            /*
                *PLAN:
                1. Set slider state 
                2. get all the slider elements 
                3. based on current value, move away one element and move in the other
                4. if the value has to become greater than elements in container, reset, or do nothing
            */
            let websiteElements = document.querySelectorAll(".website-slider-container .item-slider").length;
            switch(direction){
                case "left":
                    if(this.state.sliderCount > 0)
                    this.setState({sliderCount: this.state.sliderCount - 1});
                    break;
                case "right":
                    if(this.state.sliderCount < websiteElements - 1)
                    this.setState({sliderCount: this.state.sliderCount + 1});
                    break;
                default:
                    slider.style.right = `${this.state.currentWidth*0.8*this.state.sliderCount}px`
                    break;
            }
            // slider.style.right = `${this.state.sliderCount*80}vw`;
            // console.log("slidercount", this.state.sliderCount);
            // console.log("direction", direction)
        }
    }
    componentDidMount() {
        this.setState({currentWidth: window.innerWidth});
        axios({
            method: 'get',
            url: '/API/GetImages'
        })
        .then((response) => {
                let mapper = response.data.map((data) => {
                    return ( <div className="item-slider flex flex-align-center flex-justify-center" key={data.id}><ReadOnlyItemModel image="true" thumbnailurl={data.thumbnailurl} innerurl={data.innerurl} title={data.title} description={data.description || ""} key={data.id}/></div> );
                });
                this.setState({imageContent: mapper});
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
                        return ( <div className="item-slider flex flex-align-center flex-justify-center" key={data.id}><ReadOnlyItemModel websitegithub="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} key={data.id}/></div>);
                    }
                    else{
                        return (<div className="item-slider flex flex-align-center flex-justify-center" key={data.id}><ReadOnlyItemModel website="true" innerurl={data.innerurl || ""} outerurl={data.outerurl || ""} title={data.title || ""} description={data.description || ""} code={data.code || ""} key={data.id}/></div>);
                    }
                });
                this.setState({websiteContent: mapper});
        })
        .catch((error) => {
            console.log(error.response);
        });
        document.addEventListener("resize", () => {
            this.setState({currentWidth: window.innerWidth});
        })
    }
    componentDidUpdate() {
        let slider = document.querySelector(".website-slider-container");
        slider.style.right = `${this.state.sliderCount*80}vw`;
    }
    render() {
        return (
            <div className="portfolio">
                <div className="flex flex-direction-column" style={{width: "100%"}}>
                    <Navbar/>
                    <section className="portfolio-title flex flex-align-center flex-justify-center flex-direction-column hide-overflow">
                        <h1>Na tej podstronie znajdziesz grafiki oraz strony internetowe wykonane przeze mnie.</h1>
                        <p>Miłego przeglądania!</p>
                        <p>( Strzałkami można przewijać zawartość, a po kliknięciu w okno ujawnią się szczegóły. )</p>
                    </section>
                    <section className="portfolio-websites flex flex-align-center flex-justify-around flex-direction-column hide-overflow">
                        <h2>Strony internetowe</h2>
                        <div id="websites-container" className="flex flex-align-center flex-justify-center">
                            <a className="container-arrow-left flex flex-align-center flex-justify-center" onClick={this.move.bind(this, "left")}>
                                <picture>
                                    <source srcSet="static/assets/arrow-left.svg" />
                                    <img className="svg-arrow"/>
                                </picture>
                            </a>
                            <article className="container-content flex flex-align-center hide-overflow">
                                <div className="website-slider-container flex flex-align-center">
                                    {this.state.websiteContent}
                                </div>
                            </article>
                            <a className="container-arrow-right flex flex-align-center flex-justify-center" onClick={this.move.bind(this, "right")}>
                                <picture>
                                    <source srcSet="static/assets/arrow-right.svg" />
                                    <img className="svg-arrow"/>
                                </picture>
                            </a>
                        </div>
                    </section>
                    <section className="portfolio-graphics flex flex-align-center flex-justify-center flex-direction-column hide-overflow">
                        <h3>Grafika komputerowa</h3>
                        <div id="graphics-container" className="flex flex-align-center flex-justify-center">
                            <a className="container-arrow-left flex flex-align-center flex-justify-center" onClick={this.move.bind(this, "left")}>
                                <picture>
                                    <source srcSet="static/assets/arrow-left.svg" />
                                    <img className="svg-arrow"/>
                                </picture>
                            </a>
                            <article className="container-content flex flex-justify-center flex-align-center hide-overflow">
                                <div className="image-slider-container flex flex-align-center">
                                    {this.state.imageContent}
                                </div>
                            </article>
                            <a className="container-arrow-right flex flex-align-center flex-justify-center" onClick={this.move.bind(this, "right")}>
                                <picture>
                                    <source srcSet="static/assets/arrow-right.svg" />
                                    <img className="svg-arrow"/>
                                </picture>
                            </a>
                        </div>
                    </section>
                </div>
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