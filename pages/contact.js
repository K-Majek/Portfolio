import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default class Contact extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div className="flex flex-direction-column" style={{width: "100%"}}>
                    <Navbar />
                    <section className="contactsection flex flex-justify-center flex-align-center flex-direction-column">
                        <h1>Chcesz się ze mną skontaktować? Użyj formularza poniżej.</h1>
                        <h2>Odpiszę najszybciej jak to tylko możliwe.</h2>
                        <form action="/API/sendmail" method="POST" id="contactform" className="flex flex-justify-center flex-align-center flex-direction-column">
                            <label htmlFor="name">Przedstaw się lub podaj nazwę firmy.</label>
                            <input className="forminput" type="text" name="name" placeholder="Jan Kowalski" minLength="3" autoComplete="off" required/>
                            <label htmlFor="contact">Podaj E-Mail.</label>
                            <input className="forminput" type="email" name="contact" placeholder="example@mail.com" autoComplete="off" required />
                            <label htmlFor="message">Opisz, z czym do mnie przychodzisz.</label>
                            <textarea className="formtextarea" name="message" placeholder="Chciałbym/Chciałabym się z Tobą skontaktować, ponieważ..." required/>
                            <button className="formbutton" type="submit">Chcę się skontaktować!</button>
                        </form>
                    </section>
                </div>

                <Footer />
            </div>
        );
    }
}