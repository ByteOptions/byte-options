export default function Navbar() {
    return `<nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="container-fluid" id="nav-container">
                <a id="navLogo" class="navbar-brand nav-link" data-link href="/">
<!--                    <img src="/img/16316362702731.png" alt="" width="auto" height="65"-->
<!--                         class="d-inline-block align-text-top">-->
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent" style="max-width: max-content">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" aria-current="page" href="/" data-link>Search</a>-->
<!--                        </li>-->

                        <li class="nav-item">
                            <a class="nav-link" href="/creators" data-link>Creators</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/user" data-link>Account</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login" data-link>Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register" data-link>Register</a>
                        </li>
                       



                    </ul>
<!--                    <form id="nav-form" class="d-flex">-->
<!--                        <input class="form-control me-2" id="inputMain" type="search" placeholder="Search" aria-label="Search">-->
<!--                        <button class="btn btn-outline-dark" id="submit" type="submit">Search</button>-->
<!--                    </form>-->
                </div>
            </div>
        </nav>`
}
