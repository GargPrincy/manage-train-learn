import { environment } from "src/environments/environment";



export class API {
    public static apiBaseUrl = environment.apiBaseUrl;

    public static home = {
        getAllData: API.apiBaseUrl + "home"                
    }
    public static categories = {
        getAllData: API.apiBaseUrl + "categories",
        getCategoryDetails: API.apiBaseUrl + "category/{categoryId}",
        getTopic: API.apiBaseUrl + "{categoryId}/{topicId}",
        getAllSlideListing: API.apiBaseUrl + "slide/search/{slideSearchKey}",
        getAllSlideListingViewAll: API.apiBaseUrl + "slide/secondarysearch/{slideSearchKey}",
        getAllCategoryListingViewAll: API.apiBaseUrl + "view-all/{topicId}",
        getSlideDetails: API.apiBaseUrl + "slide/details/{slideParamId}",
        getTopSlide: API.apiBaseUrl + "today-top-slides",
        getTopSlideAll: API.apiBaseUrl + "secondary-today-top-slides",
        updateSlideDownloadCounts: API.apiBaseUrl + "slide/download/{slideParamId}",
    }

    public static social = {
        socialLogin: API.apiBaseUrl + "social-login",               
    }
}