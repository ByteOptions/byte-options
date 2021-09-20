export default function Navbar() {
    return `<nav class="navbar navbar-expand-lg navbar-light p-0">
            <div class="container-fluid" id="nav-container">
                <a class="navbar-brand" data-link href="/">
                    <img src="/img/16316362702731.png" alt="" width="auto" height="65"
                         class="d-inline-block align-text-top">
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

<!--                        <li class="nav-item">-->
<!--                            <a class="nav-link" aria-current="page" href="/" data-link>Search</a>-->
<!--                        </li>-->

                        <li class="nav-item">
                            <a class="nav-link" href="/restaurants" data-link>Restaurants</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/recipes" data-link>Recipes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/me" data-link>Account</a>
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