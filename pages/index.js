import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default class Index extends React.Component {

    componentDidMount() {
        let customevent = new Event("Event");
        let checkvalue = 0;
        customevent.initEvent("Lazy-Checker", true, true);
        document.addEventListener("Lazy-Checker", function(e) {
            checkvalue++;
            if(checkvalue == 5) {
                let supervisor = document.querySelector(".lazy-loader");
                supervisor.classList.add("displaycontent");
            }
        });
        let bg1 = document.querySelector(".greeting-lazy");
        let bg2 = document.querySelector(".stack-lazy");
        let bg3 = document.querySelector(".about-lazy1");
        let bg4 = document.querySelector(".about-lazy2");
        let bg5 = document.querySelector(".about-lazy3");
        bg1.classList.add('bg-loading');
        bg2.classList.add('bg-loading');
        bg3.classList.add('bg-loading');
        bg4.classList.add('bg-loading');
        bg5.classList.add('bg-loading');
        let preloaderImg1 = document.createElement("img");
        let preloaderImg2 = document.createElement("img");
        let preloaderImg3 = document.createElement("img");
        let preloaderImg4 = document.createElement("img");
        let preloaderImg5 = document.createElement("img");
        preloaderImg1.src = "/static/assets/spejs 3.png";
        preloaderImg2.src = "/static/assets/pexels-neo-2653362.jpg";
        preloaderImg3.src = "/static/assets/IMG_8315.jpg";
        preloaderImg4.src = "/static/assets/c++.jpg";
        preloaderImg5.src = "/static/assets/earphones-4839690_1920.jpg";
        preloaderImg1.addEventListener('load', (event) => {
            bg1.classList.remove("bg-loading");
            bg1.style.height = "100vh";
            bg1.style.width = "100vw";
            bg1.style.backgroundImage = `url(${preloaderImg1.src})`;
            bg1.style.backgroundPosition = "center center";
            bg1.style.backgroundSize = "cover";
            bg1.style.backgroundColor = "#464646";
            bg1.style.backgroundRepeat = "no-repeat";
            bg1.style.opacity = "0.75";
            preloaderImg1 = null;
            document.dispatchEvent(customevent);
        });
        preloaderImg2.addEventListener('load', (event) => {
            bg2.classList.remove("bg-loading");
            bg2.style.height = "100vh";
            bg2.style.width = "100vw";
            bg2.style.backgroundImage = `url(${preloaderImg2.src})`;
            bg2.style.backgroundPosition = "center center";
            bg2.style.backgroundAttachment = "fixed";
            bg2.style.backgroundSize = "cover";
            bg2.style.backgroundColor = "#464646";
            bg2.style.backgroundRepeat = "no-repeat";
            bg2.style.opacity = "0.2";
            preloaderImg2 = null;
            document.dispatchEvent(customevent);
        });
        preloaderImg3.addEventListener('load', (event) => {
            bg3.classList.remove("bg-loading");
            bg3.style.height = "100vh";
            bg3.style.width = "100vw";
            bg3.style.backgroundImage = `url(${preloaderImg3.src})`;
            bg3.style.backgroundPosition = "center center";
            bg3.style.backgroundAttachment = "fixed";
            bg3.style.backgroundSize = "cover";
            bg3.style.backgroundColor = "#464646";
            bg3.style.backgroundRepeat = "no-repeat";
            bg3.style.opacity = "0.2";
            preloaderImg3 = null;
            document.dispatchEvent(customevent);
        });
        preloaderImg4.addEventListener('load', (event) => {
            bg4.classList.remove("bg-loading");
            bg4.style.height = "100vh";
            bg4.style.width = "100vw";
            bg4.style.backgroundImage = `url(${preloaderImg4.src})`;
            bg4.style.backgroundPosition = "center center";
            bg4.style.backgroundAttachment = "fixed";
            bg4.style.backgroundSize = "cover";
            bg4.style.backgroundColor = "#464646";
            bg4.style.backgroundRepeat = "no-repeat";
            bg4.style.opacity = "0.2";
            preloaderImg4 = null;
            document.dispatchEvent(customevent);
        });
        preloaderImg5.addEventListener('load', (event) => {
            bg5.classList.remove("bg-loading");
            bg5.style.height = "100vh";
            bg5.style.width = "100vw";
            bg5.style.backgroundImage = `url(${preloaderImg5.src})`;
            bg5.style.backgroundPosition = "center center";
            bg5.style.backgroundAttachment = "fixed";
            bg5.style.backgroundSize = "cover";
            bg5.style.backgroundColor = "#464646";
            bg5.style.backgroundRepeat = "no-repeat";
            bg5.style.opacity = "0.2";
            preloaderImg5 = null;
            document.dispatchEvent(customevent);
        });
        let nav = document.querySelectorAll('.navbar-item[element-value]:not([element-value="/index"])');
        for(let i = 0; i < nav.length; i++){
        nav[i].addEventListener("click", () => {
            let supervisor = document.querySelector(".lazy-loader");
            supervisor.classList.remove("displaycontent");
            supervisor.classList.add("enter-loading");
        });
        }
        let footer = document.querySelectorAll('.footer-link[element-value]:not([element-value="/index"])');
        for(let i = 0; i < nav.length; i++){
        footer[i].addEventListener("click", () => {
            let supervisor = document.querySelector(".lazy-loader");
            supervisor.classList.remove("displaycontent");
            supervisor.classList.add("enter-loading");
        });
        }
    }
render() {
    return(
        <div>
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
            <section className="greeting flex flex-center flex-column">
                <div className="greeting-lazy absolute"></div>
                <div className="region-top on-top">
                    <Navbar />
                </div>
                <div className="region-mid flex flex-center flex-column on-top">
                    <h1>Witam Serdecznie</h1>
                    <h2>Mam na imię Kamil</h2>
                    <h3>Zajmuję się programowaniem, grafiką oraz produkcją muzyki</h3>
                    <h4>Przewiń w dół, aby przeglądać zawartość strony</h4>
                </div>
                <div className="region-bot on-top"></div>
            </section>
            <section className="stack flex flex-center flex-column">
                <div className="stack-lazy absolute"></div>
                <div className="region-top flex flex-center on-top">
                    <header className="stack-header flex flex-center scale">
                        <h1>oto, czego używam na co dzień:</h1>
                    </header>
                </div>
                <div className="region-mid-upper flex flex-row on-top">
                    <div className="stack-software-header flex flex-center scale-half">
                        <h3>programy:</h3>
                    </div>
                    <div className="stack-tech-header flex flex-center scale-half">
                        <h3>technologie:</h3>
                    </div>
                </div>
                <div className="region-mid-lower flex flex-row on-top">
                    <ul className="stack-software-items flex flex-center flex-column scale-half">
                        <li className="style-none"><img className="stack-image" src="" alt="vs"/>Visual Studio</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="vs_code"/>Visual Studio Code</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="fl_studio"/>FL Studio</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="audacity"/>Audacity</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="photoshop"/>Adobe Photoshop</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="illustrator"/>Adobe Illustrator</li>
                    </ul>
                    <ul className="stack-tech-items flex flex-center flex-column scale-half">
                        <li className="style-none"><img className="stack-image"  src="" alt="html"/>HTML5</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="css"/>CSS3</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="js"/>JavaScript</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="node"/>Node.js</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="express"/>Express.js</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="react"/>React.js</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="next"/>Next.js</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="mysql"/>MySQL</li>
                        <li className="style-none"><img className="stack-image"  src="" alt="mongo"/>MongoDB</li>
                    </ul>
                </div>
                <div className="region-bot on-top"></div>


            </section>
            <section className="about flex flex-center flex-column flex-wrap">
                <div className="region1">
                    <div className="about-lazy1 absolute"/>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        <h1 className="text-center">Parę słów o mnie...</h1>
                    </div>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        <p className="text-center">
                            Swoją przygodę z programowaniem zacząłem praktycznie od czasów dzieciństwa, gdy pierwsze polecenia pisałem w języku Basic V2 na Commodore 64. 
                            Jako ówczesny 6-latek, obsługa takiego komputera była dla mnie nie lada wyzwaniem, ponieważ w tamtych czasach nie było takich bogatych zasobów wiedzy, jak dzisiaj. 
                            Pierwsze polecenia zacząłem pisać właściwie w oparciu o stare gazety na temat komputerów typu Amiga, Atari, Commodore, IBM, Amstrad i tym podobnych, które udało się znaleźć gdzieś u sąsiadów. 
                            Metodą prób i błędów, po jakimś czasie w końcu zrozumiałem, jakie komendy co potrafią zrobić i w oparciu o takie rzeczy pisałem pierwsze programy.
                        </p>
                    </div>
                    <div className="region-piece-1-3 flex flex-center on-top">
                    </div>
                </div>
                <div className="region2">
                    <div className="about-lazy2 absolute"/>
                    <div className="region-piece-1-3 flex flex-center on-top">

                    </div>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        <p className="text-center flex flex-center">
                            Od czasów technikum miałem do czynienia po raz pierwszy z nowszymi językami, niż ten Basic. Na początku z Pascalem, potem z C++. 
                            Również to był pierwszy moment, gdzie w końcu mogłem pracować z pełną dokumentacją i zrozumieć programowanie.
                            Powiedziałbym, że programowanie wtedy szło mi świetnie, wszystko było w końcu takie przejrzyste i zrozumiałe, 
                            a nauczyciel mnie zawsze chwalił za pisanie rzeczy ponad poziom nauczania.
                        </p>
                    </div>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        
                    </div>
                </div>
                <div className="region3">
                    <div className="about-lazy3 absolute"/>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        <p className="text-center flex flex-center">
                            W tych latach również miałem pierwsze kontakty z produkcją muzyki. Zawsze myślałem, że bez drogiego sprzętu nie da rady, jednak kolega z klasy zainspirował mnie do spróbowania pracy na programie FL Studio.
                            Na początku praca była mozolna, jednak opanowałem program, a obecnie potrafię stworzyć każdy dźwięk, jaki tylko zechcę.
                            Mam najwięcej frajdy obecnie z pracą z muzyką elektroniczną.
                        </p>
                    </div>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        <p className="text-center flex flex-center">
                            Po ukończeniu technikum, nie byłem do końca pewien, co chciałem robić w życiu.
                            Postanowiłem więc spróbować się edukować w innych kierunkach i pracować w międzyczasie na utrzymanie, jednak w 2018 roku stwierdziłem,
                            że to co robiłem do tamtej pory to jest marnowanie czasu i postanowiłem wrócić do czegoś, co mnie najbardziej satysfakcjonowało. Mianowicie - tworzenie rzeczy od podstaw.
                        </p>
                    </div>
                    <div className="region-piece-1-3 flex flex-center on-top">
                        <p className="text-center flex flex-center">
                            W sumie o mnie to jest na tyle. Na mojej stronie można też znaleźć moje ostatnie prace programistyczne jak i graficzne. Zachęcam również do skorzystania z formularza kontaktowego. Linki są dostępne zarówno na początku strony jak i poniżej. Zapraszam do oglądania.
                        </p>
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}
}

/*
1)
nav
content
2)
greeting
stack
3)
projects
a) programming              }
b) graphics/drawing         }
c) music                    }
4)
contact form
footer - socials, 
*/