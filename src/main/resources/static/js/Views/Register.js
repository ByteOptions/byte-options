import createView from "../createView.js";

export default function Register(props){
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Register</title>
</head>
<body>
<section class="vh-100" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register An Account</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input id="usernameInput" type="text" class="form-control" />
                      <label class="form-label" for="form3Example1c">Username</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input id="emailInput" type="email" class="form-control" />
                      <label class="form-label" for="form3Example3c">Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input id="passwordInput" type="password" class="form-control" />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

<!--                  <div class="d-flex flex-row align-items-center mb-4">-->
<!--                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>-->
<!--                    <div class="form-outline flex-fill mb-0">-->
<!--                      <input id="passwordConfirmInput" type="password" class="form-control" />-->
<!--                      <label class="form-label" for="form3Example4cd">Confirm Password</label>-->
<!--                    </div>-->
<!--                  </div>-->

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button id="registerButton" type="button" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</body>
</html>`;
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

        fetch("http://localhost:8080/api/users", request)
            .then((response) => {
                console.log(response.status)
                createView("/")
            });
    })

}