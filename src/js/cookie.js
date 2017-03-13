/* class to handle cookie*/
class Cookie {
    construtor() {}
    add(key, value, sep, days) {
        //if already exists
        var cookies = this.get(key);
        if (cookies) {
            sep = sep || "";
            cookies = cookies.split(sep);
            //not already not exists
            cookies.indexOf(value) < 0 && cookies.push(value);
            value = cookies.join(sep);
        }
        this.setCookie(key, value, days)
    }

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    get(key) {
        var allcookies = document.cookie,
            cookiearray,
            name,
            value;
        // Get all the cookies pairs in an array
        cookiearray = allcookies.split(';');

        // Now take key value pair out of this array
        for (var i = 0; i < cookiearray.length; i++) {
            name = cookiearray[i].split('=')[0];
            value = cookiearray[i].split('=')[1];
            if (name === key) {
                return value;
            }
        }
        return "";
    }
}
export default Cookie;
