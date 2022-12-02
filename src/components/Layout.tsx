import { A } from "solid-start"
import Avatar from "./Avatar"

export default function Layout(props: any) {
    return (
        <>
            <HeaderBar />

            <main class="bg-base-300 mx-0 sm:mx-auto sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12 p-2 md:p-4 md:pt-0 border-2 border-primary border-opacity-20 md:pb-16">

                {props.children}

            </main>

            <FooterBar />
        </>
    )
}


function HeaderBar() {
    return (
        <div class="navbar bg-base-100 mb-4">
            <NavbarStart />

            <NavbarMiddle />

            <NavbarEnd />
        </div>
    )
}



function NavbarStart() {

    return (
        <div class="navbar-start">

            <div class="dropdown">
                <label tabIndex={0} class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>

                <HeaderLinks listClass="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" />

            </div>

            <A href="/" ><img src={`/blue_dwarf_space_long_logo-undefined.png`} alt="Blue Dwarf Space logo" class="max-h-12 max-w-36 cursor-pointer" /></A>

        </div>
    )
}



function NavbarMiddle() {
    return (
        <div class="navbar-center hidden lg:flex">
            <HeaderLinks listClass="menu menu-horizontal p-0 font-bold" />
        </div>
    )
}



function NavbarEnd() {
    return (
        <div class="navbar-end">
            <A href="/account" class="btn btn-circle btn-accent">
                <Avatar />
            </A>
        </div>
    )
}


function HeaderLinks(props: any) {

    return (

        <ul tabIndex={0} class={props.listClass} >
            <li><A href="/typography">Typo</A></li>
            {/* <li tabIndex={0}>
            <Link href="/linktwo">
                Parent
            </Link>
            <ul class="p-2 bg-base-100">
                <li><Link href="/linktwosubone">Submenu 1</Link></li>
                <li><Link href="/linktwosubtwo">Submenu 2</Link></li>
            </ul>
        </li> */}
            {/* <li><Link href="/users">Users</Link></li> */}
            {/* <li><Link href="/typography">Typography</Link></li> */}
        </ul>


    )

}









function FooterBar() {
    return (
        <footer class="footer footer-center p-4 mt-24 text-base-content
        bg-base-100 flex justify-between">
            <A href={"/"}><img src="/blue_dwarf_space_notext_logo_small.png" alt="Blue Dwarf Space logo"
                class="w-8 justify-self-start" /></A>

            <A href={"/asdf"}>Stuff</A>
        </footer>
    )
}

