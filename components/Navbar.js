import Link from 'next/link'
export default function Navbar(){
    return (
        <nav className="navbar">
            <Link href="/">
                <a 
                    className="navbar-item pointer" 
                    element-value="/index"
                    style={{margin: "2vh 4vw"}}
                >
                    O mnie
                </a>
            </Link>
            <Link href="/portfolio">
                <a 
                    className="navbar-item pointer" 
                    element-value="/portfolio"
                    style={{margin: "2vh 4vw"}}
                >
                    Portfolio
                </a>
            </Link>
            <Link href="/contact">
                <a 
                    className="navbar-item pointer" 
                    element-value="/contact"
                    style={{margin: "2vh 4vw"}}
                >
                    Kontakt
                </a>
            </Link>
        </nav>
    );
}
