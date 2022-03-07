import pickle
from os.path import exists
from text_cleaner import get_type_file_name

def get_urltitle_by_type(type, name, database):
    # type must be "cast", "genres", or "year"
    # array of movie tuples = (url, title)
    movies = []
    for title, info in database.items():
        if ((type == "cast" or type == "genres") and name in info[type]) or (type == "year" and name == info["year"]):
            movies.append((database[title].get('url'), title))

    return movies

# builds the entity pages
def build_html_by_type():
    # load database
    with open('dict_database.pkl', 'rb') as f:
        database = pickle.load(f)

    # process each movie
    for title, info in database.items():
        #print("title->", title, "|| info->", info)

############################################# ACTORS
        for actor in info['cast']:
            filepath = "pages/actors/" + get_type_file_name("cast", actor) # "_cast.html"

            # if actor page hasn't been done yet
            if not exists(filepath):
                page = f"""<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>{actor}</title>
            <link rel="stylesheet" href="/typecss">
        </head>
        <body>
            <h1>{actor}'s Appearances</h1>
            <ul>"""

                movies = get_urltitle_by_type("cast", actor, database)
                for url, title in movies:
                    page += f"""\n<li><a href="{url}">{title}</a></li>"""

                page += "</ul></body></html>"

                with open(filepath, "w", encoding="utf-8") as file:
                    file.write(page)

############################################# GENRES
        for genre in info['genres']:
            filepath = "pages/genres/" + get_type_file_name("genres", genre)

            # if genre page hasn't been done yet
            if not exists(filepath):
                page = f"""<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>{genre}</title>
            <link rel="stylesheet" href="/typecss">
        </head>
        <body>
            <h1>{genre} Movies</h1>
            <ul>"""

                movies = get_urltitle_by_type("genres", genre, database)
                for url, title in movies:
                    page += f"""\n<li><a href="{url}">{title}</a></li>"""
                
                page += """</ul></body></html>"""

                with open(filepath, "w", encoding="utf-8") as file:
                    file.write(page)

############################################# YEARS 
        year = info['year']
        filepath = "pages/years/" + get_type_file_name("year", year)

        # if genre page hasn't been done yet
        if not exists(filepath):
            page = f"""<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>{year}</title>
            <link rel="stylesheet" href="/typecss">
        </head>
        <body>
            <h1>Movies from {year}</h1>
            <ul>"""

            movies = get_urltitle_by_type("year", year, database)
            for url, title in movies:
                page += f"""\n<li><a href="{url}">{title}</a></li>"""
            page += """</ul></body></html>"""

            with open(filepath, "w", encoding="utf-8") as file:
                file.write(page)