# SHOPi

### What is SHOPi?
SHOPi - https://shopi5.herokuapp.com/ - is a leading e-commerce fashion store for the course project. Which is implemented using:

- Angular 5.2.0

- Firebase 4.12.1

- Moltin V2 API: https://docs.moltin.com

It employs also other api interfaces such as Facebook login and Google signin (using Firebase).

You can watch a video at:

[![""](https://drive.google.com/uc?id=1ozS5j4KprLDn3YZEXkHOiyPhpofvR1dU)](https://www.youtube.com/watch?v=cMj9HR-Vxoc)

https://www.youtube.com/watch?v=cMj9HR-Vxoc

### ==> Update <==
Newer versions of Angular has been released since this project has been implemented. Some classes used in Angular 5 has been deprecated in newer versions of Angular. I will be updating SHOPi project as SHOPi-v2 upon my free time :) 

### What is done?
- Api calls to fetch items and other data

- Drag an and drop: In product listing, when you drag an item, the shoping cart appears automatically from the right edge of the screen edge. This is done using angular animations.

- Photo album with zooming in/ out capability (in the item details page)  

- Different kind of carousels 

- Loading indicator for carousels

- Partial blocking of the page when loading items

- Re-usable components for different purposes

- Services 
    - Login authentication service

    - Products service

    - Session service

    - Api authentication service

    - Cart service
    
    - Session service
    
    - Upload service

- Signin using email & password, Facebook or Google

- Not found page, when a user entered an invalid url or wrong page.

### What is remaining?
- [Completed] Continue working with api to use it to call products by their brands, colors, ...

- [Completed] Add the facility of adding product to cart. 

- [Completed] Shopping cart is saved per user in the local storage. When user login, she/ he finds their previous state of their shopping cart.

- [Completed] Clothes listing has pagination inluding capability to change items per page. 

- [Completed] Displaying orders per user (with expand/ collapse orders)

- [Completed] managing payment cards with facility to sort (rearrange) them by dragging and dropping

- [Completed] Creating checkout page

- [Completed] Creating login page and use Facebook and google apis (Completed)

- [Completed] Use firebase for signing up (Completed, with a smooth drag and drop user image)

- [Completed] Create Personal details page

- [Completed] Work with firebase to store personal data, orders, payment options, favorites, ...

- [Completed] Perform filter and searching on the product in clothes product listing page

- [Partially Completed] Viewing favorite items as sticky section on the page with angular animation 

### What advanced interactions developed in this project?

- Drag & drop product to a cart with auto animation to open and close. 

- Product (cloth) photo album with zooming capability (zoom in/ out using mouse wheel)

- Pagination with capability to select items per page

- Many ways of filtering using different criteria

- Partially blocking of the page while loading products from API

- Carousel for related products (and also for reviews)

- Sticky sliding floating cart to show the current items 

- Expand/ collapse orders view

- Payment preferences by capability to sort cards by dragging them to you prefered order

- Customized toastr view and animation

- When signing up, a user can drag their profile image (from computer file system) and drop it in the drop zone

- Reactive forms are used around the project

### How to setup?

- Simple! Just git clone SHOPi repository, open terminal, change directory to where you cloned the repository, run command "npm install" as the following:

    ```sh
    $ cd <SHOPi cloned directory>
    $ npm install
    ```
    Wait while installing node modules. After finishing installation, run command "ng serve"
    ```sh
    $ ng serve --open
    ```
    and ... it's done! enjoy :) 

- If you have any issues running the code, you can always contact me or create a new issue.

### Upon more time remaing...
- Use and implement currency api service to convert prices to different currencies

- Use google maps api

- Use Recombee Product Recommendation api

### File Structure
src folder app folder (which consist of application logic, views, model, controllers, services, classes, ...) and assets folder (which contain different css files, js, and images. other files including index.html (the entrance to the project. src folder contains also shopi-theme.scss which deployes customized theme for angular meterial components, while style.scss is used to call some other css files. 

App folder contain common foler which has resuable components, custom-pipes which has angular customized pipes, custom-toast for a customized toast, home which contains different home components (for men, women, kids, and hot-deals), product details component, services, app.module which has all required configurations to start angular components and services, and app.component files (a start point for one-page web app which contains the outer-outlet to navigate to different components).

#### Note: There are commented JSON objects code
That simulate the API calls. This is done because the free version of the API has a limited amount of calls, so I was trying sometimes to use the hard coded JSON object and for real tests I get back the API calls. The current published SHOPi uses the API

### How each component is structured?
Each component consist usually for 4 files: the typescript code (my-omponent-name.component.ts) which contain the control and logic for the component, the html, including angular derivatives, code (my-omponent-name.component.html), stylesheet file for this component (my-omponent-name.component.scss), and finally the unit tests for the previously mentioned source files (my-omponent-name.component.spec.ts)

### common folder:
 It contains the following components:
 
#### animation:
cart.animation.ts which includes the animation that is used for drag and drop shopping cart

#### categories-labels: 
This component will be used in several parts of the application to loop and create html labels usually upon the usage of mat-expansion-panel.

#### clothes-collection
This component is the main collection for items. currently, it is used on Men collection but it will be reused also for women, kids, and hot deals listing. 

#### common-footer
It represent the footer for each page in SHOPi. 

#### common-header
This reusable component contains the footer that is used in all pages except the product detail page and the cart page

#### float cart
This is a reusable cart component that is used almost in all pages. Then ever the user clicks on the cart icon, the float cart slide open from the right of the screen.

#### common-mini-header
It is exactly like common-header component but it has been redegined to contain the minimal view. It is used mainly in product details page and the cart page.

#### common-product
This component is used in different collection pages to and it returns the list of items based on the search criteria selected in clothes-collection component.

#### not-found 
User is redirected to this component when invalid url entered.

#### price-slider
This component is used to represent the range price as a search criteria in clothes-collection component

#### product-carousel
This component takes the list of items as input and it generates representation carousel. This component is used now in pro product-details and home component.

#### reviews
This component reads users reviews about shopi from firebase and for now it is used in the home page screen, and to be used in other pages in the future. 

#### classes

#### Cart.ts
Is a class that represent the cart properties. It will be mainly used in cart-service

#### Price.ts
Is a class that represent the price properties that will be used in Product class.
The price class also has some static methods to calculate correct price based on discount and other factors

#### Product.ts
Is a class that represent the product properties that will be used in product-service class and other classes.

#### address
The address that the user has.

#### order
The orders that the user has.

#### upload
This class is used to upload the user image


### custom-pipes folder
#### summary.pipe.ts 
This pipe will be used later in html pages to reduce the long paragraph to certain amount of characters and then they will be followed with: more... 

#### file-size.pipe.ts
This pipe is used to format the file size.

### custom-toast
This component is a customized toast with differnet angular animations (such as opacity and transform). It is widely used in SHOPi web app

### directives

#### drop-zone.directive.ts
This directive is used to drag and drop file to upload. 

### login-auth 
#### login
This component is used to for users to login in SHOPi using their email, facebook or google plus account.

#### signup
This component is used to signup into SHOPi. It has drag and drop file zone.

### home folder

#### man-home-category
This component represent the home page for men section

#### woman-home-category
This component represent the home page for women section (It has not been implemented yet)

#### kids-home-category
This component represent the home page for kids section (It has not been implemented yet)

#### hot-deals-home-category
This component represent the home page for hot-deals and sale section (It has not been implemented yet)

#### home-default 
This component represent general home page which has differnt sections for men, women, kids, and hot deals. (It has not been implemented yet)

#### rev-slider
A reusable carousel component in different home-categories pages

#### home.component
It is the entry point for different home pages (men, women, kids, and hot deals).

### product-details folder
Represents the single item details including item photo album, zooming capability (with zoom in/ out using mouse wheels), and related items carousel.

### services folder
There are four service in SHOPi web application:

#### api-auth service
Which is responsible to generate Bearer Token for the Moltin API, and validates the token in case the web app need to generate a new one. This service is actively used by another services, such as products service 

#### cart service
This service holds the shopping cart of the customer, the products, amount and payment.

#### products service 
This service deploys all api calls required by SHOPi. It also catches custom errors and return it to the view as a toast. A future work on this service is to save error logs in Firebase

#### session service
This service is responsible for all session data, including personal data

#### cart service
This service is responsible for managing shopping cart for the user 

#### login-auth
This service is used to manage different login ways for the user, and to manage login state.

#### upload service
User image upload service

