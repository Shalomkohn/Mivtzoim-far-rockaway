
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-light bg-light fixed-top border-bottom border-primary ">
                <div className="container">
                    <Link className="navbar-brand" to="/">Meevo</Link>
                    <span className="navbar-text">
                        בס״ד
                    </span>
                </div>
            </nav>

            {/* to push down */}
            <nav className="navbar border-bottom">
                <div className="container">
                    <a className="navbar-brand" href="#">Meevo</a>
                    <span className="navbar-text">
                        בס״ד
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Navbar