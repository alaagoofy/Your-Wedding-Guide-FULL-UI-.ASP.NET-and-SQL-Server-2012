<%@ Control Language="C#" AutoEventWireup="true" CodeFile="FacebookLoginControl.ascx.cs" Inherits="FacebookLoginControl" %>
<input type="button" id="fblogin" value="Login to Facebook" disabled="disabled" style="display:none"/>
        <fb:login-button v="2" length="long" onlogin="$('#fblogin').click()">Login to Facebook</fb:login-button>
<div id="fb-root"></div>
<script>
    window.fbAsyncInit = function () {
        FB.init({
            appId: '<%: Facebook.FacebookApplication.Current.AppId %>',
            cookie: true,
            xfbml: true,
            oauth: true
        });

        function facebooklogin() {
            FB.login(function (response) {
                if (response.authResponse) {
                    // user authorized
                    // make sure to set the top.location instead of using window.location.reload()
                   top.location = '<%= this.ResolveCanvasPageUrl("http://yourwedding-guide.com/") %>';
                } else {
                    // user cancelled
                }
            }, { scope: '<%: string.Join(",", ExtendedPermissions) %>' });
        };

        $(function () {
            // make the button is only enabled after the facebook js sdk has been loaded.
            $('#fblogin').attr('disabled', false).click(facebooklogin);
        });
    };
    (function () {
        var e = document.createElement('script'); e.async = true;
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        document.getElementById('fb-root').appendChild(e);
    } ());
</script>