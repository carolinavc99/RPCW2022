import json

with open('arquivo_sonoro.json', encoding="utf-8") as json_file:
    arquivo = json.load(json_file)
 
    id = 0
    # Print the data of dictionary
    for i in arquivo['arquivo']:
        if "musico" in i.keys():
            i['musico'] = i['musico'].strip()
        if "instrumento" in i.keys():
            i['instrumento'] = i['instrumento'].strip()


with open("arquivo_sonoro_2.json", "w", encoding="utf-8") as write_file:
    json.dump(arquivo, write_file, indent=4, sort_keys=True, ensure_ascii=False)