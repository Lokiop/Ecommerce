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
One component privateRoutes<br/>
In useEffect hit the protected route using axios<br/>
If we get ok in res, we will return outlet or else will return a spinner compnent<br/>
Create a nested Route in app.js file for hitting the dashboard<br/>
Now work on Spinner<br/>

Packages :<br/>
UseState<br/>
UseEffect<br/>
UseNavigate<br/>
Outlet<br/>
axios<br/>
useLocation<br/>
<br/>

==============Forgot Password===============<br/>
Based on the question<br/>
Change the model<br/>
Change the register page and the register controller<br/>
Add an endpint for the forgot password. Make one controller for it<br/>
One page for the forgot password and a button in login page for the same<br/>
<br/>

==============Admin and the User Panel/Dashboard================<br/>
Create Admin Menu<br/>
Create a page for admin Panel<br/>
create required pages for the items in the menu(Create Category, Create Product, All Users)<br/>

Create User Menu<br/>
Use this menu in the dashboard<br/>
Create required pages for the items in the menu(Profile, Orders)<br/>
<br/>

===============New Model for Category====================<br/>
Create new Schema for category<br/>
Create category Routes folder and create category<br/> path(requiresSignIn, isAdmin)<br/>
Test it using Postman<br/>
One Controller for updating the category(requiresSignIn, isAdmin)<br/>
One for getting all Categories<br/>
One for getting a single category<br/>
One for deleting category(requiresSignIn, isAdmin)<br/>
<br/>
Packages:<br/>
Slugify: Converts space (" ") to hyphen ("-")<br/>
<br/>
