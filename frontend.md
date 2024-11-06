## Creating Layout of the page

1. first make layout.scss ema main is in center and aju baju space valu kam thase 

   from responsive.scss mathi ref lay responsive page banse jema thali screen size pramane color change thase 

   In responsive file 
    ``` scss 
    @mixin midscreen{
    @media (max-width: 1024px) {
        @content; // contecnt means function ma call vakhte je add thay te
      }
    } 
    ```

    ``` scss 
      @include midscreen {
      background-color:rgb(186,203,234);
      max-width: 768px; //jyare screen size nani kariye tyare bane baju space valu
    }
    ```

## Creating Navigation Bar

2.  which has two parts 


    (a) home about agents contact  -> leftnav
     
    (b) sign in and singup -> rightnav


 * apply flex in logo and site name  


 * In smallscreen we don't display leftnav - logo  instead of that me use meanu icon that has all things like home , about, contact and agents
 
 * For that we use hooks useState if button is click than class name is active than display side nav by default state is false means right : -50% jyare active thay tyare right : 0 


 * For mid screen we don't display company name

## Creating Homepage

   **We Divide home page in two parts**
    
  * First is  textContainer
      - In text Container we have h1 -> title then <p> than searchbox then some highlighting like how much user ....
      - containe wrapper class becasue padding apva mate akhane wrap kari didho ema badhu h1,p,searchbox,heighlights
      

      - For searchbox we use hooks which has type:buy (default) city minprice, maxprice ...
      - when we click on button it will change only buy to rent and rent to buy only
      - for some margin padding issue in form than checkout at  [Link...](https://www.youtube.com/watch?v=HFj5FMb0jwY&t=3667s)
        

  * Second is imgContainer
     - Image only 


## Learn about react Browser routing 

   - React Router enables "client side routing".
   - Check out  [Click me ...](https://reactrouter.com/en/main/start/overview) 

    


 
