import Link from 'next/link';
export default function Footer() {
    function unhover(e) {
        if(!e.target.classList.contains("unhover")) { e.target.classList.add("unhover"); }
    }
    function hover(e) {
        if(e.target.classList.contains("unhover")) { e.target.classList.remove("unhover"); }
    }
    return (
        <footer className="card flex flex-center flex-column">
            <div className="region-piece-1-4">
            </div>
            <div className="region-piece-1-4 flex flex-center">
                <a className="mail pointer" 
                    href="mailto:kamil.majek95@gmail.com"
                    onMouseEnter={hover}
                    onMouseLeave={unhover}
                >
                    kamil.majek95@gmail.com
                </a>
            </div>
            <div className="region-piece-1-4 flex flex-center flex-column">
                <div className="socials flex flex-center scale-half-v">
                    <Link href="https://github.com/K-majek">
                        <img 
                            height="50%"
                            src="/static/assets/Github.svg"
                            className="portal pointer side-margin-h" 
                            alt="GH"
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                        />
                    </Link>
                    <Link href="https://www.linkedin.com/in/kamil-majek-083b761b2/">
                        <img 
                            height="50%"
                            src="/static/assets/Linkedin.svg"
                            className="portal pointer side-margin-h" 
                            alt="IN"
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                        />
                    </Link>
                </div>
                <div className="card-nav flex flex-center scale-half-v">
                    <Link href="/">
                        <a 
                            className="footer-link pointer side-margin-h"
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                            element-value="/index"
                        >
                            O mnie
                        </a>
                    </Link>
                    <Link href="/portfolio">
                        <a 
                            className="footer-link pointer side-margin-h"
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                            element-value="/portfolio"
                        >
                            Portfolio
                        </a>
                    </Link>
                    <Link href="/contact">
                        <a 
                            className="footer-link pointer side-margin-h"
                            onMouseEnter={hover}
                            onMouseLeave={unhover}
                            element-value="/contact"
                        >
                            Kontakt
                        </a>
                    </Link>
                </div>
            </div>
            <div className="region-piece-1-4 flex flex-center flex-column">
                <Link href="/licence">
                    <a 
                        className="to-licence pointer top-margin-h" 
                        target="_blank" 
                        rel="noreferrer"
                        onMouseEnter={hover}
                        onMouseLeave={unhover}
                    >
                        Warunki Użytkowania
                    </a>
                </Link>
                <div className="copyright top-margin-h">
                    &copy; Kamil Majek, 2020
                </div>
                <div className="copyright top-margin-h">
                    Licencja CC BY-NC 3.0
                </div>
            </div>
        </footer>
    );
}
