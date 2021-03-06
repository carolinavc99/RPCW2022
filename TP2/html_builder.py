import json
import re
import pickle
from text_cleaner import  get_movie_file_name, get_type_file_name
from gerador_main_page import build_mainpage_html
from type_sorter import build_html_by_type

def build_movie_html(url, title, year, cast, genres):
    yearurl = get_type_file_name("year", str(year))
    page = f"""<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        <link rel="stylesheet" href="/moviecss">
    </head>
    <body>
        <div class="card">
            <h2>Title</h2>
            <p>{title}</p>
        </div>

        <div class="card">
            <h2>Year of Release</h2>
            <a class="round-list-item" href="/{yearurl}">{str(year)}</a>
        </div>

        <div class="card">
            <h2>Actors</h2>"""
    for actor in cast:
        actorurl = get_type_file_name("cast", actor)
        page += f"""\n<a class="round-list-item" href="/{actorurl}">{actor}</a>"""
    
    page +="\n</div>\n<div class=\"card\"><h2>Genres</h2>"
    
    for genre in genres:
        genreurl = get_type_file_name("genres", genre)
        page += f"""\n<a class="round-list-item" href="/{genreurl}">{genre}</a>"""
    
    page += "\n</div>\n</body>\n</html>"

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
    
with open('dict_database.pkl', 'wb') as f:
    pickle.dump(database, f)

build_html_by_type()