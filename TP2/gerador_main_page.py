def build_mainpage_html(movielist, database):
    page = """
    <!DOCTYPE html>
    <!-- Movie Index Page -->
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Movies</title>
            <link rel="stylesheet" href="/indexcss">
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