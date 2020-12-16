import Link from 'next/link';
export default function Footer() {
    return (
        <footer className="card flex flex-align-center flex-justify-end flex-direction-column">
            <a className="mail pointer hover" 
                href="mailto:kamil.majek95@gmail.com"
            >
                kamil.majek95@gmail.com
            </a>
            <div className="socials flex flex-align-center flex-justify-center">
                <Link href="https://github.com/K-majek">
                    <img 
                        height="30%"
                        src="/static/assets/Github.svg"
                        className="portal pointer" 
                        alt="GH"
                    />
                </Link>
            </div>
            <div className="card-nav flex flex-center">
                <Link href="/">
                    <a 
                        className="footer-link pointer"
                        element-value="/index"
                    >
                        <p>O mnie</p>
                    </a>
                </Link>
                <Link href="/portfolio">
                    <a 
                        className="footer-link pointer"
                        element-value="/portfolio"
                    >
                        <p>Portfolio</p>
                    </a>
                </Link>
                <Link href="/contact">
                    <a 
                        className="footer-link pointer "
                        element-value="/contact"
                    >
                        <p>Kontakt</p>
                    </a>
                </Link>
            </div>
            <div className="licence flex flex-align-center flex-justify-center flex-direction-column">
                <Link href="/licence">
                    <a 
                        className="licence-readme pointer" 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        Warunki Użytkowania
                    </a>
                </Link>
                <div className="copyright">
                    <p>&copy; Kamil Majek, 2020</p>
                </div>
                <div className="copyright">
                    <p>Licencja CC BY-NC 3.0</p>
                </div>
            </div>
        </footer>
    );
}
