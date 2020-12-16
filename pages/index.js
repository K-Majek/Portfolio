import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
export default class Index extends React.Component {

    componentDidMount() {
    }
render() {
    return(
        <>  
            <div className="flex flex-direction-column" style={{width: "100%"}}>
                <Navbar />
                <section className="section-landing flex flex-align-center flex-justify-center flex-direction-column">
                        <h1 className="starter">Witam na mojej stronie</h1>
                        <p className="starter">Jeśli jesteś tutaj po raz pierwszy, przewiń w dół, aby zapoznać się z moją osobą.</p>
                        <p className="starter">Sprawdź również nawigację, aby być na bieżąco z moją pracą, jak i również skontaktować się ze mną.</p>
                        <p className="starter">MIŁEGO OGLĄDANIA! :)</p>
                        <button className="start"><a href="#section-about">Zaczynamy!</a></button>
                </section>    
                <section id="section-about" className="section-about flex flex-justify-center flex-direction-column">
                    <header className="about-header flex flex-justify-end flex-align-center flex-direction-column">
                        <h2>Mam na imię Kamil.</h2>
                        <p>Mam 25 lat i jestem freelancerem-programistą. Moja przygoda z programowaniem jest bardzo długa, ponieważ wszystko się zaczęło, gdy w wieku 5 lat w swoje ręce dostałem Commodore 64</p>
                        <p>Obecnie, zakres prac, jakie przyjmuję, obraca się wokół tych tematyk:</p>
                    </header>
                    <article className="about-article flex flex-justify-center flex-align-center flex-direction-row">
                        <button className="about-item flex-direction-column">
                            <p>Grafika komputerowa:</p>
                            <ul>
                                <li>Proste layouty,</li>
                                <li>Edycja zdjęć,</li>
                                <li>Tworzenie grafik,</li>
                                <li>Przerabianie grafiki na wektor</li>
                            </ul>
                        </button>
                        <button className="about-item flex-direction-column">
                            <p>Programowanie:</p>
                            <ul>
                                <li>Backend jak i frontend</li>
                                <li>Budowanie dazy danych SQL i noSQL</li>
                                <li>Obycie z SP, OOP, RWD</li>
                                <li>Znajomość SOLID, DRY i KISS</li>
                            </ul>
                        </button>
                    </article>
                </section>    
                <section className="section-stack flex flex-justify-center flex-direction-column">
                    <header className="stack-header flex flex-direction-column flex-align-center flex-justify-center">
                        <h3>Narzędzia i technologie, z których korzystam na co dzień:</h3>
                    </header>
                    <article className="stack-article flex flex-direction-row flex-align-baseline flex-justify-around">
                        <div className="stack-container flex flex-justify-start flex-align-center flex-direction-column">
                            <p className="stack-h2">Oprogramowanie:</p>
                            <ul>
                                <li>Figma</li>
                                <li>Illustrator</li>
                                <li>Photoshop</li>
                                <li>Visual Studio Code</li>
                                <li>PuTTY</li>
                            </ul>
                        </div>
                        <div className="stack-container flex flex-justify-start flex-align-center flex-direction-column">
                            <p className="stack-h2">Technologie:</p>
                            <ul>
                                <li>HTML, CSS, JS</li>
                                <li>React.js</li>
                                <li>Node.js</li>
                                <li>Next.js</li>
                                <li>MongoDB</li>
                                <li>MySQL</li>
                            </ul>
                        </div>
                    </article>
                </section>    
                <section className="section-finish flex flex-align-center flex-justify-center flex-direction-column">
                    <h4>To będzie na tyle!</h4>
                    <p>Jakieś pytania?</p>
                    <p>Dobrze się składa, ponieważ przycisk poniżej przekieruje Ciebie do mojego formularza kontaktowego...</p>
                    <Link href="/contact"><button className="redirect flex flex-align-center flex-justify-center"><a>Napisz wiadomość...</a></button></Link>
                    <p>...lub po prostu skorzystaj z nawigacji w stopce!</p>
                </section> 
            </div>
            <Footer />   
        </>
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