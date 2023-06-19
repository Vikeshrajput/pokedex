import { Link, Outlet } from "react-router-dom";

const Root = () => {
    return <>
        <header>
            <nav className="fixed top-0 bg-gray-100 z-10 w-full">
                <div className="flex bg-gray-100 pb-3 mt-4 px-1 lg:mx-16 md:mx-12 sm:mx-5 mx-4">
                    <div className="w-10 ml-2 rounded-full flex"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLkkciZfBngqmzceSUJ1DWENnuWp46TvGh-A&usqp=CAU" alt="" /><span className="ml-2 text-xl px-2">Pokemon</span></div>
                    <div className="ml-auto text-lg px-4">
                        <ul className="flex gap-10">
                            <li><Link to="/pokedex">Search</Link></li>
                            <li><Link to="/pokedex/listing">Listing page</Link></li>
                            <li><Link to="/pokedex/bookmarks">Bookmarks</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main className="">
            <Outlet />
        </main>
    </>
}

export default Root;