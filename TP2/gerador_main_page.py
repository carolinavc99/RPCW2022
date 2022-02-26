def build_mainpage_html(movielist, database):
    page = """
    <!DOCTYPE html>
    <!-- Movie Index Page -->
    <html>
        <style>
            body {
                font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }
            h2 {
                text-align: center;
            }
            ul {
                margin-left: 25%;
            }
        </style>
        <head>
            <meta charset="UTF-8">
            <link rel="icon" type="image/x-icon" href="./images/favicon.ico">
            <title>Movies</title>
        </head>
        <body>
            <h2>Movie List</h2>
            <ul>
    """
    for movie in movielist:
        page += f"""
        <li><a href="{database[movie]['url']}">{movie} ({database[movie]['year']})</a></li>
        """
    page += """</ul>
    </body>
</html>
    """

    with open("./pages/index.html", "w", encoding="utf-8") as file:
        file.write(page)