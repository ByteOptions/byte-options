import createView from "../createView.js";

export default function Register(props){
    return `
<section  class="h-100 h-custom" style="">
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-8 col-xl-6">
        <div id="registerForm" class="card rounded-3">
          <img src="./img/registerFoodPicture.jpeg" class="w-100" style="height: 300px; border-top-left-radius: .3rem; border-top-right-radius: .3rem; object-fit: cover;" alt="Sample photo">
          <div class="card-body p-4 p-md-5">
            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

            <form class="px-md-2">

              <div class="form-outline mb-4">
                <input id="emailInput" type="text" class="form-control" />
                <label class="form-label" for="form3Example1q">Email</label>
              </div>
              <div class="form-outline mb-4">
                <input id="usernameInput" type="text" class="form-control" />
                <label class="form-label" for="form3Example1q">Username</label>
              </div>
              <div class="form-outline mb-4">
                <input id="passwordInput" type="password" class="form-control" />
                <label class="form-label" for="form3Example1q">Password</label>
              </div>
              <div class="form-outline mb-4">
                <input id="confirmPassword" type="password" class="form-control" />
                <label class="form-label" for="form3Example1q">Confirm Password</label>
              </div>

              <div class="row" style="place-content: space-around">
                <div class="col-md-6 mb-4">
                  <div class="form-outline datepicker">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleDatepicker1"
                    />
                    <label for="exampleDatepicker1" class="form-label">Enter Zip Code</label>
                  </div>
                </div>
              </div>

              <button id="registerButton" type="submit" style="background-color: transparent; border: 1px solid transparent; border-color: #212529" class="btn btn-lg mb-1">Sign Up</button>

            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

export function createRegisterEvents(){
    registerEvent()
}

function registerEvent(){
    $("#registerButton").click(function(){

        let newUser = {
            username : $("#usernameInput").val(),
            email: $("#emailInput").val(),
            password: $("#passwordInput").val(),
        }
        console.log(newUser)

        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        };

        fetch("/api/users", request)
            .then((response) => {
                console.log(response.status)
                createView("/")
            });
    })
}