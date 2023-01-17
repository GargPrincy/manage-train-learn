import { environment } from "src/environments/environment";



export class API {
    public static apiBaseUrl = environment.apiBaseUrl;

    public static home = {
        getAllData: API.apiBaseUrl + "home"                
    }
    public static categories = {
        getAllData: API.apiBaseUrl + "categories",
        getCategoryDetails: API.apiBaseUrl + "category/{categoryId}",
        getAllSlideListing: API.apiBaseUrl + "slide/search/{slideSearchKey}",
        getAllSlideListingViewAll: API.apiBaseUrl + "slide/secondarysearch/{slideSearchKey}",
        getSlideDetails: API.apiBaseUrl + "slide/details/{slideParamId}",
        getTopSlide: API.apiBaseUrl + "today-top-slides",
        getTopSlideAll: API.apiBaseUrl + "secondary-today-top-slides",
        reportSlideMissing: API.apiBaseUrl + "slide/missing-report/{slideParamId}",
        // updateSlideViewCounts: API.apiBaseUrl + "slide/view-count/{slideParamId}",
        updateSlideDownloadCounts: API.apiBaseUrl + "slide/download/{slideParamId}",
    }
}