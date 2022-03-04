def build_mainpage_html(movielist, database):
    page = """
            <div class="movie-list">
            <h2>Movie List</h2>
    """
    nav_bar = """<div class="dropdown fixed">
                    <button class="dropdown">Navigation</button>
                <div class="dropdown-content">""" # this is the dropdown menu for the nav bar
    character = "#"
    page += f"""<ul><h3 id="Num">{character}</h3><ul>"""
    nav_bar += f"""<a class="segment-title" href="#Num">{character}</a>\n"""
    for movie in movielist:
        if movie[0].isalpha() and movie[0] != character:
            character = movie[0]
            page += f"""</ul><h3 id="{character}">{character}</h3><ul>"""
            nav_bar += f"""<a class="segment-title" href="#{character}">{character}</a>\n"""
        page += f"""
        <li><a href="{database[movie]['url']}">{movie} ({database[movie]['year']})</a></li>
        """
    pagestart = """
    <!DOCTYPE html>
    <!-- Movie Index Page -->
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Movies</title>
            <link rel="stylesheet" href="/indexcss">
        </head>
        <body>"""
    nav_bar += "</div></div>"
    page = pagestart + nav_bar + page
    page += """</ul>
        </div>
    </body>
</html>
    """

    with open("./pages/index.html", "w", encoding="utf-8") as file:
        file.write(page)