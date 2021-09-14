import createView from "../createView.js";

export default function Register(props){
    return `
<section  class="h-100 h-custom" style="background-color: #1FC58E; height: 1000px;">
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-8 col-xl-6">
        <div id="registerForm" class="card rounded-3">
          <img src="./img/registerFoodPicture.jpeg" class="w-100" style="height: 300px; border-top-left-radius: .3rem; border-top-right-radius: .3rem; object-fit: cover;" alt="Sample photo">
          <div class="card-body p-4 p-md-5">
            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

            <form class="px-md-2">

              <div class="form-outline mb-4">
                <input type="text" id="form3Example1q" class="form-control" />
                <label class="form-label" for="form3Example1q">Name</label>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4">

                  <div class="form-outline datepicker">
                    <input
                      type="text"
                      class="form-control"
                      id="exampleDatepicker1"
                    />
                    <label for="exampleDatepicker1" class="form-label">Select a date</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4">

                  <select class="select">
                    <option value="1" disabled>Gender</option>
                    <option value="2">Female</option>
                    <option value="3">Male</option>
                    <option value="4">Other</option>
                  </select>

                </div>
              </div>

              <div class="mb-4">

                <select class="select">
                  <option value="1" disabled>Class</option>
                  <option value="2">Class 1</option>
                  <option value="3">Class 2</option>
                  <option value="4">Class 3</option>
                </select>

              </div>

              <div class="row mb-4 pb-2 pb-md-0 mb-md-5">
                <div class="col-md-6">

                  <div class="form-outline">
                    <input type="text" id="form3Example1w" class="form-control" />
                    <label class="form-label" for="form3Example1w">Registration code</label>
                  </div>

                </div>
              </div>

              <button type="submit" style="background-color: #1FC58E" class="btn btn-lg mb-1">Submit</button>

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

        fetch("http://localhost:8080/api/users", request)
            .then((response) => {
                console.log(response.status)
                createView("/")
            });
    })

}