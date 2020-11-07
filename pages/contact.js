import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default class Contact extends React.Component {
    componentDidMount() {
        let supervisor = document.querySelector(".lazy-loader");
        supervisor.classList.add("displaycontent");
        let nav = document.querySelectorAll('.navbar-item[element-value]:not([element-value="/contact"])');
        for(let i = 0; i < nav.length; i++){
        nav[i].addEventListener("click", () => {
            let supervisor = document.querySelector(".lazy-loader");
            supervisor.classList.remove("displaycontent");
            supervisor.classList.add("enter-loading");
        });
        }
        let footer = document.querySelectorAll('.footer-link[element-value]:not([element-value="/contact"])');
        for(let i = 0; i < nav.length; i++){
        footer[i].addEventListener("click", () => {
            let supervisor = document.querySelector(".lazy-loader");
            supervisor.classList.remove("displaycontent");
            supervisor.classList.add("enter-loading");
        });
        }
    }
    render() {
        return (
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
                <section className="contactsection">
                    <div className="region-top">
                        <Navbar />
                    </div>
                    <div className="region-mid flex flex-center flex-column">
                        <h1>Chcesz się ze mną skontaktować? Użyj formularza poniżej.</h1>
                        <h2>Odpiszę najszybciej jak to tylko możliwe.</h2>
                        <form action="/API/sendmail" method="POST" id="contactform" className="flex flex-center flex-column">
                            <span>Przedstaw się lub podaj nazwę firmy.</span>
                            <input type="text" name="name" placeholder="Jan Kowalski" minLength="3" required/>
                            <span htmlFor="contact">Podaj E-Mail.</span>
                            <input type="email" name="contact" placeholder="example@mail.com" required />
                            <span>Opisz, z czym do mnie przychodzisz.</span>
                            <textarea placeholder="Chciałbym/Chciałabym się z Tobą skontaktować, ponieważ..." required/>
                            <button type="submit">Chcę się skontaktować</button>
                        </form>
                    </div>
                    <div className="region-bottom"></div>
                </section>
                <Footer />
            </div>
        );
    }
}