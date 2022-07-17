import logo from '../assets/img/Banco_Pichincha_logo.png'
export default function DashboardNavbar(){
    return(
        <header>
            <nav>
                <img className='img-logo' src={logo} alt="logo banco" />
            </nav>
        </header>
    )
}