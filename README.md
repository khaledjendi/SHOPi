# SHOPi

### What is SHOPi?
SHOPi - https://shopi5.herokuapp.com/ - has is a leading e-commerce fashion store for the course project . Which is implemented using Angular, and firebase. It employs also moltin api and other apis such as Facebook login and google signin.
You can watch a video at:

[![""](https://i.ytimg.com/vi/FeL12Cszhh8/0.jpg)](https://www.youtube.com/watch?v=FeL12Cszhh8)

https://www.youtube.com/watch?v=FeL12Cszhh8

### What is done?

- The skeleton of the project

- Authentication services

- Products service

- Session service

- Api calls to fetch items and other data

- Drag an and drop: In product listing, when you drag an item, the shoping cart appears automatically in the right edge of the screen with angular animation.

- Item images zooming capability (in the item details page)  

- Different kind of carousels 

- Loading indicator for carousels

- Partial blocking of the page when loading items

- Re-usable components for different purposes

- You can view the project online at: https://shopi5.herokuapp.com/

### What is remaining?
- Continue working with api to use it to call products by their brands, colors, ...

- Add the facility of adding product to favorites, or to cart. 

- Viewing favorite items as sticky section on the page with angular animation 

- Creating checkout page

- Creating login page and use Facebook and google apis

- Create Personal details page

- Perform search on the product

- Add more facilities to the product page with capability to veiw correct related items

- Work with firebase to store personal data, orders, favorites, ...

- Use local storage to save login details

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

#### Cart.ts
Is a class that represent the cart properties. It will be mainly used in cart-service

#### Price.ts
Is a class that represent the price properties that will be used in Product class.
The price class also has some static methods to calculate correct price based on discount and other factors

#### Product.ts
Is a class that represent the product properties that will be used in product-service class and other classes.


### custom-pipes folder
#### summary.pipe.ts 
This pipe will be used later in html pages to reduce the long paragraph to certain amount of characters and then they will be followed with: more... 

### custom-toast
This component is a customized toast with differnet angular animations (such as opacity and transform). It is widely used in SHOPi web app

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








