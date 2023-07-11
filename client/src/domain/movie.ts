export class Movie {
    title: string;
    year : number;
    imdbID : string;
    type : string;
    poster : string;

    constructor(title: string, year : number, imdbId : string, type : string, poster : string)
    {
        this.title = title;
        this.year = year;
        this.imdbID = imdbId;
        this.type = type;
        this.poster = poster;
    }
   
}