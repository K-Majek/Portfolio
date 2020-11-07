import Link from 'next/link'
export default function Navbar(){
    function unhover(e) {
        if(!e.target.classList.contains("unhover")) { e.target.classList.add("unhover"); }
    }
    function hover(e) {
        if(e.target.classList.contains("unhover")) { e.target.classList.remove("unhover"); }
    }
    return (
        <nav className="navbar flex flex-center on-top">
            <div className="navbar-left"></div>
            <div className="navbar-right flex flex-center">
                <Link href="/">
                    <a 
                        className="navbar-item pointer" 
                        element-value="/index"
                        onMouseEnter={hover} 
                        onMouseLeave={unhover}
                    >
                        O mnie
                    </a>
                </Link>
                <Link href="/portfolio">
                    <a 
                        className="navbar-item pointer" 
                        element-value="/portfolio"
                        onMouseEnter={hover} 
                        onMouseLeave={unhover}
                    >
                        Portfolio
                    </a>
                </Link>
                <Link href="/contact">
                    <a 
                        className="navbar-item pointer" 
                        element-value="/contact"
                        onMouseEnter={hover} 
                        onMouseLeave={unhover}
                    >
                        Kontakt
                    </a>
                </Link>
            </div>
        </nav>
    );
}
