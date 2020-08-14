import {useRouter} from "next/router";
export default function Content() {
    const router = useRouter();
    return(
        <div className="myWebsite">
            <nav>
                <div className="flex flex-center">

                </div>
            </nav>
            <header>
                {/* greeting here */}
            </header>
            <section>
                {/* about my stack */}
            </section>
            <section>
                {/* programming projects */}
            </section>
            <section>
                {/* graphics projects, if existing */}
            </section>
            <section>
                {/* musical projects if existing */}
            </section>
            <footer>
                {/* contact form and socials */}
            </footer>
        </div>
    )
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