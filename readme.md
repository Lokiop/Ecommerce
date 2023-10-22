============ Register & Login ========== <br/>
Initaially create just a form.(Will work on styling later)<br/>
Route for register<br/>
Use cors in server.js of backend<br/>
add scripts for concurrently running server and client at the same time<br/>
axios logic(handle submit func)<br/>
useNavigate to navigate to login Page<br/>
Style the Register Page<br/>
Copy the Same for Login Page<br/>
Change handleSubmit for Login Functionality<br/>
<br/>
Packages :<br/>
react-hot-toast : for toast messages<br/>
axios : for connedcting with backend(http client)<br/>
concurrently : for concurrently running server and client with one command<br/>
cors : for preventing cross origin errors<br/>

==========COntext API==============<br/>
For the logout functionality and also will be used later<br/>

===========Private Routes=============<br/>
Create DashBoard page<br/>
One component privateRoutes
In useEffect hit the protected route using axios
If we get ok in res, we will return outlet or else will return a spinner compnent
Create a nested Route in app.js file for hitting the dashboard
Now work on Spinner

Packages :
UseState
UseEffect
UseNavigate
Outlet
axios
useLocation
