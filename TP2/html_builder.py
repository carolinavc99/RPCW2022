import json
import re
from text_cleaner import  get_movie_file_name
from gerador_main_page import build_mainpage_html

def build_movie_html(url, title, year, cast, genres):
    page = f"""<!DOCTYPE html>
<html>
    <style>
            body {{
                font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }}
            h2, p {{
                text-align: center;
            }}
            ul {{
                margin-left: 45%;
            }}
    </style>
    <head>
        <meta charset="UTF-8">
        <link rel="icon" type="image/x-icon" href="./images/favicon.ico">
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
    
    page +="\n</ul>\n<h2>Genres</h2><ul>"
    
    for genre in genres:
        page += f"\n<li>{genre}</li>"
    
    page += "\n</ul>\n</body>\n</html>"

    filepath = "pages/movies/" + url
    with open(filepath, "w", encoding="utf-8") as file:
        file.write(page)


# Generator Script
with open('./cinemaATP.json', encoding="utf-8") as file:
    data = json.loads(file.read())

    database = dict()

    for film in data:
        url = get_movie_file_name(film['title'], film['year'])

        database[film['title']] = {
            'url' : url,
            'year' : film['year'],
            'cast' : film['cast'],
            'genres' : film['genres']
        }
        
        build_movie_html(url, film['title'], film['year'], film['cast'], film['genres'])
    movies_alphabetical = sorted(database.keys())
    build_mainpage_html(movies_alphabetical, database)