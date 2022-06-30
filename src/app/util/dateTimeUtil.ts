
export class DateTimeUtil{

    private format= 'yyyy-MM-dd';
    
    constructor(){ }
    
    /**
     * convert typescript date object to java local date format
     * @param dateTime typescript date object
     * @returns java supported date format 
     */

    public localDateConverter(date: Date): string{
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return yyyy+'-'+mm+'-'+dd;
    }

    /**
     * convert typescript date object to java local date-time format
     * @param dateTime
     * @returns java supported datetime format 
     */
    public localDateTimeConverter(dateTime: Date){

    }
}