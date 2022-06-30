import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";

@Injectable()
export class DisplayResponseMessages{
    /**
     * Display only error category
     */
    constructor(private snackBar: MatSnackBar){ }
    
    public displayErrorCategory(category: string){
        Swal.fire({
            icon: 'error',
            title: category,
            showConfirmButton: true,
            timer: 3000
          })
    }

    /**
     * Display both error category & message
     */
     public displayErrorCategoryAndMessage(category: string, msg: string){
        Swal.fire({
            icon: 'error', title: category, text: msg, 
            showConfirmButton: true, timer: 30000
          })
    }

    /**
     * Display success category
     */
     public displaySuccessCategory(category: string){
        Swal.fire({
            icon: 'success',
            title: category,
            showConfirmButton: true,
            timer: 3000
          })
    }

    /**
     * Display success category & message
     */
     public displaySuccessCategoryAndMessage(category: string, msg: string){
        Swal.fire({
            icon: 'success',
            title: category,
            text: msg,
            showConfirmButton: true,
            timer: 3000
          })
    }

    public displaySnackBar(msg: string){
      this.snackBar.open(msg, '', {
          duration: 3000,
      });
    }
}