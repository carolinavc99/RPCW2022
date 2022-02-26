import re
# module for cleaning accented letters from text

# creates a fitting file name (no forbidden punctuation)
def get_movie_file_name(title, year):
    # replace all illegal characters
    url = re.sub(r"[ \n\.\'#%`´~+*¨ºª;,:'?!\/\\&{}<>$\"@\|]", "_", str(title))
    url = re.sub(r"_+\(film\)|_+$|^_+", "", url)
    url = remove_accents(url)
    
    url = url + "(" + str(year) + ").html"

    return url

def remove_accents(text):
    acentos = {
        'Ã':'A',
        'À':'A',
        'Á':'A',
        'Ä':'A',
        'Â':'A',
        'Å':'A',
        'à':'a',
        'á':'a',
        'â':'a',
        'ã':'a',
        'ä':'a',
        'å':'a',

        'Ê':'E',
        'È':'E',
        'É':'E',
        'Ë':'E',
        'è':'e',
        'é':'e',
        'ê':'e',
        'ë':'e',
        
        'Î':'I',
        'Í':'I',
        'Ì':'I',
        'Ï':'I',
        'ì':'i',
        'í':'i',
        'î':'i',
        'ï':'i',
        
        'Õ':'O',
        'Ò':'O',
        'Ó':'O',
        'Ö':'O',
        'Ô':'O',
        'ò':'o',
        'ó':'o',
        'ô':'o',
        'õ':'o',
        'ö':'o',
        
        'Û':'U',
        'Ú':'U',
        'Ù':'U',
        'Ü':'U',
        'ù':'u',
        'ú':'u',
        'û':'u',
        'ü':'u',

        'ý':'y',
        'ÿ':'y',
        'Ý':'Y',
        'Ÿ':'Y',

        'ß':'ss',

        'ñ':'n',
        'Ñ':'N',

        'ç':'c',
        'ć':'c',

        'Ç':'C',
        'Ć': 'C',

        'š':'s',
        'Š':'S'

    }
    text = [acentos.get(elem, elem) for elem in text]
    text = ''.join(text)

    return text 