import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component(
    {
        selector: 'pm-products',
        templateUrl: './product-list.component.html',
        styleUrls: ['./product-list.component.css']
    }
)
export class ProductListComponent implements OnInit {
    pageTitle: String = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    _listFilter: string;

    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value: string){
      this._listFilter=value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
      }

    filteredProducts: IProduct[];
    products: IProduct[]= [];
    // products: IProduct[] = [
    //     {
    //         "productID": 2,
    //         "productName": "Garden Cart",
    //         "productCode": "GDN-0023",
    //         "releaseDate": "March 18, 2016",
    //         "description": "15 gallon capacity rolling garden cart",
    //         "price": 23.99,
    //         "starRating": 4.3,
    //         "imageUrl": "https://openclipart.org/image/300px/garden_cart.png"
    //     },
    //     {
    //         "productID": 5,
    //         "productName": "Hammer",
    //         "productCode": "GDN-0012",
    //         "releaseDate": "Apri 18, 2017",
    //         "description": "curved claw steel hammer",
    //         "price": 3.99,
    //         "starRating": 3.2,
    //         "imageUrl": "https://openclipart.org/image/300px/hammer.png"
    //     }
    // ];
    
    constructor(private productService: ProductService)
    {

    }
    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

      ngOnInit(): void 
      {
        // this.products = this.productService.getProducts();
        this.productService.getProducts().subscribe(
          products => 
          {
            this.products = products;
            this.filteredProducts = this.products;
          },
            error => this.errorMessage =<any>error
        );
          
      // this.listFilter = 'cart';
        // console.log("On Init");
      }
     
    toggleImage(): void {
        this.showImage = !this.showImage;
      
    }

    onRatingClicked(message: string): void {
      this.pageTitle='Produc List' + message;
    }
}