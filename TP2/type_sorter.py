import pickle
from text_cleaner import get_type_file_name

def get_urltitle_by_type(type, string, database):
    # Type = actor, genre, year
    # String = name of actor, genre, year

    # array of movie tuples = (url, title)
    movies = []
    if type == "actor":
        type = "cast"
    
    for key, value in database.items():
        if string in value[type]:
            movies.append((database[key].get('url'), key))
    
    return movies


def build_html_by_type(type, string):
    with open('dict_database.pkl', 'rb') as f:
        database = pickle.load(f)

    if type == "actor":
        filepath = "pages/actors/" + get_type_file_name(type, string)
        body = f"""<h1>{string}'s Appearances</h1>"""
    elif type == "genre":
        filepath = "pages/genres/" + get_type_file_name(type, string)
        body = f"""<h1>Movies with {string}</h1>"""
    elif type == "year":
        filepath = "pages/years/" + get_type_file_name(type, string)
        body = f"""<h1>Movies from {string}</h1>"""

        # page that shows up for a certain actor and shows all the movies he's been in, and links to that movie's page
    page = f"""<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>{string}</title>
            <link rel="stylesheet" href="/actorcss">
        </head>
        <body>"""
    page += body
    
    # get movies by database
    movies = get_urltitle_by_type(type, string, database)
    for url, title in movies:
        page += f"""\n<a href="{url}">{title}</a>"""

    page += """
    </body>
</html>"""

    with open(filepath, "w", encoding="utf-8") as file:
        file.write(page)

build_html_by_type("actor", "Sebastian Stan")