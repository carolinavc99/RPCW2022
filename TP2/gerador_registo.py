import json
from os import remove
import re
from text_cleaner import remove_accents

def build_html(url, title, year, cast, genres):
    page = f"""<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
    </head>
    <body>
        <h2>Title</h2>
        <p>{title}</p>

        <h2>Year of Release</h2>
        <p>{str(year)}</p>

       <h2>Actors</h2>
       <ul>"""
    for actor in cast:
        page += f"\n<li>{actor}</li>"
    
    page +="\n</ul>\n<h2>Genres</h2>"
    
    for genre in genres:
        page += f"\n<li>{genre}</li>"
    
    page += "\n</ul>\n</body>\n</html>"

    filepath = "pages/" + url
    with open(filepath, "w", encoding="utf-8") as file:
        file.write(page)

# creates a fitting file name (no forbidden punctuation)
def get_movie_file_name(title, year):
    # replace all illegal characters
    url = re.sub(r"[ \n\.\'#%`´~+*¨ºª;,:'?!\/\\&{}<>$\"@\|]", "_", str(title))
    url = re.sub(r"_+\(film\)|_+$|^_+", "", url)
    url = remove_accents(url)
    
    url = url + "(" + str(year) + ").html"

    return url

with open('./cinemaATP.json', encoding="utf-8") as file:
    data = json.loads(file.read())

    for filme in data:
        
        # gerar página html para cada registo
        url = get_movie_file_name(filme['title'], filme['year'])
        
        build_html(url, filme['title'], filme['year'], filme['cast'], filme['genres'])