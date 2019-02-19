import time

header ="""
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="http://www.aidenator.com/static/img/favicon.ico">

        <title>Aidenator</title>

        <!-- Bootstrap core CSS -->
        <link href="../static/css/bootstrap.min.css?v=1.1" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="../static/css/jumbotron-narrow.css" rel="stylesheet">
        <!-- Aiden's custom CSS changes -->
        <link href="../static/css/my-changes.css?v=1.1" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>

        <div class="container">
            <div class="navbar navbar-default" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="/"><b>Aidenator.com</b></a>
                    </div>
                    <div class="navbar-collapse collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-toggle="modal" data-target="#aboutModal">About</a>

                                <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="aboutModalLabel">
                                    <div class="modal-dialog modal-md" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="aboutModalLabel">About</h4>
                                            </div>
                                            <div class="modal-body">
                                                This site is purely non-profit. I swear I'm not paying the CIA to host this...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-toggle="modal" data-target="#contactModal">Contact</a>

                                <div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="contactModalLabel">
                                    <div class="modal-dialog modal-md" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title" id="contactModalLabel">Contact</h4>
                                            </div>
                                            <div class="modal-body">
                                                Use this site to see if I'm home and then just contact me in person. If not, just text me. :^P
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/connect4">Connect 4</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/nerd_stuff">Nerd Stuff</a>
                            </li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div><!--/div .container -->
            </div><!--/div .navbar -->

"""

footer ="""
            <footer class="footer">
                <p>&copy; Aidenator {}</p>
            </footer>
        </div><!--/div .container (outermost) -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="../static/js/jquery-3.1.1.slim.min.js"></script>
        <script src="../static/js/bootstrap.min.js?v=1.1"></script>
        <script>
            (function(i,s,o,g,r,a,m){{i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){{
            (i[r].q=i[r].q||[]).push(arguments)}},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            }})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-31335032-1', 'auto');
            ga('send', 'pageview');
        </script>
    </body>
</html>
""".format(time.strftime("%Y"))
