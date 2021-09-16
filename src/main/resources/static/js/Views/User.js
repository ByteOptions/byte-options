import createView from "../createView.js";

export default function User(props) {
    return `
<header>
    <h1>Users Page</h1>
</header>
<main>
    <div>i
        ${props.users.map(user => `
        <div>

            <div class="row g-3">

                    <input type="text" class="form-control" data-id="" aria-label="First name" 
                            value="${user.id}" style="border-style: none">


                    <input type="text" class="form-control" placeholder="Username" aria-label="First name"
                           value="${user.username}" style="border-style: none">

                    <input type="text" class="form-control" placeholder="E-mail" aria-label="First name"
                           value="${user.email}" style="border-style: none">

                    <input type="password" class="form-control" placeholder="Password" aria-label="First name"
                           value="${user.password}" style="border-style: none">

            </div>
            <button type="button" id="edit-btn">Edit</button>
        </div>
        `).join('')}
    </div>
</main>
`;
}

export function UserEvent(){
}