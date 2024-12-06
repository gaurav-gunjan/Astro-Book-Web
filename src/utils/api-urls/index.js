import { api_urls_http, api_urls_https } from "../constants";

export let api_urls;

if (window.location.protocol === 'http:') {
    api_urls = api_urls_http;
} else if (window.location.protocol === 'https:') {
    api_urls = api_urls_https;
} else {
    console.log('Unknown protocol');
}
